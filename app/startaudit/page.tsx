"use client";

import { useState } from "react";
import Image from "next/image";

/* ───────────────────────────────────────────────
   QUESTION DATA
   ─────────────────────────────────────────────── */

type Step =
  | { type: "yesno"; id: string; category: string; question: string }
  | { type: "select"; id: string; category: string; question: string; options: { label: string; value: string }[] }
  | { type: "contact" };

const QUESTIONS: Step[] = [
  // ── DISCOVER — Clarity & Flow ──
  { type: "yesno", id: "q1",  category: "Clarity & Flow", question: "Do decisions frequently stall because your team isn't clear on how you want choices made?" },
  { type: "yesno", id: "q2",  category: "Clarity & Flow", question: "Do you have a clear structure for who makes which decisions across your operations?" },
  { type: "yesno", id: "q3",  category: "Clarity & Flow", question: "Do you consistently communicate how decisions should flow so people don't rely on guesswork?" },
  { type: "yesno", id: "q4",  category: "Clarity & Flow", question: "Do tasks slow down because key steps in your workflow live in people's heads instead of in a system?" },
  { type: "yesno", id: "q5",  category: "Clarity & Flow", question: "Does your team clearly understand how work moves from start to finish?" },
  { type: "yesno", id: "q6",  category: "Clarity & Flow", question: "Do you regularly review workflows to catch breakdowns before they cause drag?" },
  { type: "yesno", id: "q7",  category: "Clarity & Flow", question: "Do tasks bounce back to you because roles aren't defined tightly enough?" },
  { type: "yesno", id: "q8",  category: "Clarity & Flow", question: "Does your team know exactly what \"success\" looks like in their role?" },
  { type: "yesno", id: "q9",  category: "Clarity & Flow", question: "Do you have documented role responsibilities instead of verbal agreements?" },

  // ── DESIGN — Structure & Systems ──
  { type: "yesno", id: "q10", category: "Structure & Systems", question: "Do projects regularly get stuck because workflows aren't mapped or standardized?" },
  { type: "yesno", id: "q11", category: "Structure & Systems", question: "Do you have consistent steps your team follows for recurring tasks?" },
  { type: "yesno", id: "q12", category: "Structure & Systems", question: "Are workflows simple enough that someone new could follow them without asking you?" },
  { type: "yesno", id: "q13", category: "Structure & Systems", question: "Do you lose time because your tools don't talk to each other or require constant manual work?" },
  { type: "yesno", id: "q14", category: "Structure & Systems", question: "Does your team use a connected tool stack instead of a patchwork of disconnected apps?" },
  { type: "yesno", id: "q15", category: "Structure & Systems", question: "Are tools chosen based on strategy instead of convenience or crisis?" },
  { type: "yesno", id: "q16", category: "Structure & Systems", question: "Do tasks rely on \"tribal knowledge\" because SOPs are missing or outdated?" },
  { type: "yesno", id: "q17", category: "Structure & Systems", question: "Do your SOPs actually reflect how the work gets done?" },
  { type: "yesno", id: "q18", category: "Structure & Systems", question: "Do you update SOPs when systems change?" },

  // ── DEPLOY — Execution & Delegation ──
  { type: "yesno", id: "q19", category: "Execution & Delegation", question: "Do you or your team still perform repetitive manual tasks that should already be automated?" },
  { type: "yesno", id: "q20", category: "Execution & Delegation", question: "Are your current workflows stable enough to automate without breaking?" },
  { type: "yesno", id: "q21", category: "Execution & Delegation", question: "Do you evaluate repeatable tasks for automation opportunities at least quarterly?" },
  { type: "yesno", id: "q22", category: "Execution & Delegation", question: "Do you volunteer or jump into tasks to help complete projects?" },
  { type: "yesno", id: "q23", category: "Execution & Delegation", question: "Can delegated tasks be completed without you reviewing or editing heavily?" },
  { type: "yesno", id: "q24", category: "Execution & Delegation", question: "Do you have a structure for delegating work with expectations, examples, and feedback?" },
  { type: "yesno", id: "q25", category: "Execution & Delegation", question: "Do deadlines slip or operations depend on heroic effort?" },
  { type: "yesno", id: "q26", category: "Execution & Delegation", question: "Does your team consistently deliver work without micromanagement or reminders?" },
  { type: "yesno", id: "q27", category: "Execution & Delegation", question: "Do you track execution issues so you can correct patterns instead of individuals?" },

  // ── OPTIMIZE — Momentum & Capacity ──
  { type: "yesno", id: "q28", category: "Momentum & Capacity", question: "Do you struggle to measure what's really happening because key metrics aren't tracked?" },
  { type: "yesno", id: "q29", category: "Momentum & Capacity", question: "Do dashboards or reports help you make faster, clearer decisions?" },
  { type: "yesno", id: "q30", category: "Momentum & Capacity", question: "Do you review operational performance at least monthly?" },
  { type: "yesno", id: "q31", category: "Momentum & Capacity", question: "Do work delays come from bottlenecks you haven't fully identified or solved yet?" },
  { type: "yesno", id: "q32", category: "Momentum & Capacity", question: "Does your team surface blockers quickly so they don't pile up?" },
  { type: "yesno", id: "q33", category: "Momentum & Capacity", question: "Do you adjust workflows when patterns of delay repeat?" },
  { type: "yesno", id: "q34", category: "Momentum & Capacity", question: "Is growth slowed because operations can't handle more volume without breaking?" },
  { type: "yesno", id: "q35", category: "Momentum & Capacity", question: "Do you make regular improvements instead of waiting for breakdowns?" },
  { type: "yesno", id: "q36", category: "Momentum & Capacity", question: "Do you proactively build capacity before it becomes a bottleneck?" },

  // ── Economic fields ──
  {
    type: "select", id: "hours_per_week_lost", category: "Time & Economic Impact",
    question: "On average, how many hours per week do you personally spend on work that does not require your level of attention?",
    options: [
      { label: "5–10 hours",  value: "8"  },
      { label: "11–20 hours", value: "15" },
      { label: "21–30 hours", value: "25" },
      { label: "31–40 hours", value: "35" },
      { label: "40+ hours",   value: "45" },
    ],
  },
  {
    type: "select", id: "hourly_labor_cost_range", category: "Time & Economic Impact",
    question: "If this work were delegated or automated, what hourly rate would you reasonably pay to replace it?",
    options: [
      { label: "$15–$20/hr", value: "$15–$20/hr" },
      { label: "$21–$30/hr", value: "$21–$30/hr" },
      { label: "$31–$40/hr", value: "$31–$40/hr" },
      { label: "$41–$60/hr", value: "$41–$60/hr" },
      { label: "$60+/hr",    value: "$60+/hr"    },
    ],
  },
  {
    type: "select", id: "annualRevenue", category: "Time & Economic Impact",
    question: "Where is your approximate annual revenue?",
    options: [
      { label: "Under $250K",  value: "150000"  },
      { label: "$250K–$500K",  value: "375000"  },
      { label: "$500K–$1M",    value: "750000"  },
      { label: "$1M–$3M",      value: "2000000" },
      { label: "$3M–$5M",      value: "4000000" },
      { label: "Over $5M",     value: "6000000" },
    ],
  },

  // ── Contact ──
  { type: "contact" },
];

