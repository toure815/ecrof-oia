# Operational Intelligence Audit (OIA) — System Overview

> **Last updated:** March 2026
> **Status:** Active — production system
> **Owner:** Ecrof Media Co.

## What Is the OIA?

The Operational Intelligence Audit is Ecrof Media's proprietary diagnostic tool. It measures how intelligently a business operates by evaluating four operational pillars — the 4 D's. The audit takes approximately 12 minutes and produces a scored report with personalized recommendations, ROI projections, and a sprint pathway.

The OIA is the front door to Ecrof Media's high-ticket cohort mentoring program.

---

## How It Works (End to End)

```
1. User visits /startaudit on the Ecrof Media website
2. Answers 36 Yes/No questions (one at a time), then 3 economic questions, then contact info
3. Form POSTs to /api/audit → proxies to n8n webhook
4. n8n scores the audit, calculates ROI, generates a branded PDF report
5. PDF is emailed to the user via SendGrid
6. User sees a "check your inbox" confirmation page at /startaudit/results
7. Lead data is available for CRM / follow-up
```

---

## The 4 D's (Operational Pillars)

The OIA evaluates businesses across four pillars. Each pillar contains 9 questions organized into 3 sub-themes (dimensions).

| Pillar | Focus | Dimensions |
|--------|-------|------------|
| **Diagnose** (q1–q9) | Clarity & Flow | Decision Clarity, Workflow Awareness, Role Understanding |
| **Define** (q10–q18) | Structure & Systems | Workflow Structure, Tool Integration, SOP Maturity |
| **Design** (q19–q27) | Execution & Delegation | Automation Readiness, Delegation Reliability, Execution Consistency |
| **Deploy** (q28–q36) | Momentum & Capacity | Performance Tracking, Bottleneck Removal, Momentum Maintenance |

The weakest pillar determines the recommended sprint.

---

## Scoring System

### Weight Pattern

Every dimension has 3 questions following a consistent weight pattern:

| Position | Weight | Role |
|----------|--------|------|
| 1st in triplet | **5 — Critical** | Detects the core pain signal |
| 2nd in triplet | **3 — Standard** | Checks operational capability |
| 3rd in triplet | **1 — Indicator** | Measures habits and consistency |

**Max per pillar:** 27 points (3 dimensions × 9 weight points)
**Max total:** 108 points across all 4 pillars

### Polarity

Questions alternate between negative (pain-framed) and positive (strength-framed):

- **Negative questions** (1st in each triplet): Yes = problem exists = **0 points**. No = problem absent = **full weight**.
- **Positive questions** (2nd and 3rd in each triplet): Yes = strength present = **full weight**. No = strength absent = **0 points**.

**Negative question IDs:** q1, q4, q7, q10, q13, q16, q19, q22, q25, q28, q31, q34
**Positive question IDs:** All others

The polarity is handled in the n8n scoring node — the frontend sends raw "yes"/"no" answers without flipping.

### OI Score Calculation

```
pillar_raw    = sum of scored answers (0 or weight, based on polarity)
pillar_max    = 27
pillar_norm25 = (pillar_raw / pillar_max) × 25
pillar_pct    = (pillar_raw / pillar_max) × 100

total_raw = sum of all 4 pillar raws
total_max = 108
OI Score  = (total_raw / total_max) × 100    → 0 to 100
```

---

## Executive Maturity Model

The OI Score maps to five maturity levels, each with an executive identity and a recommended VEOS phase:

| OI Score | Maturity Level | Executive Identity | VEOS Phase |
|----------|----------------|-------------------|------------|
| 0–20% | Level 1 — Critical | Carrier | Diagnose |
| 21–40% | Level 2 — Developing | Operator | Define |
| 41–60% | Level 3 — Functional | Architect – System Builder | Design |
| 61–80% | Level 4 — Optimized | Strategist | Deploy |
| 81–100% | Level 5 — Intelligent | Prophet Leader | Scale / Amplify |

### What the Identity Levels Mean

