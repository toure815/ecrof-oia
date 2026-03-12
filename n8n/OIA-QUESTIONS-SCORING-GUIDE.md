# OIA Audit — 36 Questions Reference & Scoring Guide

## Overview

- 36 Yes/No questions, 9 per pillar
- 3 economic range questions (hours_per_week_lost, hourly_labor_cost_range, annualRevenue)
- 1 contact step (name, business, email)
- Form field IDs: q1–q36
- Answers: "yes" or "no"

---

## Polarity Key

Some questions are framed as pain points (Yes = bad), others as strengths (Yes = good).

- **Negative polarity** (Yes = 0, No = 1): q1, q4, q7, q10, q13, q16, q19, q22, q25, q28, q31, q34
- **Positive polarity** (Yes = 1, No = 0): q2, q3, q5, q6, q8, q9, q11, q12, q14, q15, q17, q18, q20, q21, q23, q24, q26, q27, q29, q30, q32, q33, q35, q36

Max raw score per pillar: 9
Max total raw score: 36

---

## DISCOVER — Clarity & Flow (q1–q9)

### Sub-theme: Decision Architecture (q1–q3)

| ID | Polarity | Question |
|----|----------|----------|
| q1 | NEGATIVE | Do decisions frequently stall because your team isn't clear on how you want choices made? |
| q2 | POSITIVE | Do you have a clear structure for who makes which decisions across your operations? |
| q3 | POSITIVE | Do you consistently communicate how decisions should flow so people don't rely on guesswork? |

### Sub-theme: Workflow Visibility (q4–q6)

| ID | Polarity | Question |
|----|----------|----------|
| q4 | NEGATIVE | Do tasks slow down because key steps in your workflow live in people's heads instead of in a system? |
| q5 | POSITIVE | Does your team clearly understand how work moves from start to finish? |
| q6 | POSITIVE | Do you regularly review workflows to catch breakdowns before they cause drag? |

### Sub-theme: Role Clarity (q7–q9)

| ID | Polarity | Question |
|----|----------|----------|
| q7 | NEGATIVE | Do tasks bounce back to you because roles aren't defined tightly enough? |
| q8 | POSITIVE | Does your team know exactly what "success" looks like in their role? |
| q9 | POSITIVE | Do you have documented role responsibilities instead of verbal agreements? |

---

## DESIGN — Structure & Systems (q10–q18)

### Sub-theme: Workflow Design (q10–q12)

| ID | Polarity | Question |
|----|----------|----------|
| q10 | NEGATIVE | Do projects regularly get stuck because workflows aren't mapped or standardized? |
| q11 | POSITIVE | Do you have consistent steps your team follows for recurring tasks? |
| q12 | POSITIVE | Are workflows simple enough that someone new could follow them without asking you? |

### Sub-theme: Tool Stack (q13–q15)

| ID | Polarity | Question |
|----|----------|----------|
| q13 | NEGATIVE | Do you lose time because your tools don't talk to each other or require constant manual work? |
| q14 | POSITIVE | Does your team use a connected tool stack instead of a patchwork of disconnected apps? |
| q15 | POSITIVE | Are tools chosen based on strategy instead of convenience or crisis? |

### Sub-theme: SOPs & Documentation (q16–q18)

| ID | Polarity | Question |
|----|----------|----------|
| q16 | NEGATIVE | Do tasks rely on "tribal knowledge" because SOPs are missing or outdated? |
| q17 | POSITIVE | Do your SOPs actually reflect how the work gets done? |
| q18 | POSITIVE | Do you update SOPs when systems change? |

---

## DEPLOY — Execution & Delegation (q19–q27)

### Sub-theme: Automation Readiness (q19–q21)

| ID | Polarity | Question |
|----|----------|----------|
| q19 | NEGATIVE | Do you or your team still perform repetitive manual tasks that should already be automated? |
| q20 | POSITIVE | Are your current workflows stable enough to automate without breaking? |
| q21 | POSITIVE | Do you evaluate repeatable tasks for automation opportunities at least quarterly? |

