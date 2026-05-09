"use client";

import Image from "next/image";

interface AuditIntroProps {
  onStart: () => void;
}

export default function AuditIntro({ onStart }: AuditIntroProps) {
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
      <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ marginBottom: 40 }}>
          <Image
            src="/ecrof_logo_transparent.png"
            alt="Ecrof Media"
            width={44}
            height={44}
            style={{ margin: "0 auto" }}
          />
        </div>

        {/* Mono label */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--blue-core)",
            marginBottom: 16,
          }}
        >
          Operational Intelligence Audit
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            marginBottom: 20,
          }}
        >
          Find out where your
          <br />
          <em
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            operations are leaking.
          </em>
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--gray-700)",
            marginBottom: 40,
          }}
        >
          36 questions across four operational pillars.
          <br />
          Takes about 12 minutes. No fluff, no tricks — just signal.
        </p>

        {/* What you'll learn */}
        <div
          style={{
            textAlign: "left",
            backgroundColor: "var(--gray-50)",
            borderRadius: 12,
            padding: "24px 28px",
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "var(--ink)",
              marginBottom: 16,
              letterSpacing: "-0.01em",
            }}
          >
            What you&rsquo;ll walk away with:
          </p>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "Your Operational Intelligence Score (0–100)",
              "Which pillar is weakest — and what to fix first",
              "Decision Cost estimate based on your revenue",
              "A recommended sprint to close your biggest gap",
            ].map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 10,
                  fontSize: 14,
                  lineHeight: 1.55,
                  color: "var(--gray-700)",
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "var(--blue-core)",
                    marginTop: 7,
                  }}
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <button
          onClick={onStart}
          className="btn-primary"
          style={{ fontSize: 16, padding: "16px 40px" }}
        >
          Begin the Audit
        </button>

        <p
          style={{
            fontSize: 12,
            color: "var(--gray-500)",
            marginTop: 16,
          }}
        >
          Your answers are private. We don&rsquo;t share or sell your data.
        </p>
      </div>
    </div>
  );
}
