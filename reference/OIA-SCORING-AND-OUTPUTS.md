# OIA — Scoring Engine & Output Reference

> How every number in the OIA report is calculated, what each output means, and how they connect.

---

## Scoring Pipeline

```
Raw Answers (q1–q36: "yes"/"no")
  → Apply polarity (flip negative questions)
  → Apply weights (5/3/1)
  → Score 4 pillars + 12 dimensions
  → Calculate OI Score (0–100)
  → Determine maturity level, identity, VEOS phase
  → Identify weakest pillar → sprint recommendation
  → Calculate Digital Intern Readiness
  → Calculate ROI projection
  → Assemble final report
```

---

## Pillar Scoring

### Per Pillar (9 questions, max 27 points)

```
For each question in the pillar:
  if NEGATIVE question:
    score = (answer === "yes") ? 0 : weight
  if POSITIVE question:
    score = (answer === "yes") ? weight : 0

pillar_raw       = sum of all 9 question scores
pillar_max       = 27
pillar_norm25    = round((pillar_raw / 27) × 25)
pillar_pct       = round((pillar_raw / 27) × 100)
```

### OI Score

```
total_raw = diagnose.raw + define.raw + design.raw + deploy.raw
total_max = 108
OI_Score  = round((total_raw / 108) × 100)
```

---

## Maturity / Identity / VEOS Phase

| OI Score Range | maturity_level | identity_level | veos_phase_recommendation |
|----------------|---------------|----------------|--------------------------|
| 0–20 | "Level 1 — Critical" | "Carrier" | "Diagnose" |
| 21–40 | "Level 2 — Developing" | "Operator" | "Define" |
| 41–60 | "Level 3 — Functional" | "Architect – System Builder" | "Design" |
| 61–80 | "Level 4 — Optimized" | "Strategist" | "Deploy" |
| 81–100 | "Level 5 — Intelligent" | "Prophet Leader" | "Scale / Amplify" |

---

## Sprint Recommendation

Determined by the weakest pillar (lowest normalized_25 score):

| weakest_pillar | sprint_recommendation | investmentCost |
|----------------|----------------------|----------------|
| "diagnose" | "Category Intelligence Sprint" | $5,000 |
| "define" | "Category Intelligence Sprint" | $5,000 |
| "design" | "Operational Intelligence Sprint" | $12,000 |
| "deploy" | "Autonomous Execution Sprint" | $10,000 |

**Pillar rankings:** Sorted array from weakest to strongest, e.g. `["define", "diagnose", "deploy", "design"]`

---

## Digital Intern Readiness

| OI Score | internLevel | internMessage (summary) |
|----------|-------------|------------------------|
| 0–20 | "Not Ready for Digital Interns" | Operations too unstable for automation |
| 21–40 | "Digital Intern Readiness: Level 1" | Can support low-risk, repetitive tasks |
| 41–60 | "Digital Intern Readiness: Level 2" | Can handle structured tasks and routine ops |
| 61–80 | "Digital Intern Readiness: Level 3" | Can handle higher-level execution |
| 81–100 | "Digital Intern Readiness: Level 4 (Full)" | Fully prepared for integrated automation |

---

## ROI Calculation

### Inputs

| Variable | Source | Example |
|----------|--------|---------|
| `annualRevenue` | Form field (midpoint) | 750000 |
| `hours_per_week_lost` | Form field (midpoint) | 25 |
| `sprint_recommendation` | Scoring engine | "Operational Intelligence Sprint" |

### Formula

```
hourlyRate     = annualRevenue / 2080
yearlyHours    = hours_per_week_lost × 52
hoursRecovered = yearlyHours × 0.40
yearlySavings  = hoursRecovered × hourlyRate
monthlySavings = yearlySavings / 12
annualROI      = yearlySavings / investmentCost
minROI         = max(annualROI, 3.5)
```

### Example Calculation

```
Revenue: $750,000 → hourlyRate = $360.58
Hours lost: 25/week → yearlyHours = 1,300
Recovery (40%): hoursRecovered = 520
yearlySavings = 520 × $360.58 = $187,501
monthlySavings = $15,625
Sprint: Operational Intelligence → investment = $12,000
annualROI = $187,501 / $12,000 = 15.63x
minROI = 15.63x (above 3.5 floor)
```

