/**
 * OIA Calculation Engine
 *
 * Single source of truth for all scoring, ROI, maturity, and recommendation logic.
 * Used by both the client-side snapshot and the server-side API route.
 * Replaces the n8n Code nodes — n8n only receives the finished report.
 */

import { PILLARS } from "./oia-questions";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

export interface PillarScore {
  key: string;
  label: string;
  subtitle: string;
  raw: number;
  max: number;
  normalized25: number;
  pct: number;
}

export interface DimensionScore {
  key: string;
  raw: number;
  max: number;
  pct: number;
}

export interface ROI {
  hourlyRate: number;
  weeklyLost: number;
  weeklySoftCost: number;
  yearlySoftCost: number;
  hoursRecovered: number;
  monthlySavings: number;
  yearlySavings: number;
  investmentCost: number;
  annualROI: number;
}

export interface Recommendation {
  playbook: string;
  sprint: string;
  description: string;
}

export interface AuditReport {
  // Contact
  name: string;
  email: string;
  company: string;

  // Overall
  oiScore: number;
  maturityLevel: string;
  identityLevel: string;
  veosPhase: string;

  // Pillars
  pillarScores: PillarScore[];
  weakestPillar: string;
  pillarRankings: string[];

  // Dimensions (12)
  dimensions: Record<string, DimensionScore>;

  // Recommendation
  recommendation: Recommendation;
  sprintRecommendation: string;

  // ROI
  roi: ROI;

  // Metadata
  generatedAt: string;
}

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const REVENUE_MIDPOINTS: Record<string, number> = {
  "150000": 150000,
  "375000": 375000,
  "750000": 750000,
  "2000000": 2000000,
  "4000000": 4000000,
  "6000000": 6000000,
};

const INVESTMENT_COSTS: Record<string, number> = {
  Extract: 3000,
  Organize: 4500,
  Activate: 6000,
  Elevate: 9000,
};

// ─────────────────────────────────────────────
// RECOMMENDATION LOGIC
// ─────────────────────────────────────────────

/**
 * Determines which playbook to recommend based on pillar scores.
 *
 * Category Intelligence surfaces when DIAGNOSE is especially weak —
 * it signals the foundation (positioning, clarity, identity) is shaky
 * enough that operational fixes won't stick.
 *
 * Thresholds:
 *  - DIAGNOSE pct ≤ 35% AND it's the weakest pillar → Category Intelligence
 *  - DIAGNOSE or DEFINE weakest → Operational Intelligence
 *  - DESIGN or DEPLOY weakest → Autonomy
 */
function getRecommendation(
  pillarScores: PillarScore[],
  weakestKey: string
): Recommendation {
  const diagnose = pillarScores.find((p) => p.key === "diagnose");
  const define = pillarScores.find((p) => p.key === "define");

  // Category Intelligence — foundation is too shaky for operational fixes
  if (
    weakestKey === "diagnose" &&
    diagnose &&
    diagnose.pct <= 35
  ) {
    return {
      playbook: "Category Intelligence",
      sprint: "Extract",
      description:
        "Your clarity is the constraint. Before we can structure your operations, you need to define what your business actually is, who it serves, and how it's positioned. Without that foundation, every system you build will be working against ambiguity.",
    };
  }

  // Also consider Category Intelligence if both DIAGNOSE and DEFINE are weak
  if (
    weakestKey === "diagnose" &&
    diagnose &&
    define &&
    diagnose.pct <= 45 &&
    define.pct <= 45
  ) {
    return {
      playbook: "Category Intelligence",
      sprint: "Extract",
      description:
        "Your clarity and structure scores suggest the business hasn't fully defined its positioning. Operational systems need a clear foundation to work from — the first step is knowing what you are, what you're not, and who you serve.",
    };
  }

  // Operational Intelligence — clarity or structure is the gap
  if (weakestKey === "diagnose" || weakestKey === "define") {
    const sprint = weakestKey === "diagnose" ? "Extract" : "Organize";
    const desc =
      weakestKey === "diagnose"
        ? "Your decision-making structure and workflow clarity need the most attention. The work starts with mapping how decisions actually move through your business — and where they stall."
        : "Your systems and processes exist in pieces but aren't connected. The work starts with standardizing workflows, integrating your tools, and documenting how things actually get done.";

    return {
      playbook: "Operational Intelligence",
      sprint,
      description: desc,
    };
  }

  // Autonomy — execution or scale is the gap
  const sprint = weakestKey === "design" ? "Activate" : "Elevate";
  const desc =
    weakestKey === "design"
      ? "Your operations still depend on you showing up. The work starts with designing delegation structures, automating what's repeatable, and building execution that doesn't wait on you."
      : "Your business runs, but can't sustain more volume. The work starts with removing bottlenecks, tracking performance, and building the capacity to handle growth without breaking.";

  return {
    playbook: "Autonomy",
    sprint,
    description: desc,
  };
}

// ─────────────────────────────────────────────
// MAIN ENGINE
// ─────────────────────────────────────────────

