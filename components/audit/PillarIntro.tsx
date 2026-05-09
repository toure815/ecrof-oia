"use client";

import type { Pillar } from "@/lib/oia-questions";

interface PillarIntroProps {
  pillar: Pillar;
  pillarIndex: number;
  onContinue: () => void;
}

const PILLAR_COLORS: Record<string, string> = {
  diagnose: "var(--blue-core)",
  define: "var(--blue-vivid)",
  design: "var(--blue-bright)",
  deploy: "var(--emerald)",
};

export default function PillarIntro({
  pillar,
  pillarIndex,
  onContinue,
}: PillarIntroProps) {
  const color = PILLAR_COLORS[pillar.key];

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
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        {/* Pillar number */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 16,
              fontWeight: 500,
              color,
            }}
          >
            {pillarIndex + 1}
          </span>
        </div>

        {/* Pillar label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color,
            marginBottom: 12,
          }}
        >
          Pillar {pillarIndex + 1} of 4
        </p>

        {/* Pillar name */}
        <h2
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          {pillar.label}
        </h2>

        <p
          style={{
            fontSize: 15,
            color,
            fontWeight: 500,
            marginBottom: 20,
          }}
        >
          {pillar.subtitle}
        </p>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--gray-700)",
            marginBottom: 12,
          }}
        >
          {pillar.description}
        </p>

        <p
          style={{
            fontSize: 13,
            color: "var(--gray-500)",
            marginBottom: 36,
          }}
        >
          9 questions · 3 dimensions
        </p>

        <button
          onClick={onContinue}
          className="btn-primary"
          style={{ padding: "14px 36px" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
