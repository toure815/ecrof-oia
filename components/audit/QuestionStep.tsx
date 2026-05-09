"use client";

import { useState } from "react";
import type { OiaQuestion } from "@/lib/oia-questions";

interface QuestionStepProps {
  questions: OiaQuestion[];
  answers: Record<string, string>;
  onAnswer: (questionId: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
}

export default function QuestionStep({
  questions,
  answers,
  onAnswer,
  onNext,
  onBack,
  canGoBack,
}: QuestionStepProps) {
  const [animating, setAnimating] = useState(false);
  const allAnswered = questions.every((q) => answers[q.id]);

  function handleAnswer(qId: string, value: string) {
    onAnswer(qId, value);
  }

  function handleNext() {
    if (!allAnswered) return;
    setAnimating(true);
    setTimeout(() => {
      onNext();
      setAnimating(false);
    }, 200);
  }

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
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(12px)" : "translateY(0)",
        transition: "opacity 0.2s ease, transform 0.2s ease",
      }}
    >
      <div style={{ maxWidth: 640, width: "100%" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
          }}
        >
          {questions.map((q, i) => {
            const selected = answers[q.id];
            return (
              <div key={q.id}>
                {/* Question number + text */}
                <div style={{ marginBottom: 16 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      color: "var(--gray-500)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    Q{q.number}
                  </span>
                  <p
                    style={{
                      fontSize: 17,
                      fontWeight: 500,
                      lineHeight: 1.55,
                      color: "var(--ink)",
                      marginTop: 4,
                    }}
                  >
                    {q.text}
                  </p>
                </div>

                {/* Yes / Sometimes / No cards */}
                <div style={{ display: "flex", gap: 10 }}>
                  {["Yes", "Sometimes", "No"].map((val) => {
                    const isSelected = selected === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleAnswer(q.id, val)}
                        style={{
                          flex: 1,
                          padding: "14px 16px",
                          borderRadius: 10,
                          border: `1.5px solid ${
                            isSelected
                              ? "var(--blue-core)"
                              : "var(--gray-200)"
                          }`,
                          backgroundColor: isSelected
                            ? "rgba(10, 122, 255, 0.06)"
                            : "var(--white)",
                          color: isSelected
                            ? "var(--blue-core)"
                            : "var(--gray-700)",
                          fontSize: 14,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition:
                            "all 0.15s ease",
                          fontFamily: "inherit",
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
          {canGoBack ? (
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
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
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