- **Carrier:** The owner IS the business. Every decision, task, and outcome flows through them. The business cannot function without their constant involvement.
- **Operator:** The owner has begun building systems but still jumps in constantly. Processes exist but aren't reliable enough to run without oversight.
- **Architect – System Builder:** The owner is designing operational infrastructure. Workflows exist, delegation is improving, and the business can handle some complexity without the owner.
- **Strategist:** The owner operates above the day-to-day. Systems run reliably, teams execute with autonomy, and the owner focuses on growth and optimization.
- **Prophet Leader:** The business operates intelligently. Automation, delegation, and systems are mature. The owner leads vision and strategy while operations scale independently.

---

## Sprint Recommendations

The weakest pillar determines which sprint the business needs first:

| Weakest Pillar | Recommended Sprint | Investment | Focus |
|----------------|--------------------|------------|-------|
| Diagnose or Define | **Category Intelligence Sprint** | $5,000 | Clarity, structure, documentation, decision frameworks |
| Design | **Operational Intelligence Sprint** | $12,000 | Automation, delegation systems, execution reliability |
| Deploy | **Autonomous Execution Sprint** | $10,000 | Metrics, bottleneck removal, scalable capacity |

### Full Cohort Program

All three sprints are sold together as a **9-month high-ticket cohort mentoring program** totaling **$40,000–$45,000**. The individual sprint recommendation serves as the entry point and the most urgent area of focus.

---

## Digital Intern Readiness

"Digital Interns" are AI agents / automation agents that can be deployed into a business. The OIA assesses whether the business has enough operational structure for automation to deliver ROI.

| OI Score | Readiness Level | What It Means |
|----------|-----------------|---------------|
| 0–20% | Not Ready | Operations too unstable. Automation will fail or create more chaos. Focus on foundational systems first. |
| 21–40% | Level 1 | Some systems forming. Digital Interns can handle low-risk, repetitive tasks only. |
| 41–60% | Level 2 | Workflows improving. Digital Interns can handle structured tasks, routine communications, and operational support. |
| 61–80% | Level 3 | Systems stable. Digital Interns can handle higher-level execution, reducing manual work and increasing team performance. |
| 81–100% | Level 4 (Full) | Fully prepared. Digital Interns can integrate deeply into operations, multiplying efficiency at scale. |

---

## ROI Calculation

The ROI projection shows the business owner what they stand to recover by fixing their operational gaps.

### Inputs
- **Annual revenue** (from form) → mapped to midpoint value
- **Hours per week lost** (from form) → midpoint of selected range
- **Sprint recommendation** → determines investment cost

### Formula

```
hourlyRate     = annualRevenue / 2080          (yearly working hours)
yearlyHours    = hours_per_week_lost × 52
hoursRecovered = yearlyHours × 0.40            (40% recovery assumption)
yearlySavings  = hoursRecovered × hourlyRate
monthlySavings = yearlySavings / 12
annualROI      = yearlySavings / investmentCost
minROI         = max(annualROI, 3.5)            (floor: never shows below 3.5x)
```

### Why Revenue-Based Hourly Rate

We derive the hourly rate from revenue (not from the self-reported hourly labor cost) because:
1. Business owners don't think in hourly increments
2. Revenue / 2080 gives a defensible proxy for the owner's economic value per hour
3. The self-reported "hourly labor cost range" is kept in the form as a gut-check and context for the report, but does not drive the ROI math

---

## The 12 Dimensions

Each pillar contains 3 dimensions (sub-themes). These are scored individually and displayed in the PDF report as a detailed breakdown.

### Diagnose
| Dimension | Questions | What It Measures |
|-----------|-----------|-----------------|
| Decision Clarity | q1–q3 | How well decisions are structured and communicated |
| Workflow Awareness | q4–q6 | Whether work flows are visible and understood |
| Role Understanding | q7–q9 | Whether roles, responsibilities, and success criteria are defined |