export function calculateAuditReport(input: {
  answers: Record<string, string>;
  economicAnswers: Record<string, string>;
  contact: { name: string; email: string; business: string };
}): AuditReport {
  const { answers, economicAnswers, contact } = input;

  // ── Score each question ──
  const weights: Record<number, number> = {};
  for (let i = 1; i <= 36; i++) {
    const pos = (i - 1) % 3;
    weights[i] = pos === 0 ? 5 : pos === 1 ? 3 : 1;
  }

  function scoreQuestion(qNumber: number): number {
    const val = answers[`q${qNumber}`];
    if (!val) return 0;
    const w = weights[qNumber];
    const lower = val.toLowerCase();
    if (lower === "yes") return w;
    if (lower === "sometimes") return Math.round(w * 0.5);
    return 0;
  }

  // ── Pillar scores ──
  const pillarScores: PillarScore[] = PILLARS.map((pillar) => {
    const questions = pillar.dimensions.flatMap((d) => d.questions);
    let raw = 0;
    let max = 0;
    for (const q of questions) {
      max += q.weight;
      raw += scoreQuestion(q.number);
    }
    const pct = max > 0 ? Math.round((raw / max) * 100) : 0;
    const normalized25 = max > 0 ? Math.round((raw / max) * 25) : 0;
    return {
      key: pillar.key,
      label: pillar.label,
      subtitle: pillar.subtitle,
      raw,
      max,
      normalized25,
      pct,
    };
  });

  // ── Dimension scores (12) ──
  const dimensions: Record<string, DimensionScore> = {};
  for (const pillar of PILLARS) {
    for (const dim of pillar.dimensions) {
      let raw = 0;
      let max = 0;
      for (const q of dim.questions) {
        max += q.weight;
        raw += scoreQuestion(q.number);
      }
      dimensions[dim.key] = {
        key: dim.key,
        raw,
        max,
        pct: max > 0 ? Math.round((raw / max) * 100) : 0,
      };
    }
  }

  // ── Overall score ──
  const totalRaw = pillarScores.reduce((a, p) => a + p.raw, 0);
  const totalMax = pillarScores.reduce((a, p) => a + p.max, 0);
  const oiScore = totalMax > 0 ? Math.round((totalRaw / totalMax) * 100) : 0;

  // ── Rankings ──
  const sorted = [...pillarScores].sort((a, b) => a.pct - b.pct);
  const weakestPillar = sorted[0].key;
  const pillarRankings = sorted.map((p) => p.key);

  // ── Maturity / Identity / VEOS ──
  let maturityLevel = "";
  let identityLevel = "";
  let veosPhase = "";

  if (oiScore <= 20) {
    maturityLevel = "Level 1 — Critical";
    identityLevel = "Carrier";
    veosPhase = "Extract / Discover";
  } else if (oiScore <= 40) {
    maturityLevel = "Level 2 — Developing";
    identityLevel = "Operator";
    veosPhase = "Design";
  } else if (oiScore <= 60) {
    maturityLevel = "Level 3 — Functional";
    identityLevel = "Architect – System Builder";
    veosPhase = "Deploy";
  } else if (oiScore <= 80) {
    maturityLevel = "Level 4 — Optimized";
    identityLevel = "Strategist";
    veosPhase = "Optimize";
  } else {
    maturityLevel = "Level 5 — Intelligent";
    identityLevel = "Prophet Leader";
    veosPhase = "Scale / Amplify";
  }

  // ── Recommendation ──
  const recommendation = getRecommendation(pillarScores, weakestPillar);

  // ── ROI / Soft Cost ──
  const annualRevenue =
    REVENUE_MIDPOINTS[economicAnswers.annualRevenue] || 0;
  const weeklyLost = Number(economicAnswers.hours_per_week_lost) || 0;

  const hourlyRate = annualRevenue > 0 ? Math.round(annualRevenue / 2080) : 0;
  const yearlyHoursLost = weeklyLost * 52;
  const recoveryPct = 0.4;
  const hoursRecovered = Math.round(yearlyHoursLost * recoveryPct);
  const yearlySavings = Math.round(hoursRecovered * hourlyRate);
  const monthlySavings = Math.round(yearlySavings / 12);
  const weeklySoftCost = Math.round(weeklyLost * hourlyRate);
  const yearlySoftCost = Math.round(weeklyLost * hourlyRate * 52);
  const investmentCost = INVESTMENT_COSTS[recommendation.sprint] || 6000;
  const annualROI =
    investmentCost > 0
      ? Number((yearlySavings / investmentCost).toFixed(2))
      : 0;

  return {
    name: contact.name,
    email: contact.email,
    company: contact.business,

    oiScore,
    maturityLevel,
    identityLevel,
    veosPhase,

    pillarScores,
    weakestPillar,
    pillarRankings,

    dimensions,

    recommendation,
    sprintRecommendation: recommendation.sprint,

    roi: {
      hourlyRate,
      weeklyLost,
      weeklySoftCost,
      yearlySoftCost,
      hoursRecovered,
      monthlySavings,
      yearlySavings,
      investmentCost,
      annualROI: Math.max(annualROI, 3.5),
    },

    generatedAt: new Date().toISOString(),
  };
}
