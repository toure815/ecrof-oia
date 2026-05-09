"use client";

import { useState, useCallback } from "react";
import { PILLARS } from "@/lib/oia-questions";
import type { AuditReport } from "@/lib/oia-engine";
import AuditIntro from "./AuditIntro";
import PillarIntro from "./PillarIntro";
import QuestionStep from "./QuestionStep";
import EconomicStep from "./EconomicStep";
import ContactStep from "./ContactStep";
import ScoreSnapshot from "./ScoreSnapshot";
import AuditComplete from "./AuditComplete";
import AuditProgress from "./AuditProgress";

type StepType =
  | { kind: "intro" }
  | { kind: "pillar-intro"; pillarIndex: number }
  | { kind: "questions"; pillarIndex: number; dimensionIndex: number }
  | { kind: "economic" }
  | { kind: "contact" }
  | { kind: "score-snapshot" }
  | { kind: "complete" };

function buildSteps(): StepType[] {
  const steps: StepType[] = [{ kind: "intro" }];

  PILLARS.forEach((pillar, pi) => {
    steps.push({ kind: "pillar-intro", pillarIndex: pi });
    pillar.dimensions.forEach((_, di) => {
      steps.push({ kind: "questions", pillarIndex: pi, dimensionIndex: di });
    });
  });

  steps.push({ kind: "economic" });
  steps.push({ kind: "contact" });
  steps.push({ kind: "score-snapshot" });
  steps.push({ kind: "complete" });

  return steps;
}

const STEPS = buildSteps();
const PROGRESS_STEPS = 14;

function getProgressStep(stepIndex: number): number {
  let count = 0;
  for (let i = 0; i <= stepIndex && i < STEPS.length; i++) {
    const s = STEPS[i];
    if (s.kind === "questions" || s.kind === "economic" || s.kind === "contact") {
      count++;
    }
  }
  return count;
}

function getCurrentPillarInfo(stepIndex: number) {
  const step = STEPS[stepIndex];
  if (step.kind === "questions") {
    return { pillarIndex: step.pillarIndex, dimensionIndex: step.dimensionIndex };
  }
  if (step.kind === "pillar-intro") {
    return { pillarIndex: step.pillarIndex, dimensionIndex: 0 };
  }
  if (step.kind === "economic" || step.kind === "contact") {
    return { pillarIndex: 3, dimensionIndex: 2 };
  }
  return { pillarIndex: 0, dimensionIndex: 0 };
}

export default function AuditFlow() {
  const [stepIndex, setStepIndex] = useState(0);
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [economicAnswers, setEconomicAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState({ name: "", business: "", email: "" });
  const [submitting, setSubmitting] = useState(false);
  const [report, setReport] = useState<AuditReport | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const currentStep = STEPS[stepIndex];

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleQuestionAnswer = useCallback(
    (questionId: string, value: string) => {
      setQuestionAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  const handleEconomicAnswer = useCallback((key: string, value: string) => {
    setEconomicAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const handleContactChange = useCallback((field: string, value: string) => {
    setContact((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submit-audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: questionAnswers,
          economicAnswers,
          contact,
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Server error ${res.status}: ${text.slice(0, 200)}`);
      }

      const data: AuditReport = await res.json();
      setReport(data);
      setSubmitting(false);
      goNext();
    } catch (err) {
      console.error("Submission error:", err);
      setSubmitError(
        "Something went wrong processing your audit. Please try again or email us at hello@ecrofmedia.com."
      );
      setSubmitting(false);
    }
  }, [questionAnswers, economicAnswers, contact, goNext]);

  const showProgress =
    currentStep.kind === "questions" ||
    currentStep.kind === "economic" ||
    currentStep.kind === "contact";

  const { pillarIndex, dimensionIndex } = getCurrentPillarInfo(stepIndex);

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--white)" }}>
      {showProgress && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 50,
            backgroundColor: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(12px)",
            paddingTop: 16,
            paddingBottom: 12,
            borderBottom: "1px solid var(--gray-100)",
          }}
        >
          <AuditProgress
            currentPillarIndex={pillarIndex}
            currentDimensionIndex={dimensionIndex}
            currentStep={getProgressStep(stepIndex)}
            totalSteps={PROGRESS_STEPS}
          />
        </div>
      )}

      <div style={{ paddingTop: showProgress ? 80 : 0 }}>
        {currentStep.kind === "intro" && <AuditIntro onStart={goNext} />}

        {currentStep.kind === "pillar-intro" && (
          <PillarIntro
            pillar={PILLARS[currentStep.pillarIndex]}
            pillarIndex={currentStep.pillarIndex}
            onContinue={goNext}
          />
        )}

        {currentStep.kind === "questions" && (
          <QuestionStep
            key={`${currentStep.pillarIndex}-${currentStep.dimensionIndex}`}
            questions={
              PILLARS[currentStep.pillarIndex].dimensions[
                currentStep.dimensionIndex
              ].questions
            }
            answers={questionAnswers}
            onAnswer={handleQuestionAnswer}
            onNext={goNext}
            onBack={goBack}
            canGoBack={stepIndex > 0}
          />
        )}

        {currentStep.kind === "economic" && (
          <EconomicStep
            answers={economicAnswers}
            onAnswer={handleEconomicAnswer}
            onNext={goNext}
            onBack={goBack}
          />
        )}

        {currentStep.kind === "contact" && (
          <ContactStep
            contact={contact}
            onChange={handleContactChange}
            onSubmit={handleSubmit}
            onBack={goBack}
            submitting={submitting}
          />
        )}

        {currentStep.kind === "score-snapshot" && report && (
          <ScoreSnapshot report={report} onContinue={goNext} />
        )}

        {currentStep.kind === "score-snapshot" && !report && (
          <div
            style={{
              minHeight: "100dvh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 24px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                fontSize: 18,
                color: "var(--gray-700, #374151)",
                marginBottom: 16,
                maxWidth: 480,
              }}
            >
              {submitError ||
                "Something went wrong processing your audit. Please try again."}
            </p>
            <button
              onClick={() => {
                setSubmitError(null);
                setStepIndex((i) => i - 1);
              }}
              style={{
                padding: "12px 28px",
                backgroundColor: "var(--black, #000)",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontSize: 16,
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        )}

        {currentStep.kind === "complete" && (
          <AuditComplete name={contact.name} />
        )}
      </div>
    </div>
  );
}
