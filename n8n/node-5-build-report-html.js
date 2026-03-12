// ═══════════════════════════════════════════════════════════════
// n8n Code Node 5: "Build Report HTML"
//
// Generates the branded PDF report HTML from the final report.
// Includes: OI Score, 4 D's pillar bars, 12 dimension breakdown,
// sprint recommendation, intern readiness, ROI projection, CTA.
// ═══════════════════════════════════════════════════════════════

const r = $input.first().json;

const name    = r.name || "there";
const email   = r.email || "";
const company = r.company || "";
const oiScore = r.operational_intelligence_score ?? 0;
const oiPct   = r.operational_intelligence_pct ?? 0;

const identityLevel = r.identity_level || "—";
const maturityLevel = r.maturity_level || "—";
const veosPhase     = r.veos_phase_recommendation || "—";
const sprintRec     = r.sprint_recommendation || "—";

const internLevel   = r.internLevel || "—";
const internMessage = r.internMessage || "";

const pillars = r.pillars || {};
const diagnose = pillars.diagnose || {};
const define   = pillars.define || {};
const design   = pillars.design || {};
const deploy   = pillars.deploy || {};
const weakest  = pillars.weakest_pillar || "";
const rankings = pillars.rankings || [];

const dims = r.dimensions || {};

const roi = r.roi || {};
const hoursRecovered = roi.hoursRecovered ?? 0;
const monthlySavings = roi.monthlySavings ?? 0;
const yearlySavings  = roi.yearlySavings ?? 0;
const investmentCost = roi.investmentCost ?? 0;
const annualROI      = roi.annualROI ?? 0;
const minROI         = roi.minROI ?? 0;

// ── Helpers ──
function fmt(n) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD", maximumFractionDigits: 0,
  }).format(n);
}

function pillarBar(label, subtitle, data, color, isWeakest) {
  const pct = data.pct ?? 0;
  const badge = isWeakest
    ? '<span style="margin-left:8px;font-size:11px;color:#f87171;font-weight:500;">⚠ Focus Area</span>'
    : "";
  return `
    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
        <span style="font-weight:700;font-size:14px;color:#1a1a2e;">${label}${badge}</span>
        <span style="font-family:'Courier New',monospace;font-size:13px;color:#6B7280;">${pct}%</span>
      </div>
      <div style="font-size:11px;color:#9CA3AF;margin-bottom:6px;">${subtitle}</div>
      <div style="height:10px;border-radius:5px;background:#E5E7EB;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:5px;"></div>
      </div>
    </div>`;
}

function dimRow(label, data) {
  const pct = data?.pct ?? 0;
  let color = "#f87171"; // red
  if (pct >= 70) color = "#22c55e";      // green
  else if (pct >= 40) color = "#facc15";  // yellow
  return `
    <tr>
      <td style="padding:8px 12px;font-size:13px;color:#374151;border-bottom:1px solid #F3F4F6;">${label}</td>
      <td style="padding:8px 12px;text-align:right;font-family:'Courier New',monospace;font-size:13px;color:${color};font-weight:600;border-bottom:1px solid #F3F4F6;">${pct}%</td>
    </tr>`;
}

function roiCard(label, value) {
  return `
    <td style="padding:16px;background:#F9FAFB;border-radius:10px;text-align:center;border:1px solid #E5E7EB;">
      <div style="font-size:11px;font-family:'Courier New',monospace;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">${label}</div>
      <div style="font-size:22px;font-weight:700;color:#1a1a2e;letter-spacing:-0.02em;">${value}</div>
    </td>`;
}

// ── Build HTML ──
const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Operational Intelligence Report — ${company || name}</title>
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Helvetica, Arial, sans-serif;
      color: #374151;
      line-height: 1.6;
      background: #fff;
    }
    .page { max-width: 680px; margin: 0 auto; padding: 0 32px; }
    @media print {
      .page { max-width: 100%; padding: 0 24px; }
      .page-break { page-break-before: always; }
    }
  </style>
</head>
<body>

<!-- ══════════════════════════════════════
     COVER
     ══════════════════════════════════════ -->
