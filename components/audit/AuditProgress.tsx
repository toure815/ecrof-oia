"use client";

import { PILLARS } from "@/lib/oia-questions";

interface AuditProgressProps {
  currentPillarIndex: number;
  currentDimensionIndex: number;
  /** Total step across all pillars (0-based, out of total dimension count + economic + contact) */
  currentStep: number;
  totalSteps: number;
}

const PILLAR_COLORS: Record<string, string> = {
  diagnose: "var(--blue-core)",
  define: "var(--blue-vivid)",
  design: "var(--blue-bright)",
  deploy: "var(--emerald)",
};

export default function AuditProgress({
  currentPillarIndex,
  currentDimensionIndex,
  currentStep,
  totalSteps,
}: AuditProgressProps) {
  const pillar = PILLARS[currentPillarIndex];
  const dimension = pillar?.dimensions[currentDimensionIndex];
  const pct = Math.round((currentStep / totalSteps) * 100);
  const accentColor = pillar ? PILLAR_COLORS[pillar.key] : "var(--blue-core)";

  return (
    <div style={{ padding: "0 24px", maxWidth: 720, margin: "0 auto", width: "100%" }}>
      {/* Labels */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {pillar && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.06em",
                color: accentColor,
                textTransform: "uppercase",
              }}
            >
              {pillar.label}
            </span>
          )}
          {dimension && (
            <>
              <span style={{ color: "var(--gray-200)", fontSize: 11 }}>·</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--gray-700)",
                }}
              >
                {dimension.label}
              </span>
            </>
          )}
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--gray-500)",
          }}
        >
          {pct}%
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          width: "100%",
          height: 4,
          backgroundColor: "var(--gray-100)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: "100%",
            backgroundColor: accentColor,
            borderRadius: 2,
            transition: "width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      {/* Pillar dots */}
      <div
        style={{
          display: "flex",
          gap: 6,
          marginTop: 12,
          justifyContent: "center",
        }}
      >
        {PILLARS.map((p, i) => (
          <div
            key={p.key}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor:
                i < currentPillarIndex
                  ? PILLAR_COLORS[p.key]
                  : i === currentPillarIndex
                  ? PILLAR_COLORS[p.key]
                  : "var(--gray-200)",
              opacity: i <= currentPillarIndex ? 1 : 0.5,
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
