/**
 * OIA — Complete 36-Question Reference
 *
 * Source of truth: ecrof-brain → OIA-QUESTIONS-COMPLETE.md
 * Scoring: Weight pattern per triplet → 5 (Critical) → 3 (Standard) → 1 (Indicator)
 * Polarity: 1st question in every triplet is NEGATIVE (Yes = 0), 2nd and 3rd are POSITIVE (Yes = weight)
 * Max per pillar: 27 points | Max total: 108 points
 */

export type Polarity = "NEG" | "POS";

export interface OiaQuestion {
  id: string;
  number: number;
  weight: 5 | 3 | 1;
  polarity: Polarity;
  text: string;
  pillar: string;
  dimension: string;
}

export interface Dimension {
  key: string;
  label: string;
  questions: OiaQuestion[];
}

export interface Pillar {
  key: string;
  label: string;
  subtitle: string;
  description: string;
  dimensions: Dimension[];
}

export interface EconomicOption {
  label: string;
  value: string;
}

export interface EconomicField {
  key: string;
  question: string;
  options: EconomicOption[];
}

// ─────────────────────────────────────────────
// PILLARS & QUESTIONS
// ─────────────────────────────────────────────

export const PILLARS: Pillar[] = [
  {
    key: "diagnose",
    label: "DIAGNOSE",
    subtitle: "Clarity & Flow",
    description:
      "Whether your business has clear decision-making structures, visible workflows, and well-defined roles.",
    dimensions: [
      {
        key: "decision_clarity",
        label: "Decision Clarity",
        questions: [
          {
            id: "q1",
            number: 1,
            weight: 5,
            polarity: "NEG",
            text: "Do decisions frequently stall because your team isn't clear on how you want choices made?",
            pillar: "diagnose",
            dimension: "decision_clarity",
          },
          {
            id: "q2",
            number: 2,
            weight: 3,
            polarity: "POS",
            text: "Do you have a clear structure for who makes which decisions across your operations?",
            pillar: "diagnose",
            dimension: "decision_clarity",
          },
          {
            id: "q3",
            number: 3,
            weight: 1,
            polarity: "POS",
            text: "Do you consistently communicate how decisions should flow so people don't rely on guesswork?",
            pillar: "diagnose",
            dimension: "decision_clarity",
          },
        ],
      },
      {
        key: "workflow_awareness",
        label: "Workflow Awareness",
        questions: [
          {
            id: "q4",
            number: 4,
            weight: 5,
            polarity: "NEG",
            text: "Do tasks slow down because key steps in your workflow live in people's heads instead of in a system?",
            pillar: "diagnose",
            dimension: "workflow_awareness",
          },
          {
            id: "q5",
            number: 5,
            weight: 3,
            polarity: "POS",
            text: "Does your team clearly understand how work moves from start to finish?",
            pillar: "diagnose",
            dimension: "workflow_awareness",
          },
          {
            id: "q6",
            number: 6,
            weight: 1,
            polarity: "POS",
            text: "Do you regularly review workflows to catch breakdowns before they cause drag?",
            pillar: "diagnose",
            dimension: "workflow_awareness",
          },
        ],
      },
      {
        key: "role_understanding",
        label: "Role Understanding",
        questions: [
          {
            id: "q7",
            number: 7,
            weight: 5,
            polarity: "NEG",
            text: "Do tasks bounce back to you because roles aren't defined tightly enough?",
            pillar: "diagnose",
            dimension: "role_understanding",
          },
          {
            id: "q8",
            number: 8,
            weight: 3,
            polarity: "POS",
            text: "Does your team know exactly what \"success\" looks like in their role?",
            pillar: "diagnose",
            dimension: "role_understanding",
          },
          {
            id: "q9",
            number: 9,
            weight: 1,
            polarity: "POS",
            text: "Do you have documented role responsibilities instead of verbal agreements?",
            pillar: "diagnose",
            dimension: "role_understanding",
          },
        ],
      },
    ],
  },
  {
    key: "define",
    label: "DEFINE",
    subtitle: "Structure & Systems",
    description:
      "Whether your business has standardized workflows, an integrated tool stack, and mature SOPs.",
    dimensions: [
      {
        key: "workflow_structure",
        label: "Workflow Structure",
        questions: [
          {
            id: "q10",
            number: 10,
            weight: 5,
            polarity: "NEG",
            text: "Do projects regularly get stuck because workflows aren't mapped or standardized?",
            pillar: "define",
            dimension: "workflow_structure",
          },
          {
            id: "q11",
            number: 11,
            weight: 3,
            polarity: "POS",
            text: "Do you have consistent steps your team follows for recurring tasks?",
            pillar: "define",
            dimension: "workflow_structure",
          },
          {
            id: "q12",
            number: 12,
            weight: 1,
            polarity: "POS",
            text: "Are workflows simple enough that someone new could follow them without asking you?",
            pillar: "define",
            dimension: "workflow_structure",
          },
        ],
      },
      {
        key: "tool_integration",
        label: "Tool Integration",
        questions: [
          {
            id: "q13",
            number: 13,
            weight: 5,
            polarity: "NEG",
            text: "Do you lose time because your tools don't talk to each other or require constant manual work?",
            pillar: "define",
            dimension: "tool_integration",
          },
          {
            id: "q14",
            number: 14,
            weight: 3,
            polarity: "POS",
            text: "Does your team use a connected tool stack instead of a patchwork of disconnected apps?",
            pillar: "define",
            dimension: "tool_integration",
          },
          {
            id: "q15",
            number: 15,
            weight: 1,
            polarity: "POS",
            text: "Are tools chosen based on strategy instead of convenience or crisis?",
            pillar: "define",
            dimension: "tool_integration",
          },
        ],
      },
      {
        key: "sop_maturity",
        label: "SOP Maturity",
        questions: [
          {
            id: "q16",
            number: 16,
            weight: 5,
            polarity: "NEG",
            text: "Do tasks rely on \"tribal knowledge\" because SOPs are missing or outdated?",
            pillar: "define",
            dimension: "sop_maturity",
          },
          {
            id: "q17",
            number: 17,
            weight: 3,
            polarity: "POS",
            text: "Do your SOPs actually reflect how the work gets done?",
            pillar: "define",
            dimension: "sop_maturity",
          },
          {
            id: "q18",
            number: 18,
            weight: 1,
            polarity: "POS",
            text: "Do you update SOPs when systems change?",
            pillar: "define",
            dimension: "sop_maturity",
          },
        ],
      },
    ],
  },
  {
    key: "design",
    label: "DESIGN",
    subtitle: "Execution & Delegation",
    description:
      "Whether your business can execute reliably without you — automation readiness, delegation quality, and deadline consistency.",
    dimensions: [
      {
        key: "automation_readiness",
        label: "Automation Readiness",
        questions: [
          {
            id: "q19",
            number: 19,
            weight: 5,
            polarity: "NEG",
            text: "Do you or your team still perform repetitive manual tasks that should already be automated?",
            pillar: "design",
            dimension: "automation_readiness",
          },
          {
            id: "q20",
            number: 20,
            weight: 3,
            polarity: "POS",
            text: "Are your current workflows stable enough to automate without breaking?",
            pillar: "design",
            dimension: "automation_readiness",
          },
          {
            id: "q21",
            number: 21,
            weight: 1,
            polarity: "POS",
            text: "Do you evaluate repeatable tasks for automation opportunities at least quarterly?",
            pillar: "design",
            dimension: "automation_readiness",
          },
        ],
      },
      {
        key: "delegation_reliability",
        label: "Delegation Reliability",
        questions: [
          {
            id: "q22",
            number: 22,
            weight: 5,
            polarity: "NEG",
            text: "Do you volunteer or jump into tasks to help complete projects?",
            pillar: "design",
            dimension: "delegation_reliability",
          },
          {
            id: "q23",
            number: 23,
            weight: 3,
            polarity: "POS",
            text: "Can delegated tasks be completed without you reviewing or editing heavily?",
            pillar: "design",
            dimension: "delegation_reliability",
          },
          {
            id: "q24",
            number: 24,
            weight: 1,
            polarity: "POS",
            text: "Do you have a structure for delegating work with expectations, examples, and feedback?",
            pillar: "design",
            dimension: "delegation_reliability",
          },
        ],
      },
      {
        key: "execution_consistency",
        label: "Execution Consistency",
        questions: [
          {
            id: "q25",
            number: 25,
            weight: 5,
            polarity: "NEG",
            text: "Do deadlines slip or operations depend on heroic effort?",
            pillar: "design",
            dimension: "execution_consistency",
          },
          {
            id: "q26",
            number: 26,
            weight: 3,
            polarity: "POS",
            text: "Does your team consistently deliver work without micromanagement or reminders?",
            pillar: "design",
            dimension: "execution_consistency",
          },
          {
            id: "q27",
            number: 27,
            weight: 1,
            polarity: "POS",
            text: "Do you track execution issues so you can correct patterns instead of individuals?",
            pillar: "design",
            dimension: "execution_consistency",
          },
        ],
      },
    ],
  },
  {
    key: "deploy",
    label: "DEPLOY",
    subtitle: "Momentum & Capacity",
    description:
      "Whether your business can sustain growth — performance visibility, bottleneck resolution, and proactive capacity building.",
    dimensions: [
      {
        key: "performance_tracking",
        label: "Performance Tracking",
        questions: [
          {
            id: "q28",
            number: 28,
            weight: 5,
            polarity: "NEG",
            text: "Do you struggle to measure what's really happening because key metrics aren't tracked?",
            pillar: "deploy",
            dimension: "performance_tracking",
          },
          {
            id: "q29",
            number: 29,
            weight: 3,
            polarity: "POS",
            text: "Do dashboards or reports help you make faster, clearer decisions?",
            pillar: "deploy",
            dimension: "performance_tracking",
          },
          {
            id: "q30",
            number: 30,
            weight: 1,
            polarity: "POS",
            text: "Do you review operational performance at least monthly?",
            pillar: "deploy",
            dimension: "performance_tracking",
          },
        ],
      },
      {
        key: "bottleneck_removal",
        label: "Bottleneck Removal",
        questions: [
          {
            id: "q31",
            number: 31,
            weight: 5,
            polarity: "NEG",
            text: "Do work delays come from bottlenecks you haven't fully identified or solved yet?",
            pillar: "deploy",
            dimension: "bottleneck_removal",
          },
          {
            id: "q32",
            number: 32,
            weight: 3,
            polarity: "POS",
            text: "Does your team surface blockers quickly so they don't pile up?",
            pillar: "deploy",
            dimension: "bottleneck_removal",
          },
          {
            id: "q33",
            number: 33,
            weight: 1,
            polarity: "POS",
            text: "Do you adjust workflows when patterns of delay repeat?",
            pillar: "deploy",
            dimension: "bottleneck_removal",
          },
        ],
      },
      {
        key: "momentum_maintenance",
        label: "Momentum Maintenance",
        questions: [
          {
            id: "q34",
            number: 34,
            weight: 5,
            polarity: "NEG",
            text: "Is growth slowed because operations can't handle more volume without breaking?",
            pillar: "deploy",
            dimension: "momentum_maintenance",
          },
          {
            id: "q35",
            number: 35,
            weight: 3,
            polarity: "POS",
            text: "Do you make regular improvements instead of waiting for breakdowns?",
            pillar: "deploy",
            dimension: "momentum_maintenance",
          },
          {
            id: "q36",
            number: 36,
            weight: 1,
            polarity: "POS",
            text: "Do you proactively build capacity before it becomes a bottleneck?",
            pillar: "deploy",
            dimension: "momentum_maintenance",
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────
// ECONOMIC & CONTEXT FIELDS
// ─────────────────────────────────────────────

export const ECONOMIC_FIELDS: EconomicField[] = [
  {
    key: "hours_per_week_lost",
    question:
      "How many hours per week do you spend on tasks someone else could handle — approvals, follow-ups, fixes, or decisions that shouldn't need you?",
    options: [
      { label: "5 – 10 hours", value: "8" },
      { label: "11 – 20 hours", value: "15" },
      { label: "21 – 30 hours", value: "25" },
      { label: "31 – 40 hours", value: "35" },
      { label: "40+ hours", value: "45" },
    ],
  },
  {
    key: "hourly_labor_cost_range",
    question:
      "If this work were delegated or automated, what hourly rate would you reasonably pay to replace it?",
    options: [
      { label: "$15 – $20 / hr", value: "$15–$20/hr" },
      { label: "$21 – $30 / hr", value: "$21–$30/hr" },
      { label: "$31 – $40 / hr", value: "$31–$40/hr" },
      { label: "$41 – $60 / hr", value: "$41–$60/hr" },
      { label: "$60+ / hr", value: "$60+/hr" },
    ],
  },
  {
    key: "annualRevenue",
    question: "Where is your approximate annual revenue?",
    options: [
      { label: "Under $250K", value: "150000" },
      { label: "$250K – $500K", value: "375000" },
      { label: "$500K – $1M", value: "750000" },
      { label: "$1M – $3M", value: "2000000" },
      { label: "$3M – $5M", value: "4000000" },
      { label: "Over $5M", value: "6000000" },
    ],
  },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Flat list of all 36 questions */
export function getAllQuestions(): OiaQuestion[] {
  return PILLARS.flatMap((p) => p.dimensions.flatMap((d) => d.questions));
}

/** Total number of dimension steps (12 dimensions = 12 screens of 3 questions) */
export function getTotalDimensionSteps(): number {
  return PILLARS.reduce((acc, p) => acc + p.dimensions.length, 0);
}
