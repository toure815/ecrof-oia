"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/* ───────────────────────────────────────────────
   TYPES (matches n8n "Send results to Framer" shape)
   ─────────────────────────────────────────────── */

interface PillarScore {
  raw_score: number;
  max_score: number;
  normalized_25: number;
  pct: number;
}

interface Report {
  success: boolean;
  report: {
    operationalIntelligenceScore: number;
    operationalIntelligencePct: number;
    sprintRecommendation: string;
    identityLevel: string;
    maturityLevel: string;
    veosPhaseRecommendation: string;
    pillars: {
      discover: PillarScore;
      design: PillarScore;
      deploy: PillarScore;
      optimize: PillarScore;
      weakestPillar: string;
      rankings: string[];
    };
    roi: {
      hoursRecovered: number;
      monthlySavings: number;
      yearlySavings: number;
      investmentCost: number;
      annualROI: number;
      minROI: number;
    };
    personal: {
      name: string;
      email: string;
      company: string;
    };
  };
}

/* ───────────────────────────────────────────────
   HELPERS
   ─────────────────────────────────────────────── */

const PILLAR_LABELS: Record<string, { label: string; color: string }> = {
  discover: { label: "Discover", color: "#55BFFF" },
  design:   { label: "Design",   color: "#0A7AFF" },
  deploy:   { label: "Deploy",   color: "#00E89B" },
  optimize: { label: "Optimize", color: "#A78BFA" },
};

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/* ───────────────────────────────────────────────
   COMPONENT
   ─────────────────────────────────────────────── */

export default function ResultsPage() {
  const [data, setData] = useState<Report | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("oia_results");
    if (raw) {
      try { setData(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  if (!data || !data.report) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--ink)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(255,255,255,0.5)",
          fontFamily: "var(--font-inter), sans-serif",
          padding: 24,
          textAlign: "center",
        }}
      >
        <div>
          <p style={{ fontSize: "1.125rem", marginBottom: 16 }}>
            No results found.
          </p>
          <a
            href="/startaudit"
            className="btn-primary"
            style={{ fontSize: "0.9375rem" }}
          >
            Take the Audit
          </a>
        </div>
      </div>
    );
  }

  const r = data.report;
  const pillars = r.pillars;
  const roi = r.roi;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--white)",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ padding: "20px 24px" }}>
        <Image
          src="/ecrof_logo_white.png"
          alt="Ecrof Media"
          width={100}
          height={28}
          style={{ objectFit: "contain" }}
        />
      </header>

      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "24px 24px 80px",
        }}
      >
        {/* Greeting */}
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "0.875rem",
            marginBottom: 8,
          }}
        >
          Results for {r.personal.name || r.personal.email}
        </p>

        {/* OI Score */}
        <section style={{ textAlign: "center", marginBottom: 64 }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "var(--blue-bright)",
              lineHeight: 1,
              marginBottom: 8,
            }}
          >
            {r.operationalIntelligencePct}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              marginBottom: 24,
            }}
          >
            Operational Intelligence Score
          </p>

          {/* Identity + Maturity */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {[
              { label: "Identity", value: r.identityLevel },
              { label: "Maturity", value: r.maturityLevel },
              { label: "VEOS Phase", value: r.veosPhaseRecommendation },
            ].map((item) => (
              <span
                key={item.label}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "0.8125rem",
                }}
              >
                <span style={{ color: "rgba(255,255,255,0.45)" }}>
                  {item.label}:{" "}
                </span>
                <span style={{ fontWeight: 600 }}>{item.value}</span>
              </span>
            ))}
          </div>
        </section>

        {/* Pillar Scores */}
        <section style={{ marginBottom: 56 }}>
          <h3
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 20,
            }}
          >
            Pillar Breakdown
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {(["discover", "design", "deploy", "optimize"] as const).map(
              (key) => {
                const p = pillars[key] as PillarScore;
                const meta = PILLAR_LABELS[key];
                const isWeakest = pillars.weakestPillar === key;
                return (
                  <div key={key}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
                        {meta.label}
                        {isWeakest && (
                          <span
                            style={{
                              marginLeft: 8,
                              fontSize: "0.6875rem",
                              color: "#f87171",
                              fontWeight: 500,
                            }}
                          >
                            Weakest
                          </span>
                        )}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-jetbrains-mono), monospace",
                          fontSize: "0.8125rem",
                          color: "rgba(255,255,255,0.6)",
                        }}
                      >
                        {p.pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 8,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.08)",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${p.pct}%`,
                          background: meta.color,
                          borderRadius: 4,
                          transition: "width 0.6s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </section>

        {/* Sprint Recommendation */}
        <section
          style={{
            marginBottom: 56,
            padding: 32,
            borderRadius: 16,
            background: "rgba(10,122,255,0.06)",
            border: "1px solid rgba(10,122,255,0.15)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--blue-bright)",
              marginBottom: 12,
            }}
          >
            Recommended Sprint
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
            }}
          >
            {r.sprintRecommendation}
          </h2>
        </section>

        {/* ROI */}
        <section style={{ marginBottom: 56 }}>
          <h3
            style={{
              fontSize: "0.75rem",
              fontFamily: "var(--font-jetbrains-mono), monospace",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 20,
            }}
          >
            ROI Projection
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}
          >
            {[
              { label: "Hours Recovered / Year", value: `${roi.hoursRecovered}` },
              { label: "Monthly Savings", value: formatCurrency(roi.monthlySavings) },
              { label: "Yearly Savings", value: formatCurrency(roi.yearlySavings) },
              { label: "Sprint Investment", value: formatCurrency(roi.investmentCost) },
              { label: "Annual ROI", value: `${roi.annualROI}x` },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: 20,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6875rem",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", paddingTop: 16 }}>
          <p
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.9375rem",
              marginBottom: 24,
              lineHeight: 1.6,
            }}
          >
            Ready to turn these insights into action?
          </p>
          <a
            href="/"
            className="btn-primary"
            style={{ fontSize: "1rem", padding: "18px 40px" }}
          >
            See How We Can Help
          </a>
        </section>
      </main>
    </div>
  );
}
