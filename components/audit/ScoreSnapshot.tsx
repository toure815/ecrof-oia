"use client";

import { useEffect, useState } from "react";
import type { AuditReport } from "@/lib/oia-engine";

interface ScoreSnapshotProps {
  report: AuditReport;
  onContinue: () => void;
}

const PILLAR_COLORS: Record<string, string> = {
  diagnose: "var(--blue-core)",
  define: "var(--blue-vivid)",
  design: "var(--blue-bright)",
  deploy: "var(--emerald)",
};

const PLAYBOOK_COLORS: Record<string, string> = {
  "Category Intelligence": "var(--blue-core)",
  "Operational Intelligence": "var(--blue-vivid)",
  Autonomy: "var(--emerald)",
};

/**
 * Stripe Payment Links — replace with your actual links.
 * Create these in Stripe Dashboard > Payment Links.
 */
const PLAYBOOK_CHECKOUT: Record<string, { price: string; url: string }> = {
  "Category Intelligence": {
    price: "$1,500",
    url: process.env.NEXT_PUBLIC_STRIPE_LINK_CATEGORY || "#",
  },
  "Operational Intelligence": {
    price: "$1,500",
    url: process.env.NEXT_PUBLIC_STRIPE_LINK_OPERATIONAL || "#",
  },
  Autonomy: {
    price: "$1,500",
    url: process.env.NEXT_PUBLIC_STRIPE_LINK_AUTONOMY || "#",
  },
};

