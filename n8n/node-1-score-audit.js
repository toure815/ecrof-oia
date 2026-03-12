// ═══════════════════════════════════════════════════════════════
// n8n Code Node 1: "Score Audit"
//
// Receives q1–q36 (Yes/No), scores with weighted 5/3/1 system,
// handles polarity (negative questions where Yes = 0), calculates
// pillars, dimensions, maturity, identity, sprint recommendation.
//
// PILLAR NAMES (the 4 D's):
//   Diagnose (q1–q9)   → was "Discover"
//   Define   (q10–q18) → was "Design"
//   Design   (q19–q27) → was "Deploy"
//   Deploy   (q28–q36) → was "Optimize"
// ═══════════════════════════════════════════════════════════════

const body = $node["Receiving Answers"].json.body || {};

const name = body.name || "";
const email = body.email || "";
const company =
  body.company ||
  body.company_name ||
  body.business ||
  body.businessName ||
  body.business_name ||
  "";

const answers = body;

// ───────────────────────────────────────────────
// WEIGHT MAP — Critical (5), Standard (3), Indicator (1)
// Pattern repeats every 3 questions within each sub-theme
// ───────────────────────────────────────────────
const weights = {
  1: 5,  2: 3,  3: 1,
  4: 5,  5: 3,  6: 1,
  7: 5,  8: 3,  9: 1,
  10: 5, 11: 3, 12: 1,
  13: 5, 14: 3, 15: 1,
  16: 5, 17: 3, 18: 1,
  19: 5, 20: 3, 21: 1,
  22: 5, 23: 3, 24: 1,
  25: 5, 26: 3, 27: 1,
  28: 5, 29: 3, 30: 1,
  31: 5, 32: 3, 33: 1,
  34: 5, 35: 3, 36: 1,
};

// ───────────────────────────────────────────────
// POLARITY MAP
// Negative questions: "Yes" = pain/problem → scores 0 (No scores full weight)
// Positive questions: "Yes" = strength → scores full weight
//
// Pattern: 1st question in each triplet is NEGATIVE,
//          2nd and 3rd are POSITIVE
// ───────────────────────────────────────────────
const NEGATIVE_QUESTIONS = new Set([
  1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34
]);

function isYes(qNumber) {
  const val = answers[`q${qNumber}`];
  if (!val) return false;
  return val.toString().toLowerCase() === "yes";
}

// Score a question accounting for polarity
function scoreQuestion(q) {
  const w = weights[q] || 0;
  const answeredYes = isYes(q);

  if (NEGATIVE_QUESTIONS.has(q)) {
    // Negative: Yes = bad (0 points), No = good (full weight)
    return answeredYes ? 0 : w;
  } else {
    // Positive: Yes = good (full weight), No = bad (0 points)
    return answeredYes ? w : 0;
  }
}

function scoreGroup(qList) {
  let score = 0;
  let max = 0;

  for (const q of qList) {
    max += weights[q] || 0;
    score += scoreQuestion(q);
  }

  return { score, max };
}

// ───────────────────────────────────────────────
// PILLAR QUESTION GROUPS (the 4 D's)
// ───────────────────────────────────────────────
const diagnoseQs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const defineQs   = [10, 11, 12, 13, 14, 15, 16, 17, 18];
const designQs   = [19, 20, 21, 22, 23, 24, 25, 26, 27];
const deployQs   = [28, 29, 30, 31, 32, 33, 34, 35, 36];

// ───────────────────────────────────────────────
// DIMENSION QUESTION GROUPS (12 sub-themes)
// ───────────────────────────────────────────────
const dimensionMap = {
  decision_clarity:       [1, 2, 3],
  workflow_awareness:     [4, 5, 6],
  role_understanding:     [7, 8, 9],
  workflow_structure:     [10, 11, 12],
  tool_integration:      [13, 14, 15],
  sop_maturity:          [16, 17, 18],
  automation_readiness:  [19, 20, 21],
  delegation_reliability:[22, 23, 24],
  execution_consistency: [25, 26, 27],
  performance_tracking:  [28, 29, 30],
  bottleneck_removal:    [31, 32, 33],
  momentum_maintenance:  [34, 35, 36],
};

// ───────────────────────────────────────────────
// SCORE PILLARS
// ───────────────────────────────────────────────
const diagnose = scoreGroup(diagnoseQs);
const define   = scoreGroup(defineQs);
const design   = scoreGroup(designQs);
const deploy   = scoreGroup(deployQs);

function normalizeTo25(group) {
  if (!group.max || group.max === 0) return 0;
  return Math.round((group.score / group.max) * 25);
}

function pct(group) {
  if (!group.max || group.max === 0) return 0;
  return Math.round((group.score / group.max) * 100);
}

