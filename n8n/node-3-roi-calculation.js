// ═══════════════════════════════════════════════════════════════
// n8n Code Node 3: "ROI Calculation"
//
// Derives hourly rate from annual revenue (revenue / 2080),
// applies 40% time recovery, and calculates savings against
// sprint investment cost.
//
// SPRINT PRICING:
//   Category Intelligence Sprint    → $5,000
//   Operational Intelligence Sprint → $12,000
//   Autonomous Execution Sprint     → $10,000
//   Full Cohort (9 months)          → $40,000–$45,000
// ═══════════════════════════════════════════════════════════════

// ───────────────────────────────────────────────
// PERSONAL INFO
// ───────────────────────────────────────────────
const name    = $json.name || "";
const email   = $json.email || "";
const company = $json.company || "";

// ───────────────────────────────────────────────
// RAW INPUTS
// ───────────────────────────────────────────────
const annualRevenueRaw = $json.annualRevenue || null;

const annualRevenueNumeric = annualRevenueRaw
  ? Number(String(annualRevenueRaw).replace(/[^0-9]/g, ""))
  : null;

const weeklyLost = Number($json.hours_per_week_lost) || null;

if (!annualRevenueNumeric || weeklyLost === null || isNaN(weeklyLost)) {
  return {
    json: {
      error: "Missing or invalid revenue or time-loss data",
      annualRevenueRaw,
      annualRevenueNumeric,
      weeklyLost,
      received: $json,
    }
  };
}

// ───────────────────────────────────────────────
// MAP REVENUE → RANGE BUCKET → MIDPOINT
// ───────────────────────────────────────────────
function getRevenueRange(num) {
  if (num < 250000)  return "Under $250K";
  if (num < 500000)  return "$250K–$500K";
  if (num < 1000000) return "$500K–$1M";
  if (num < 3000000) return "$1M–$3M";
  if (num < 5000000) return "$3M–$5M";
  return "Over $5M";
}

const revenueRange = getRevenueRange(annualRevenueNumeric);

const revenueMap = {
  "Under $250K": 150000,
  "$250K–$500K": 375000,
  "$500K–$1M":   750000,
  "$1M–$3M":     2000000,
  "$3M–$5M":     4000000,
  "Over $5M":    6000000,
};

const annualRevenue = revenueMap[revenueRange];

// ───────────────────────────────────────────────
// HOURLY VALUE (revenue / 2080 working hours)
// ───────────────────────────────────────────────
const hourlyRate = Number((annualRevenue / 2080).toFixed(2));

// ───────────────────────────────────────────────
// TIME RECOVERY (40% of lost hours)
// ───────────────────────────────────────────────
const yearlyHours = weeklyLost * 52;
const recoveryPct = 0.40;
const hoursRecovered = yearlyHours * recoveryPct;

// ───────────────────────────────────────────────
// SAVINGS
// ───────────────────────────────────────────────
const yearlySavings  = hoursRecovered * hourlyRate;
const monthlySavings = Number((yearlySavings / 12).toFixed(2));

// ───────────────────────────────────────────────
// INVESTMENT COST (based on sprint)
// ───────────────────────────────────────────────
const sprint = $json.sprint_recommendation;

let investmentCost = 5000; // default

if (sprint === "Category Intelligence Sprint")    investmentCost = 5000;
if (sprint === "Operational Intelligence Sprint")  investmentCost = 12000;
if (sprint === "Autonomous Execution Sprint")      investmentCost = 10000;

// ───────────────────────────────────────────────
// ROI
// ───────────────────────────────────────────────
const annualROI = Number((yearlySavings / investmentCost).toFixed(2));
const minROI    = Number(Math.max(annualROI, 3.5).toFixed(2));

// ───────────────────────────────────────────────
// RETURN
// ───────────────────────────────────────────────
return {
  json: {
    // ROI
    hourlyRate,
    hoursRecovered,
    yearlySavings,
    monthlySavings,
    investmentCost,
    annualROI,
    minROI,

    // Revenue
    revenueRange,
    annualRevenueNumeric,

    // Pass through from scoring
    sprint_recommendation:          $json.sprint_recommendation,
    operational_intelligence_score: $json.operational_intelligence_score,
    operational_intelligence_pct:   $json.operational_intelligence_pct,
    identity_level:                 $json.identity_level,
    maturity_level:                 $json.maturity_level,
    veos_phase_recommendation:      $json.veos_phase_recommendation,
    weakest_pillar:                 $json.weakest_pillar,
    pillar_scores:                  $json.pillar_scores,
    pillar_rankings:                $json.pillar_rankings,
    dimensions:                     $json.dimensions,
    internLevel:                    $json.internLevel,
    internMessage:                  $json.internMessage,
    hourly_labor_cost_range:        $json.hourly_labor_cost_range,

    // Personal
    name,
    email,
    company,
  }
};
