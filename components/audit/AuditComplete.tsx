"use client";

import Image from "next/image";

interface AuditCompleteProps {
  name: string;
}

export default function AuditComplete({ name }: AuditCompleteProps) {
  const firstName = name.split(" ")[0] || "there";

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
        {/* Success indicator */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            backgroundColor: "rgba(0, 232, 155, 0.1)",
            marginBottom: 28,
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--emerald)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Audit submitted, {firstName}.
        </h2>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.65,
            color: "var(--gray-700)",
            marginBottom: 32,
          }}
        >
          Your Operational Intelligence report is being generated.
          Check your inbox — it&rsquo;ll arrive within the next few minutes.
        </p>

        <div
          style={{
            backgroundColor: "var(--gray-50)",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 36,
          }}
        >
          <p style={{ fontSize: 14, color: "var(--gray-700)", lineHeight: 1.6 }}>
            <strong style={{ color: "var(--ink)" }}>What happens next:</strong>
            <br />
            Your answers are scored across all four pillars. You&rsquo;ll receive
            your full OI Score, pillar breakdown, and a recommended sprint —
            tailored to where your operations need the most attention.
          </p>
        </div>

        <a
          href="/"
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "var(--blue-core)",
            textDecoration: "none",
          }}
        >
          ← Back to Ecrof Media
        </a>
      </div>
    </div>
  );
}