const TOTAL = QUESTIONS.length; // 40

/* ───────────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────────── */

export default function StartAuditPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", business: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const step = QUESTIONS[current];
  const progress = ((current) / TOTAL) * 100;

  function answer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    if (current < TOTAL - 1) {
      setCurrent((c) => c + 1);
    }
  }

  function goBack() {
    if (current > 0) setCurrent((c) => c - 1);
  }

  async function submit() {
    if (!contact.name || !contact.email) {
      setError("Please enter your name and email.");
      return;
    }
    setError("");
    setSubmitting(true);

    const payload = {
      ...answers,
      name: contact.name,
      business: contact.business,
      email: contact.email,
    };

    try {
      const res = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      // Store results and redirect
      sessionStorage.setItem("oia_results", JSON.stringify(data));
      window.location.href = "/startaudit/results";
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Image
          src="/ecrof_logo_white.png"
          alt="Ecrof Media"
          width={100}
          height={28}
          style={{ objectFit: "contain" }}
        />
        <span
          style={{
            fontFamily: "var(--font-jetbrains-mono), monospace",
            fontSize: "0.75rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.08em",
          }}
        >
          {current + 1} / {TOTAL}
        </span>
      </header>

      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "var(--blue-core)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* Body */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          maxWidth: 640,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {step.type === "yesno" && (
          <div style={{ width: "100%", textAlign: "center" }}>
            {/* Category pill */}
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 40,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--blue-bright)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 32,
              }}
            >
              {step.category}
            </span>

            {/* Question */}
            <h2
              style={{
                fontSize: "clamp(1.375rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "var(--white)",
                lineHeight: 1.35,
                marginBottom: 48,
              }}
            >
              {step.question}
            </h2>

            {/* Yes / No buttons */}
            <div
              style={{
                display: "flex",
                gap: 16,
                justifyContent: "center",
              }}
            >
              {["Yes", "No"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => answer(step.id, opt.toLowerCase())}
                  style={{
                    minWidth: 140,
                    padding: "18px 40px",
                    borderRadius: 40,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "transparent",
                    color: "var(--white)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    fontFamily: "var(--font-inter), sans-serif",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--blue-core)";
                    e.currentTarget.style.borderColor = "var(--blue-core)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step.type === "select" && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <span
              style={{
                display: "inline-block",
                padding: "6px 16px",
                borderRadius: 40,
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--blue-bright)",
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 32,
              }}
            >
              {step.category}
            </span>

            <h2
              style={{
                fontSize: "clamp(1.375rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "var(--white)",
                lineHeight: 1.35,
                marginBottom: 40,
              }}
            >
              {step.question}
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              {step.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => answer(step.id, opt.value)}
                  style={{
                    padding: "16px 24px",
                    borderRadius: 12,
                    border: "1px solid rgba(255,255,255,0.12)",
                    background:
                      answers[step.id] === opt.value
                        ? "var(--blue-core)"
                        : "rgba(255,255,255,0.04)",
                    color: "var(--white)",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    fontFamily: "var(--font-inter), sans-serif",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (answers[step.id] !== opt.value) {
                      e.currentTarget.style.borderColor = "var(--blue-core)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (answers[step.id] !== opt.value) {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {step.type === "contact" && (
          <div style={{ width: "100%", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "clamp(1.375rem, 4vw, 1.75rem)",
                fontWeight: 700,
                color: "var(--white)",
                lineHeight: 1.35,
                marginBottom: 8,
              }}
            >
              Where should we send your customized plan?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                marginBottom: 40,
                fontSize: "0.9375rem",
              }}
            >
              Your results are almost ready.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                maxWidth: 400,
                margin: "0 auto",
              }}
            >
              {(
                [
                  { key: "name", label: "Name", placeholder: "Jane Smith", type: "text" },
                  { key: "business", label: "Business Name", placeholder: "Your Company Name", type: "text" },
                  { key: "email", label: "Email", placeholder: "jane@frame.com", type: "email" },
                ] as const
              ).map((field) => (
                <div key={field.key} style={{ textAlign: "left" }}>
                  <label
                    style={{
                      display: "block",
                      color: "rgba(255,255,255,0.6)",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      marginBottom: 6,
                    }}
                  >
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={contact[field.key]}
                    onChange={(e) =>
                      setContact((prev) => ({ ...prev, [field.key]: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 12,
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.04)",
                      color: "var(--white)",
                      fontSize: "0.9375rem",
                      fontFamily: "var(--font-inter), sans-serif",
                      outline: "none",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "var(--blue-core)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    }}
                  />
                </div>
              ))}

              {error && (
                <p style={{ color: "#f87171", fontSize: "0.875rem" }}>{error}</p>
              )}

              <button
                onClick={submit}
                disabled={submitting}
                className="btn-primary"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  padding: "18px 24px",
                  fontSize: "1rem",
                  marginTop: 8,
                  opacity: submitting ? 0.6 : 1,
                }}
              >
                {submitting ? "Analyzing..." : "Submit"}
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Back button */}
      {current > 0 && (
        <footer style={{ padding: "16px 24px 32px", textAlign: "center" }}>
          <button
            onClick={goBack}
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.35)",
              fontSize: "0.875rem",
              cursor: "pointer",
              fontFamily: "var(--font-inter), sans-serif",
              padding: "8px 16px",
            }}
          >
            &larr; Back
          </button>
        </footer>
      )}
    </div>
  );
}