const diagnoseNorm = normalizeTo25(diagnose);
const defineNorm   = normalizeTo25(define);
const designNorm   = normalizeTo25(design);
const deployNorm   = normalizeTo25(deploy);

// ───────────────────────────────────────────────
// TOTAL / OI SCORE
// ───────────────────────────────────────────────
const totalScore = diagnose.score + define.score + design.score + deploy.score;
const totalMax   = diagnose.max + define.max + design.max + deploy.max;

let oiScore = 0;
if (totalMax > 0) {
  oiScore = Math.round((totalScore / totalMax) * 100);
}

// ───────────────────────────────────────────────
// EXECUTIVE MATURITY MODEL, IDENTITY & VEOS PHASE
// ───────────────────────────────────────────────
let maturityLevel = "";
let identityLevel = "";
let veosPhase     = "";

if (oiScore <= 20) {
  maturityLevel = "Level 1 — Critical";
  identityLevel = "Carrier";
  veosPhase     = "Diagnose";
} else if (oiScore <= 40) {
  maturityLevel = "Level 2 — Developing";
  identityLevel = "Operator";
  veosPhase     = "Define";
} else if (oiScore <= 60) {
  maturityLevel = "Level 3 — Functional";
  identityLevel = "Architect – System Builder";
  veosPhase     = "Design";
} else if (oiScore <= 80) {
  maturityLevel = "Level 4 — Optimized";
  identityLevel = "Strategist";
  veosPhase     = "Deploy";
} else {
  maturityLevel = "Level 5 — Intelligent";
  identityLevel = "Prophet Leader";
  veosPhase     = "Scale / Amplify";
}

// ───────────────────────────────────────────────
// PILLAR SCORES OBJECT
// ───────────────────────────────────────────────
const pillarScores = {
  diagnose: {
    raw_score: diagnose.score,
    max_score: diagnose.max,
    normalized_25: diagnoseNorm,
    pct: pct(diagnose),
  },
  define: {
    raw_score: define.score,
    max_score: define.max,
    normalized_25: defineNorm,
    pct: pct(define),
  },
  design: {
    raw_score: design.score,
    max_score: design.max,
    normalized_25: designNorm,
    pct: pct(design),
  },
  deploy: {
    raw_score: deploy.score,
    max_score: deploy.max,
    normalized_25: deployNorm,
    pct: pct(deploy),
  },
};

// ───────────────────────────────────────────────
// WEAKEST PILLAR & RANKINGS
// ───────────────────────────────────────────────
const sortedPillars = Object.entries(pillarScores)
  .sort((a, b) => a[1].normalized_25 - b[1].normalized_25)
  .map(([key]) => key);

const weakestPillar = sortedPillars[0] || null;

// ───────────────────────────────────────────────
// SPRINT RECOMMENDATION (3 sprints)
//   Diagnose or Define → Category Intelligence Sprint
//   Design             → Operational Intelligence Sprint
//   Deploy             → Autonomous Execution Sprint
// ───────────────────────────────────────────────
let sprintRecommendation = "";

switch (weakestPillar) {
  case "diagnose":
  case "define":
    sprintRecommendation = "Category Intelligence Sprint";
    break;
  case "design":
    sprintRecommendation = "Operational Intelligence Sprint";
    break;
  case "deploy":
    sprintRecommendation = "Autonomous Execution Sprint";
    break;
  default:
    sprintRecommendation = "Category Intelligence Sprint";
}

// ───────────────────────────────────────────────
// DIMENSION SCORES
// ───────────────────────────────────────────────
const dimensionScores = {};
for (const [dimName, qList] of Object.entries(dimensionMap)) {
  const result = scoreGroup(qList);
  dimensionScores[dimName] = {
    raw_score: result.score,
    max_score: result.max,
    pct: pct(result),
  };
}

// ───────────────────────────────────────────────
// RETURN
// ───────────────────────────────────────────────
return {
  json: {
    name,
    email,
    company,

    raw_total_score: totalScore,
    raw_total_max: totalMax,
    operational_intelligence_score: oiScore,
    operational_intelligence_pct: oiScore,

    maturity_level: maturityLevel,
    identity_level: identityLevel,
    veos_phase_recommendation: veosPhase,

    pillar_scores: pillarScores,
    weakest_pillar: weakestPillar,
    pillar_rankings: sortedPillars,

    sprint_recommendation: sprintRecommendation,

    dimensions: dimensionScores,

    // Pass through economic fields for ROI node
    hours_per_week_lost: body.hours_per_week_lost,
    hourly_labor_cost_range: body.hourly_labor_cost_range,
    annualRevenue: body.annualRevenue,
  }
};
