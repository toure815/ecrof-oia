"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { AuditReport } from "@/lib/oia-engine";

const PILLAR_COLORS: Record<string, string> = {
  diagnose: "#4B9EFF",
  define:   "#7B6EFF",
  design:   "#00B2FF",
  deploy:   "#00E89B",
};

function scoreColor(pct: number) {
  if (pct >= 65) return "#00E89B";
  if (pct >= 35) return "#FACC15";
  return "#F87171";
}

export default function ResultsPage() {
  const [report, setReport] = useState<AuditReport | null>(null);
  const [email, setEmail]   = useState("");

  useEffect(() => {
    const raw = sessionStorage.getItem("oia_results");
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const r: AuditReport = data?.report ?? data;
      setReport(r);
      setEmail(data?.personal?.email ?? r?.email ?? "");
    } catch { /* ignore */ }
  }, []);

  const weakest = report?.pillarScores.find(p => p.key === report.weakestPillar);

  return (
    <div style={{ minHeight: "100vh", background: "var(--ink)", color: "var(--white)", fontFamily: "var(--font-inter), sans-serif", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header style={{ padding: "20px 24px" }}>
        <Image src="/ecrof_logo_white.png" alt="Ecrof Media" width={100} height={28} style={{ objectFit: "contain" }} />
      </header>

      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 24px 80px", maxWidth: 560, margin: "0 auto", width: "100%" }}>

        {report ? (
          <>
            {/* Score hero */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <p style={{ margin: "0 0 8px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.6875rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                Operational Intelligence Score
              </p>
              <div style={{ fontSize: "clamp(72px, 20vw, 96px)", fontWeight: 800, lineHeight: 1, color: "#fff", letterSpacing: "-0.03em" }}>
                {report.oiScore}
                <span style={{ fontSize: "0.35em", color: "rgba(255,255,255,0.3)", fontWeight: 400 }}>/100</span>
              </div>
              <p style={{ margin: "12px 0 0", fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)" }}>
                {report.maturityLevel}
              </p>
            </div>

            {/* Pillar bars */}
            <div style={{ width: "100%", marginBottom: 32 }}>
              <p style={{ margin: "0 0 16px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                The 4 D&apos;s
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {report.pillarScores.map(p => (
                  <div key={p.key}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, color: p.key === report.weakestPillar ? "#F87171" : "rgba(255,255,255,0.8)" }}>
                        {p.label}
                        {p.key === report.weakestPillar && <span style={{ marginLeft: 6, fontSize: "0.7rem", color: "#F87171" }}>↑ focus area</span>}
                      </span>
                      <span style={{ fontSize: "0.875rem", fontWeight: 700, fontFamily: "var(--font-jetbrains-mono), monospace", color: scoreColor(p.pct) }}>
                        {p.pct}%
                      </span>
                    </div>
                    <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${p.pct}%`, background: PILLAR_COLORS[p.key] ?? "#4B9EFF", borderRadius: 3, transition: "width 0.6s ease" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation pill */}
            <div style={{ width: "100%", padding: "20px 24px", borderRadius: 12, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", marginBottom: 32 }}>
              <p style={{ margin: "0 0 4px", fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: "0.625rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>
                Recommended next move
              </p>
              <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700, color: "#fff" }}>
                {report.recommendation.playbook} — {report.sprintRecommendation} Sprint
              </p>
              {weakest && (
                <p style={{ margin: "6px 0 0", fontSize: "0.8125rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
                  Your biggest source of drag is in <strong style={{ color: "rgba(255,255,255,0.7)" }}>{weakest.label}</strong>. That&apos;s where we start.
                </p>
              )}
            </div>

            {/* Email nudge */}
            <div style={{ width: "100%", padding: "24px", borderRadius: 12, background: "rgba(10,122,255,0.06)", border: "1px solid rgba(10,122,255,0.15)", textAlign: "center", marginBottom: 32 }}>
              <p style={{ margin: "0 0 6px", fontSize: "0.9375rem", fontWeight: 600, color: "#fff" }}>
                Full breakdown in your inbox
              </p>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                Pillar-by-pillar scores, dimension highlights, ROI projection, and your recommended sprint — sent to{" "}
                {email ? <strong style={{ color: "rgba(255,255,255,0.7)" }}>{email}</strong> : "your email"}.
              </p>
            </div>
          </>
        ) : (
          /* Fallback if sessionStorage is empty */
          <div style={{ textAlign: "center", paddingTop: 60 }}>
            <p style={{ fontSize: "1.0625rem", color: "rgba(255,255,255,0.5)" }}>
              Your audit is complete. Check your email for the full report.
            </p>
          </div>
        )}

        <a href="/" className="btn-primary" style={{ fontSize: "0.9375rem", padding: "16px 36px" }}>
          Back to Ecrof Media
        </a>

      </main>
    </div>
  );
}
