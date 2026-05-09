import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Begin the Audit: Operational Intelligence Audit",
  description:
    "36 questions. 12 minutes. Find out where your operations are leaking.",
};

const WHAT_YOU_GET = [
  "Your Operational Intelligence Score across four business dimensions",
  "The specific pillar that is costing you the most, and what to address first",
  "A Decision Cost estimate based on your actual revenue",
  "A sprint recommendation tailored to your results",
];

const BEFORE_YOU_START = [
  { label: "36 questions", note: "Yes or no. No gray areas." },
  { label: "12 minutes", note: "Uninterrupted. Set aside the time." },
  { label: "Your score appears at the end", note: "After you enter your name and email." },
  { label: "No login required", note: "No account. No password." },
];

export default function BeginPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--white)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "clamp(32px, 6vw, 64px) clamp(16px, 5vw, 32px) clamp(48px, 8vw, 80px)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 540 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Image
            src="/ecrof_logo_transparent.png"
            alt="Ecrof Media"
            width={40}
            height={40}
            style={{ margin: "0 auto" }}
          />
        </div>

        {/* Eyebrow */}
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--blue-core)",
            marginBottom: 14,
          }}
        >
          Operational Intelligence Audit
        </p>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.4rem)",
            fontWeight: 800,
            color: "var(--ink)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            marginBottom: 16,
          }}
        >
          Find out where your{" "}
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

        <p
          style={{
            fontSize: "clamp(15px, 2.5vw, 17px)",
            lineHeight: 1.65,
            color: "var(--gray-700)",
            marginBottom: 36,
          }}
        >
          This audit goes straight to the operational gaps most founders can sense but cannot name. The score you receive at the end is specific to your business.
        </p>

        {/* Rule */}
        <div
          style={{
            width: 36,
            height: 2,
            backgroundColor: "var(--blue-core)",
            borderRadius: 2,
            marginBottom: 36,
          }}
        />

        {/* What you get */}
        <div
          style={{
            backgroundColor: "var(--gray-50)",
            border: "1px solid var(--gray-200)",
            borderRadius: 12,
            padding: "clamp(18px, 4vw, 28px)",
            marginBottom: 28,
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "var(--ink)",
              marginBottom: 18,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            What you walk away with
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 13 }}>
            {WHAT_YOU_GET.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  fontSize: "clamp(13px, 2vw, 14px)",
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

        {/* Before you start */}
        <div style={{ marginBottom: 36 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "var(--gray-500)",
              marginBottom: 16,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Before you start
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {BEFORE_YOU_START.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div
                  style={{
                    flexShrink: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    backgroundColor: "rgba(10,122,255,0.07)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--blue-core)" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "clamp(13px, 2vw, 14px)", fontWeight: 600, color: "var(--ink)", margin: 0, lineHeight: 1.3 }}>
                    {item.label}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--gray-500)", margin: "3px 0 0", lineHeight: 1.4 }}>
                    {item.note}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Link
          href="/startaudit"
          className="btn-primary"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            width: "100%",
            fontSize: "clamp(15px, 2.5vw, 16px)",
            padding: "17px 32px",
            borderRadius: 10,
            textDecoration: "none",
            fontWeight: 700,
            backgroundColor: "var(--blue-core)",
            color: "var(--white)",
          }}
        >
          Begin the Audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>

        <p
          style={{
            fontSize: 12,
            color: "var(--gray-500)",
            textAlign: "center",
            marginTop: 16,
            lineHeight: 1.55,
          }}
        >
          Your answers are private. We do not share or sell your data.
          <br />
          Your score is delivered to you. Not stored in a public profile.
        </p>

        {/* Footer */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid var(--gray-200)",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "var(--gray-500)", margin: 0 }}>
            Questions? Email{" "}
            <a
              href="mailto:support@ecrofmedia.com"
              style={{ color: "var(--blue-core)", textDecoration: "none" }}
            >
              support@ecrofmedia.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