### Sub-theme: Delegation Quality (q22–q24)

| ID | Polarity | Question |
|----|----------|----------|
| q22 | NEGATIVE | Do you volunteer or jump into tasks to help complete projects? |
| q23 | POSITIVE | Can delegated tasks be completed without you reviewing or editing heavily? |
| q24 | POSITIVE | Do you have a structure for delegating work with expectations, examples, and feedback? |

### Sub-theme: Execution Reliability (q25–q27)

| ID | Polarity | Question |
|----|----------|----------|
| q25 | NEGATIVE | Do deadlines slip or operations depend on heroic effort? |
| q26 | POSITIVE | Does your team consistently deliver work without micromanagement or reminders? |
| q27 | POSITIVE | Do you track execution issues so you can correct patterns instead of individuals? |

---

## OPTIMIZE — Momentum & Capacity (q28–q36)

### Sub-theme: Visibility & Metrics (q28–q30)

| ID | Polarity | Question |
|----|----------|----------|
| q28 | NEGATIVE | Do you struggle to measure what's really happening because key metrics aren't tracked? |
| q29 | POSITIVE | Do dashboards or reports help you make faster, clearer decisions? |
| q30 | POSITIVE | Do you review operational performance at least monthly? |

### Sub-theme: Bottleneck Resolution (q31–q33)

| ID | Polarity | Question |
|----|----------|----------|
| q31 | NEGATIVE | Do work delays come from bottlenecks you haven't fully identified or solved yet? |
| q32 | POSITIVE | Does your team surface blockers quickly so they don't pile up? |
| q33 | POSITIVE | Do you adjust workflows when patterns of delay repeat? |

### Sub-theme: Scalability (q34–q36)

| ID | Polarity | Question |
|----|----------|----------|
| q34 | NEGATIVE | Is growth slowed because operations can't handle more volume without breaking? |
| q35 | POSITIVE | Do you make regular improvements instead of waiting for breakdowns? |
| q36 | POSITIVE | Do you proactively build capacity before it becomes a bottleneck? |

---

## Economic / ROI Fields

| ID | Question | Options (label → value) |
|----|----------|------------------------|
| hours_per_week_lost | On average, how many hours per week do you personally spend on work that does not require your level of attention? | 5–10 hrs → "8", 11–20 hrs → "15", 21–30 hrs → "25", 31–40 hrs → "35", 40+ hrs → "45" |
| hourly_labor_cost_range | If this work were delegated or automated, what hourly rate would you reasonably pay to replace it? | $15–$20/hr, $21–$30/hr, $31–$40/hr, $41–$60/hr, $60+/hr |
| annualRevenue | Where is your approximate annual revenue? | Under $250K → "150000", $250K–$500K → "375000", $500K–$1M → "750000", $1M–$3M → "2000000", $3M–$5M → "4000000", Over $5M → "6000000" |

---

## Contact Fields

| Field | Key |
|-------|-----|
| Name | name |
| Business Name | business |
| Email | email |

---

## Scoring Formula Reference

### Per Pillar (9 questions each)
```
raw_score = sum of scored answers (0 or 1 per question based on polarity)
max_score = 9
normalized_25 = (raw_score / 9) * 25
pct = (raw_score / 9) * 100
```

### Overall OI Score
```
operationalIntelligenceScore = discover.normalized_25 + design.normalized_25 + deploy.normalized_25 + optimize.normalized_25
operationalIntelligencePct = (operationalIntelligenceScore / 100) * 100
```

### Weakest Pillar
```
weakestPillar = pillar with lowest raw_score
rankings = all 4 pillars sorted lowest to highest
```

### ROI (uses economic fields)
```
hours_per_week = parseInt(hours_per_week_lost)      // midpoint value
hourly_rate = parsed midpoint of hourly_labor_cost_range
annual_revenue = parseInt(annualRevenue)

hoursRecovered = hours_per_week * 52
monthlySavings = hours_per_week * hourly_rate * 4.33
yearlySavings = monthlySavings * 12
```
