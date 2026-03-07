"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ResultsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("oia_results");
    if (raw) {
      try {
        const data = JSON.parse(raw);
        const p = data?.report?.personal || data?.personal || {};
        setName(p.name || "");
        setEmail(p.email || "");
      } catch {
        /* ignore */
      }
    }
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--ink)",
        color: "var(--white)",
        fontFamily: "var(--font-inter), sans-serif",
        display: "flex",
        flexDirection: "column",
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

      {/* Body */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px 80px",
          maxWidth: 600,
          margin: "0 auto",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Checkmark icon */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: "rgba(0,232,155,0.1)",
            border: "2px solid var(--emerald)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <svg
            width="32"
            height="32"
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

        {/* Heading */}
        <h1
          style={{
            fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            marginBottom: 16,
          }}
        >
          {name ? `${name}, your` : "Your"} audit is complete.
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: "1.0625rem",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.65,
            marginBottom: 40,
            maxWidth: 480,
          }}
        >
          We&rsquo;re building your personalized Operational Intelligence
          Report right now. It includes your OI score, pillar breakdown, ROI
          projection, and a recommended sprint — all in one PDF.
        </p>

        {/* Email callout card */}
        <div
          style={{
            width: "100%",
            padding: "28px 24px",
            borderRadius: 16,
            background: "rgba(10,122,255,0.06)",
            border: "1px solid rgba(10,122,255,0.15)",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            {/* Mail icon */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--blue-bright)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-10 7L2 7" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-jetbrains-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--blue-bright)",
              }}
            >
              Check Your Inbox
            </span>
          </div>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.6,
            }}
          >
            Your full report will be delivered to{" "}
            {email ? (
              <span style={{ color: "var(--white)", fontWeight: 600 }}>
                {email}
              </span>
            ) : (
              "your email"
            )}{" "}
            within the next few minutes.
          </p>
        </div>

        {/* What to expect */}
        <div
          style={{
            width: "100%",
            textAlign: "left",
            marginBottom: 48,
          }}
        >
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
            What&rsquo;s in your report
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              "Your Operational Intelligence Score",
              "Pillar-by-pillar breakdown (Discover, Design, Deploy, Optimize)",
              "Your weakest operational area and where to focus first",
              "ROI projection — hours recovered and dollars saved",
              "Recommended VEOS sprint to start closing gaps",
            ].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 12,
                  padding: "14px 16px",
                  borderRadius: 10,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    color: "var(--emerald)",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                    flexShrink: 0,
                  }}
                >
                  &bull;
                </span>
                <span
                  style={{
                    fontSize: "0.9375rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.5,
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <a
          href="/"
          className="btn-primary"
          style={{ fontSize: "1rem", padding: "18px 40px" }}
        >
          Back to Ecrof Media
        </a>
      </main>
    </div>
  );
}
