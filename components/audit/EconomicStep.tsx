"use client";

import { ECONOMIC_FIELDS } from "@/lib/oia-questions";

interface EconomicStepProps {
  answers: Record<string, string>;
  onAnswer: (key: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function EconomicStep({
  answers,
  onAnswer,
  onNext,
  onBack,
}: EconomicStepProps) {
  const allAnswered = ECONOMIC_FIELDS.every((f) => answers[f.key]);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        backgroundColor: "var(--white)",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--blue-core)",
              marginBottom: 12,
            }}
          >
            Almost done
          </p>
          <h2
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            A few numbers for your report.
          </h2>
          <p style={{ fontSize: 15, color: "var(--gray-500)", lineHeight: 1.55 }}>
            This lets us calculate your Decision Cost and ROI estimate.
          </p>
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {ECONOMIC_FIELDS.map((field) => (
            <div key={field.key}>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: "var(--ink)",
                  lineHeight: 1.55,
                  marginBottom: 14,
                }}
              >
                {field.question}
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {field.options.map((opt) => {
                  const isSelected = answers[field.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => onAnswer(field.key, opt.value)}
                      style={{
                        padding: "12px 18px",
                        borderRadius: 10,
                        border: `1.5px solid ${
                          isSelected ? "var(--blue-core)" : "var(--gray-200)"
                        }`,
                        backgroundColor: isSelected
                          ? "rgba(10, 122, 255, 0.06)"
                          : "var(--white)",
                        color: isSelected ? "var(--blue-core)" : "var(--gray-700)",
                        fontSize: 14,
                        fontWeight: 500,
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "all 0.15s ease",
                        fontFamily: "inherit",
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 48,
          }}
        >
          <button
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              color: "var(--gray-500)",
              padding: "8px 0",
              fontFamily: "inherit",
            }}
          >
            ← Back
          </button>

          <button
            onClick={onNext}
            disabled={!allAnswered}
            className="btn-primary"
            style={{
              opacity: allAnswered ? 1 : 0.4,
              pointerEvents: allAnswered ? "auto" : "none",
              padding: "12px 32px",
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