### Define
| Dimension | Questions | What It Measures |
|-----------|-----------|-----------------|
| Workflow Structure | q10–q12 | Whether workflows are mapped, standardized, and followable |
| Tool Integration | q13–q15 | Whether tools are connected and strategically chosen |
| SOP Maturity | q16–q18 | Whether SOPs exist, are accurate, and stay current |

### Design
| Dimension | Questions | What It Measures |
|-----------|-----------|-----------------|
| Automation Readiness | q19–q21 | Whether repetitive work is identified and automatable |
| Delegation Reliability | q22–q24 | Whether work can be handed off without heavy oversight |
| Execution Consistency | q25–q27 | Whether deadlines are met and execution is tracked |

### Deploy
| Dimension | Questions | What It Measures |
|-----------|-----------|-----------------|
| Performance Tracking | q28–q30 | Whether metrics and dashboards drive decisions |
| Bottleneck Removal | q31–q33 | Whether blockers are surfaced and resolved proactively |
| Momentum Maintenance | q34–q36 | Whether the business improves continuously and builds capacity |

---

## Technical Architecture

### Frontend (Next.js)
- **`/startaudit`** — One-question-at-a-time form (40 steps: 36 Yes/No + 3 economic + 1 contact)
- **`/startaudit/results`** — Confirmation page ("check your inbox for your PDF report")
- **`/api/audit`** — API route that proxies form data to n8n webhook

### Backend (n8n Workflow)
```
Webhook: "Receiving Answers"
  → Code: "Score Audit"           (node-1) — weights, polarity, pillars, dimensions, maturity
  → Code: "Intern Readiness"      (node-2) — digital intern level + message
  → Code: "ROI Calculation"       (node-3) — revenue-based hourly rate, 40% recovery, sprint pricing
  → Code: "Final Report"          (node-4) — assembles complete report object
  → Code: "Build Report HTML"     (node-5) — branded PDF template
  → HTML-to-PDF conversion
  → SendGrid: email with PDF attachment
  → Respond to Webhook: { success: true }
```

### Webhook URL
`https://api.ecrofmedia.xyz/webhook/audit-results`

### Environment Variable
`N8N_WEBHOOK_URL` — can override the webhook URL in the Next.js app

---

## Form Field Reference

### Yes/No Questions (q1–q36)
- Sent as: `{ q1: "yes", q2: "no", ... q36: "yes" }`

### Economic Fields
| Field ID | Type | Sent Value |
|----------|------|------------|
| `hours_per_week_lost` | Select | Midpoint number as string: "8", "15", "25", "35", "45" |
| `hourly_labor_cost_range` | Select | Range string: "$15–$20/hr", "$21–$30/hr", etc. |
| `annualRevenue` | Select | Midpoint number as string: "150000", "375000", etc. |

### Contact Fields
| Field | Key |
|-------|-----|
| Name | `name` |
| Business Name | `business` |
| Email | `email` |

---

## PDF Report Sections

The branded PDF report sent via email contains:

1. **Cover** — Personalized greeting, Ecrof logo, dark header
2. **OI Score** — Large score display with identity, maturity, and VEOS phase pills
3. **Pillar Breakdown** — The 4 D's with colored progress bars, weakest pillar flagged, priority order
4. **Dimension Breakdown** — 12-row table with color-coded scores (red < 40%, yellow 40–69%, green 70%+)
5. **Sprint Recommendation** — Highlighted card with recommended sprint name
6. **Digital Intern Readiness** — Level and personalized message
7. **ROI Projection** — Grid showing hours recovered, monthly/yearly savings, investment cost, ROI multiplier
8. **CTA** — "Book Your Strategy Call" button
9. **Footer** — Ecrof Media branding

---

## Key Business Context

- The OIA is the **lead generation tool** for Ecrof Media's consulting business
- It positions the owner's current state clearly, then offers a clear next step (the sprint)
- "Digital Intern" is Ecrof Media's brand term for AI agents — framed as someone learning the business
- The audit is designed to create urgency by showing concrete dollar amounts being lost
- The 3 sprints ladder into a $40K–$45K cohort program, but each sprint can be sold independently
- The ROI floor of 3.5x ensures the investment always looks defensible