<div style="background:linear-gradient(135deg, #030712 0%, #0A0E1A 100%); padding:60px 0 48px;">
  <div class="page">
    <img src="https://ecrofmedia.com/ecrof_logo_white.png" alt="Ecrof Media" width="120" style="display:block;margin-bottom:40px;" />
    <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:12px;">
      Operational Intelligence Report
    </div>
    <h1 style="font-size:32px;font-weight:800;color:#fff;letter-spacing:-0.02em;line-height:1.15;margin-bottom:16px;">
      ${name}, here's your<br/>operational snapshot.
    </h1>
    <p style="font-size:15px;color:rgba(255,255,255,0.55);line-height:1.6;max-width:480px;">
      This report breaks down where your operations stand today — and where they're silently costing you time, money, and momentum.
    </p>
  </div>
</div>

<!-- ══════════════════════════════════════
     OI SCORE
     ══════════════════════════════════════ -->
<div class="page" style="padding-top:48px;padding-bottom:40px;text-align:center;">
  <div style="display:inline-block;padding:6px 18px;border-radius:40px;background:#EFF6FF;border:1px solid #DBEAFE;font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#0A7AFF;margin-bottom:24px;">
    Your OI Score
  </div>
  <div style="font-size:72px;font-weight:800;color:#0A7AFF;letter-spacing:-0.04em;line-height:1;">
    ${oiPct}<span style="font-size:32px;color:#93C5FD;">%</span>
  </div>
  <div style="margin-top:20px;display:inline-flex;gap:12px;flex-wrap:wrap;justify-content:center;">
    <span style="padding:6px 14px;border-radius:6px;background:#F3F4F6;font-size:13px;color:#374151;">
      <span style="color:#6B7280;">Identity:</span> <strong>${identityLevel}</strong>
    </span>
    <span style="padding:6px 14px;border-radius:6px;background:#F3F4F6;font-size:13px;color:#374151;">
      <span style="color:#6B7280;">Maturity:</span> <strong>${maturityLevel}</strong>
    </span>
    <span style="padding:6px 14px;border-radius:6px;background:#F3F4F6;font-size:13px;color:#374151;">
      <span style="color:#6B7280;">VEOS Phase:</span> <strong>${veosPhase}</strong>
    </span>
  </div>
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ══════════════════════════════════════
     PILLAR BREAKDOWN (the 4 D's)
     ══════════════════════════════════════ -->
<div class="page" style="padding-top:40px;padding-bottom:40px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:24px;">
    The 4 D's — Pillar Breakdown
  </div>

  ${pillarBar("Diagnose", "Clarity & Flow", diagnose, "#55BFFF", weakest === "diagnose")}
  ${pillarBar("Define", "Structure & Systems", define, "#0A7AFF", weakest === "define")}
  ${pillarBar("Design", "Execution & Delegation", design, "#00E89B", weakest === "design")}
  ${pillarBar("Deploy", "Momentum & Capacity", deploy, "#A78BFA", weakest === "deploy")}

  ${rankings.length > 0 ? `
  <div style="margin-top:24px;padding:16px 20px;border-radius:10px;background:#FFF7ED;border:1px solid #FED7AA;">
    <div style="font-size:12px;font-weight:600;color:#C2410C;margin-bottom:4px;">Priority Order (weakest → strongest)</div>
    <div style="font-size:14px;color:#9A3412;">${rankings.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(" → ")}</div>
  </div>` : ""}
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ══════════════════════════════════════
     DIMENSION BREAKDOWN (12 sub-themes)
     ══════════════════════════════════════ -->
<div class="page page-break" style="padding-top:40px;padding-bottom:40px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:20px;">
    Dimension Breakdown
  </div>
  <table style="width:100%;border-collapse:collapse;">
    <thead>
      <tr>
        <th style="padding:8px 12px;text-align:left;font-size:11px;font-family:'Courier New',monospace;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.06em;border-bottom:2px solid #E5E7EB;">Dimension</th>
        <th style="padding:8px 12px;text-align:right;font-size:11px;font-family:'Courier New',monospace;color:#9CA3AF;text-transform:uppercase;letter-spacing:0.06em;border-bottom:2px solid #E5E7EB;">Score</th>
      </tr>
    </thead>
    <tbody>
      ${dimRow("Decision Clarity", dims.decision_clarity)}
      ${dimRow("Workflow Awareness", dims.workflow_awareness)}
      ${dimRow("Role Understanding", dims.role_understanding)}
      ${dimRow("Workflow Structure", dims.workflow_structure)}
      ${dimRow("Tool Integration", dims.tool_integration)}
      ${dimRow("SOP Maturity", dims.sop_maturity)}
      ${dimRow("Automation Readiness", dims.automation_readiness)}
      ${dimRow("Delegation Reliability", dims.delegation_reliability)}
      ${dimRow("Execution Consistency", dims.execution_consistency)}
      ${dimRow("Performance Tracking", dims.performance_tracking)}
      ${dimRow("Bottleneck Removal", dims.bottleneck_removal)}
      ${dimRow("Momentum Maintenance", dims.momentum_maintenance)}
    </tbody>
  </table>
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ══════════════════════════════════════
     SPRINT RECOMMENDATION
     ══════════════════════════════════════ -->
<div class="page" style="padding-top:40px;padding-bottom:40px;text-align:center;">
  <div style="padding:32px 24px;border-radius:14px;background:linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);border:1px solid #DBEAFE;">
    <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#0A7AFF;margin-bottom:12px;">
      Recommended Sprint
    </div>
    <div style="font-size:28px;font-weight:800;color:#1a1a2e;letter-spacing:-0.02em;line-height:1.2;">
      ${sprintRec}
    </div>
    <p style="margin-top:12px;font-size:14px;color:#6B7280;max-width:440px;display:inline-block;">
      Based on your pillar scores and weakest area, this is where you'll unlock the most operational leverage.
    </p>
  </div>
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ══════════════════════════════════════
     DIGITAL INTERN READINESS
     ══════════════════════════════════════ -->
<div class="page" style="padding-top:40px;padding-bottom:40px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:20px;">
    Digital Intern Readiness
  </div>
  <div style="padding:24px;border-radius:12px;background:#F9FAFB;border:1px solid #E5E7EB;">
    <div style="font-size:18px;font-weight:700;color:#1a1a2e;margin-bottom:8px;">${internLevel}</div>
    <p style="font-size:14px;color:#6B7280;line-height:1.65;">${internMessage}</p>
  </div>
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ══════════════════════════════════════
     ROI PROJECTION
     ══════════════════════════════════════ -->
<div class="page page-break" style="padding-top:40px;padding-bottom:48px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:24px;">
    ROI Projection
  </div>

  <table style="width:100%;border-collapse:separate;border-spacing:8px;">
    <tr>
      ${roiCard("Hours Recovered / Year", Math.round(hoursRecovered))}
      ${roiCard("Monthly Savings", fmt(monthlySavings))}
      ${roiCard("Yearly Savings", fmt(yearlySavings))}
    </tr>
    <tr>
      ${roiCard("Sprint Investment", fmt(investmentCost))}
      ${roiCard("Annual ROI", minROI + "x")}
      <td></td>
    </tr>
  </table>

  <p style="margin-top:20px;font-size:13px;color:#9CA3AF;line-height:1.6;">
    These projections are based on the hours and revenue data you provided, using a 40% time-recovery model. Actual results may vary based on implementation scope and timeline.
  </p>
</div>

<!-- ══════════════════════════════════════
     CTA
     ══════════════════════════════════════ -->
<div style="background:#030712;padding:48px 0;">
  <div class="page" style="text-align:center;">
    <h2 style="font-size:24px;font-weight:800;color:#fff;letter-spacing:-0.02em;margin-bottom:12px;">
      Ready to move?
    </h2>
    <p style="font-size:15px;color:rgba(255,255,255,0.55);margin-bottom:28px;max-width:400px;display:inline-block;">
      Book a free strategy call and we'll walk through your report together — and map out your first sprint.
    </p>
    <div>
      <a href="https://ecrofmedia.com/book" style="display:inline-block;padding:14px 36px;background:#0A7AFF;color:#fff;font-size:15px;font-weight:600;border-radius:40px;text-decoration:none;">
        Book Your Strategy Call
      </a>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════
     FOOTER
     ══════════════════════════════════════ -->
<div style="padding:24px 0;text-align:center;">
  <div class="page">
    <p style="font-family:'Courier New',monospace;font-size:9px;letter-spacing:0.08em;color:#D1D5DB;">
      ECROF MEDIA CO. — OPERATIONAL INTELLIGENCE AUDIT
    </p>
  </div>
</div>

</body>
</html>`;

return [{ json: { html, email, name, company } }];
