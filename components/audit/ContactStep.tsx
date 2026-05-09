"use client";

import { useState } from "react";

interface ContactStepProps {
  contact: { name: string; business: string; email: string };
  onChange: (field: string, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}

export default function ContactStep({
  contact,
  onChange,
  onSubmit,
  onBack,
  submitting,
}: ContactStepProps) {
  const isValid =
    contact.name.trim().length > 0 &&
    contact.email.trim().length > 0 &&
    contact.email.includes("@");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isValid && !submitting) onSubmit();
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
      }}
    >
      <div style={{ maxWidth: 480, width: "100%" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
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
            Final step
          </p>
          <h2
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              fontWeight: 800,
              color: "var(--ink)",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Where should we send your report?
          </h2>
          <p style={{ fontSize: 15, color: "var(--gray-500)", lineHeight: 1.55 }}>
            Your results will be calculated and delivered to your inbox.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label
              htmlFor="audit-name"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              Your name
            </label>
            <input
              id="audit-name"
              type="text"
              value={contact.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="First Last"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1.5px solid var(--gray-200)",
                fontSize: 15,
                color: "var(--ink)",
                backgroundColor: "var(--white)",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--blue-core)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--gray-200)")
              }
            />
          </div>

          <div>
            <label
              htmlFor="audit-business"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              Business name{" "}
              <span style={{ fontWeight: 400, color: "var(--gray-500)" }}>
                (optional)
              </span>
            </label>
            <input
              id="audit-business"
              type="text"
              value={contact.business}
              onChange={(e) => onChange("business", e.target.value)}
              placeholder="Acme Corp"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1.5px solid var(--gray-200)",
                fontSize: 15,
                color: "var(--ink)",
                backgroundColor: "var(--white)",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--blue-core)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--gray-200)")
              }
            />
          </div>

          <div>
            <label
              htmlFor="audit-email"
              style={{
                display: "block",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--ink)",
                marginBottom: 6,
              }}
            >
              Email
            </label>
            <input
              id="audit-email"
              type="email"
              value={contact.email}
              onChange={(e) => onChange("email", e.target.value)}
              placeholder="you@company.com"
              required
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: 10,
                border: "1.5px solid var(--gray-200)",
                fontSize: 15,
                color: "var(--ink)",
                backgroundColor: "var(--white)",
                fontFamily: "inherit",
                outline: "none",
                transition: "border-color 0.15s ease",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--blue-core)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--gray-200)")
              }
            />
          </div>

          {/* Navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 28,
            }}
          >
            <button
              type="button"
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

            <button
              type="submit"
              disabled={!isValid || submitting}
              className="btn-primary"
              style={{
                opacity: isValid && !submitting ? 1 : 0.4,
                pointerEvents: isValid && !submitting ? "auto" : "none",
                padding: "14px 36px",
                fontSize: 15,
              }}
            >
              {submitting ? "Submitting…" : "Get My Results"}
            </button>
          </div>
        </form>

        <p
          style={{
            fontSize: 12,
            color: "var(--gray-500)",
            textAlign: "center",
            marginTop: 24,
          }}
        >
          We&rsquo;ll never spam you. Your data stays private.
        </p>
      </div>
    </div>
  );
}