---

## Dimension Scores (12 Sub-themes)

Each dimension has 3 questions with a max of 9 points (5+3+1).

| Key | Dimension | Pillar | Questions |
|-----|-----------|--------|-----------|
| `decision_clarity` | Decision Clarity | Diagnose | q1–q3 |
| `workflow_awareness` | Workflow Awareness | Diagnose | q4–q6 |
| `role_understanding` | Role Understanding | Diagnose | q7–q9 |
| `workflow_structure` | Workflow Structure | Define | q10–q12 |
| `tool_integration` | Tool Integration | Define | q13–q15 |
| `sop_maturity` | SOP Maturity | Define | q16–q18 |
| `automation_readiness` | Automation Readiness | Design | q19–q21 |
| `delegation_reliability` | Delegation Reliability | Design | q22–q24 |
| `execution_consistency` | Execution Consistency | Design | q25–q27 |
| `performance_tracking` | Performance Tracking | Deploy | q28–q30 |
| `bottleneck_removal` | Bottleneck Removal | Deploy | q31–q33 |
| `momentum_maintenance` | Momentum Maintenance | Deploy | q34–q36 |

Each outputs: `{ raw_score, max_score, pct }`

Color coding in the PDF:
- **Red** (< 40%): Critical gap
- **Yellow** (40–69%): Developing
- **Green** (70%+): Strong

---

## Final Report Output Shape

This is the complete JSON object that feeds the PDF builder, email, and any downstream systems:

```json
{
  "operational_intelligence_score": 47,
  "operational_intelligence_pct": 47,

  "pillars": {
    "diagnose": { "raw_score": 14, "max_score": 27, "normalized_25": 13, "pct": 52 },
    "define":   { "raw_score": 10, "max_score": 27, "normalized_25": 9,  "pct": 37 },
    "design":   { "raw_score": 16, "max_score": 27, "normalized_25": 15, "pct": 59 },
    "deploy":   { "raw_score": 11, "max_score": 27, "normalized_25": 10, "pct": 41 },
    "weakest_pillar": "define",
    "rankings": ["define", "deploy", "diagnose", "design"]
  },

  "dimensions": {
    "decision_clarity":       { "raw_score": 5, "max_score": 9, "pct": 56 },
    "workflow_awareness":     { "raw_score": 4, "max_score": 9, "pct": 44 },
    "role_understanding":     { "raw_score": 5, "max_score": 9, "pct": 56 },
    "workflow_structure":     { "raw_score": 3, "max_score": 9, "pct": 33 },
    "tool_integration":       { "raw_score": 4, "max_score": 9, "pct": 44 },
    "sop_maturity":           { "raw_score": 3, "max_score": 9, "pct": 33 },
    "automation_readiness":   { "raw_score": 6, "max_score": 9, "pct": 67 },
    "delegation_reliability": { "raw_score": 5, "max_score": 9, "pct": 56 },
    "execution_consistency":  { "raw_score": 5, "max_score": 9, "pct": 56 },
    "performance_tracking":   { "raw_score": 4, "max_score": 9, "pct": 44 },
    "bottleneck_removal":     { "raw_score": 3, "max_score": 9, "pct": 33 },
    "momentum_maintenance":   { "raw_score": 4, "max_score": 9, "pct": 44 }
  },

  "identity_level": "Level 3 — Functional",
  "maturity_level": "Architect – System Builder",
  "veos_phase_recommendation": "Design",

  "sprint_recommendation": "Category Intelligence Sprint",

  "internLevel": "Digital Intern Readiness: Level 2",
  "internMessage": "Your workflows and delegation are improving...",

  "roi": {
    "hourlyRate": 360.58,
    "hoursRecovered": 520,
    "monthlySavings": 15625.08,
    "yearlySavings": 187501,
    "investmentCost": 5000,
    "annualROI": 37.5,
    "minROI": 37.5
  },

  "name": "Jane Smith",
  "email": "jane@company.com",
  "company": "Smith & Co",
  "generated_at": "2026-03-12T14:30:00.000Z"
}
```