function formatCurrency(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export default function ScoreSnapshot({ report, onContinue }: ScoreSnapshotProps) {
  const [revealed, setRevealed] = useState(false);
  const firstName = report.name.split(" ")[0] || "there";

  const weakest = report.pillarScores.find(
    (p) => p.key === report.weakestPillar
  );
  const maturityShort = report.maturityLevel.replace(/^Level \d+ — /, "");
  const playbookColor =
    PLAYBOOK_COLORS[report.recommendation.playbook] || "var(--blue-core)";

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px",
        backgroundColor: "var(--white)",
      }}
    >
      <div style={{ maxWidth: 560, width: "100%" }}>
        {/* ── HEADER ── */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--emerald)",
              marginBottom: 12,
            }}
          >
            Your results
          </p>
          <h2
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {firstName}, here&rsquo;s your operational snapshot.
          </h2>
        </div>

        {/* ── OI SCORE CIRCLE ── */}
        <div
          style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}
        >
          <div style={{ position: "relative", width: 160, height: 160 }}>
            <svg
              viewBox="0 0 160 160"
              style={{
                width: "100%",
                height: "100%",
                transform: "rotate(-90deg)",
              }}
            >
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="var(--gray-100)"
                strokeWidth="8"
              />
              <circle
                cx="80"
                cy="80"
                r="68"
                fill="none"
                stroke="var(--blue-core)"
                strokeWidth="8"
                strokeLinecap="round"
                style={{
                  transition:
                    "stroke-dasharray 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
                  strokeDasharray: revealed
                    ? `${(report.oiScore / 100) * 2 * Math.PI * 68} ${2 * Math.PI * 68}`
                    : `0 ${2 * Math.PI * 68}`,
                }}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontSize: 44,
                  fontWeight: 800,
                  color: "var(--ink)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {revealed ? report.oiScore : "—"}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "var(--gray-500)",
                  fontFamily: "var(--font-mono)",
                  marginTop: 4,
                }}
              >
                out of 100
              </span>
            </div>
          </div>
        </div>

        <p
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: 600,
            color: "var(--blue-core)",
            marginBottom: 32,
          }}
        >
          Operational Maturity: {maturityShort}
        </p>

        {/* ── DECISION COST CARD ── */}
        {report.roi.hourlyRate > 0 && (
          <div
            style={{
              backgroundColor: "var(--ink)",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 28,
              color: "var(--white)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.5)",
                marginBottom: 16,
              }}
            >
              Your Decision Cost
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
                marginBottom: 20,
              }}
            >
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  You&rsquo;re spending
                </p>
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FF6154",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {formatCurrency(report.roi.weeklySoftCost)}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
                    /week
                  </span>
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  on work below your pay grade
                </p>
              </div>

              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  That&rsquo;s
                </p>
                <p
                  style={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#FF6154",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {formatCurrency(report.roi.yearlySoftCost)}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
                    /year
                  </span>
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                  in soft cost leaving your margin
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: 16,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 20,
              }}
            >
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  Recoverable with structure
                </p>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--emerald)",
                    lineHeight: 1.1,
                  }}
                >
                  {formatCurrency(report.roi.yearlySavings)}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
                    /year
                  </span>
                </p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginBottom: 4 }}>
                  Hours you get back
                </p>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "var(--emerald)",
                    lineHeight: 1.1,
                  }}
                >
                  {report.roi.hoursRecovered}
                  <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.4)" }}>
                    {" "}hrs/year
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── PILLAR BREAKDOWN ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 28,
          }}
        >
          {report.pillarScores.map((p) => (
            <div key={p.key}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 6,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                      color: PILLAR_COLORS[p.key],
                      textTransform: "uppercase",
                    }}
                  >
                    {p.label}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--gray-500)" }}>
                    {p.subtitle}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 12,
                    fontWeight: 500,
                    color: "var(--ink)",
                  }}
                >
                  {p.pct}%
                </span>
              </div>
              <div
                style={{
                  width: "100%",
                  height: 6,
                  backgroundColor: "var(--gray-100)",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    backgroundColor: PILLAR_COLORS[p.key],
                    borderRadius: 3,
                    transition: "width 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
                    width: revealed ? `${p.pct}%` : "0%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ── RECOMMENDED PLAYBOOK WITH CTA ── */}
        {(() => {
          const checkout = PLAYBOOK_CHECKOUT[report.recommendation.playbook];
          return (
            <div
              style={{
                backgroundColor: "var(--gray-50)",
                borderRadius: 14,
                padding: "28px 28px",
                marginBottom: 28,
                borderLeft: `3px solid ${playbookColor}`,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: playbookColor,
                  marginBottom: 12,
                }}
              >
                Where to focus first
              </p>

              <p
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                  marginBottom: 4,
                }}
              >
                {report.recommendation.playbook} Playbook
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: playbookColor,
                  marginBottom: 14,
                }}
              >
                Starting sprint: {report.recommendation.sprint}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "var(--gray-700)",
                  lineHeight: 1.6,
                  marginBottom: 20,
                }}
              >
                {report.recommendation.description}
              </p>

              {/* Price + CTA */}
              <div
                style={{
                  borderTop: "1px solid var(--gray-200)",
                  paddingTop: 20,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 12,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--ink)",
                      lineHeight: 1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {checkout?.price}
                  </p>
                  <p
                    style={{
                      fontSize: 12,
                      color: "var(--gray-500)",
                      marginTop: 4,
                    }}
                  >
                    One-time · Delivered in 48 hours
                  </p>
                </div>
                <a
                  href={checkout?.url}
                  className="btn-primary"
                  style={{
                    padding: "12px 28px",
                    fontSize: 14,
                    textDecoration: "none",
                  }}
                >
                  Get the Playbook →
                </a>
              </div>
            </div>
          );
        })()}

        {/* ── ROI CONTEXT ── */}
        {report.roi.hourlyRate > 0 && (
          <div
            style={{
              backgroundColor: "var(--gray-50)",
              borderRadius: 14,
              padding: "20px 24px",
              marginBottom: 28,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "var(--gray-700)",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "var(--ink)" }}>
                The math:
              </strong>{" "}
              At your revenue level, every hour you spend on work that
              doesn&rsquo;t need you costs roughly{" "}
              <strong>{formatCurrency(report.roi.hourlyRate)}/hr</strong>.
              You&rsquo;re losing{" "}
              <strong>{report.roi.weeklyLost} hours/week</strong> — that&rsquo;s{" "}
              <strong>{formatCurrency(report.roi.yearlySoftCost)}/year</strong> in
              soft cost. With the right structure in place, you can recover{" "}
              <strong>40%</strong> of that:{" "}
              <strong>{formatCurrency(report.roi.yearlySavings)}/year</strong> back
              into your margin.
            </p>
          </div>
        )}

        {/* ── DETAILED REPORT CTA ── */}
        <div
          style={{
            textAlign: "center",
            borderTop: "1px solid var(--gray-100)",
            paddingTop: 28,
          }}
        >
          <p
            style={{
              fontSize: 14,
              color: "var(--gray-500)",
              marginBottom: 8,
              lineHeight: 1.55,
            }}
          >
            This is your snapshot. Your full Operational Intelligence Report —
            with dimension-level scoring, detailed analysis, and a step-by-step
            action plan — is being generated and sent to your inbox.
          </p>
          <p
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: "var(--gray-700)",
              marginBottom: 24,
            }}
          >
            Check your email for the complete report.
          </p>
          <button
            onClick={onContinue}
            className="btn-primary"
            style={{ padding: "14px 36px" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
