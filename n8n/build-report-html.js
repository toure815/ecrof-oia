// ─────────────────────────────────────────────────────────────
// n8n Code Node: "Build Report HTML"
//
// Place this AFTER your scoring node in the n8n workflow.
// Input: the scored report JSON from your scoring node.
// Output: { html, email, name } — ready for HTML-to-PDF conversion.
// ─────────────────────────────────────────────────────────────

const report = $input.first().json;

// ── Pull values from your scoring output ──
const name              = report.personal?.name || 'there';
const email             = report.personal?.email || '';
const company           = report.personal?.company || report.personal?.business || '';
const oiScore           = report.operationalIntelligenceScore ?? 0;
const oiPct             = report.operationalIntelligencePct ?? 0;
const identityLevel     = report.identityLevel || '—';
const maturityLevel     = report.maturityLevel || '—';
const veosPhase         = report.veosPhaseRecommendation || '—';
const sprintRec         = report.sprintRecommendation || '—';

const pillars = report.pillars || {};
const discover = pillars.discover || {};
const design   = pillars.design || {};
const deploy   = pillars.deploy || {};
const optimize = pillars.optimize || {};
const weakest  = pillars.weakestPillar || '';
const rankings = pillars.rankings || [];

const roi = report.roi || {};
const hoursRecovered = roi.hoursRecovered ?? 0;
const monthlySavings = roi.monthlySavings ?? 0;
const yearlySavings  = roi.yearlySavings ?? 0;
const investmentCost = roi.investmentCost ?? 0;
const annualROI      = roi.annualROI ?? 0;

// ── Helpers ──
function fmt(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', maximumFractionDigits: 0
  }).format(n);
}

function pillarBar(label, data, color, isWeakest) {
  const pct = data.pct ?? 0;
  const weakBadge = isWeakest
    ? `<span style="margin-left:8px;font-size:11px;color:#f87171;font-weight:500;">⚠ Focus Area</span>`
    : '';
  return `
    <div style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
        <span style="font-weight:600;font-size:14px;color:#1a1a2e;">${label}${weakBadge}</span>
        <span style="font-family:'Courier New',monospace;font-size:13px;color:#6B7280;">${pct}%</span>
      </div>
      <div style="height:10px;border-radius:5px;background:#E5E7EB;overflow:hidden;">
        <div style="height:100%;width:${pct}%;background:${color};border-radius:5px;"></div>
      </div>
    </div>`;
}

function roiCard(label, value) {
  return `
    <td style="padding:16px;background:#F9FAFB;border-radius:10px;text-align:center;border:1px solid #E5E7EB;">
      <div style="font-size:11px;font-family:'Courier New',monospace;color:#6B7280;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:6px;">${label}</div>
      <div style="font-size:22px;font-weight:700;color:#1a1a2e;letter-spacing:-0.02em;">${value}</div>
    </td>`;
}

// ── Build the HTML ──
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

<!-- ════════════════════════════════════════════
     COVER / HEADER
     ════════════════════════════════════════════ -->
<div style="background:linear-gradient(135deg, #030712 0%, #0A0E1A 100%); padding:60px 0 48px;">
  <div class="page">
    <!-- Logo placeholder — replace src with your hosted logo URL -->
    <img
      src="https://ecrofmedia.com/ecrof_logo_white.png"
      alt="Ecrof Media"
      width="120"
      style="display:block;margin-bottom:40px;"
    />
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

<!-- ════════════════════════════════════════════
     OI SCORE
     ════════════════════════════════════════════ -->
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

<!-- ════════════════════════════════════════════
     PILLAR BREAKDOWN
     ════════════════════════════════════════════ -->
<div class="page" style="padding-top:40px;padding-bottom:40px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:24px;">
    Pillar Breakdown
  </div>

  ${pillarBar('Discover — Clarity & Flow', discover, '#55BFFF', weakest === 'discover')}
  ${pillarBar('Design — Structure & Systems', design, '#0A7AFF', weakest === 'design')}
  ${pillarBar('Deploy — Execution & Delegation', deploy, '#00E89B', weakest === 'deploy')}
  ${pillarBar('Optimize — Momentum & Capacity', optimize, '#A78BFA', weakest === 'optimize')}

  ${rankings.length > 0 ? `
  <div style="margin-top:24px;padding:16px 20px;border-radius:10px;background:#FFF7ED;border:1px solid #FED7AA;">
    <div style="font-size:12px;font-weight:600;color:#C2410C;margin-bottom:4px;">Priority Order</div>
    <div style="font-size:14px;color:#9A3412;">${rankings.join(' → ')}</div>
  </div>` : ''}
</div>

<hr style="border:none;height:1px;background:#E5E7EB;margin:0 32px;" />

<!-- ════════════════════════════════════════════
     SPRINT RECOMMENDATION
     ════════════════════════════════════════════ -->
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

<!-- ════════════════════════════════════════════
     ROI PROJECTION
     ════════════════════════════════════════════ -->
<div class="page" style="padding-top:40px;padding-bottom:48px;">
  <div style="font-family:'Courier New',monospace;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#6B7280;margin-bottom:24px;">
    ROI Projection
  </div>

  <table style="width:100%;border-collapse:separate;border-spacing:8px;">
    <tr>
      ${roiCard('Hours Recovered / Year', hoursRecovered)}
      ${roiCard('Monthly Savings', fmt(monthlySavings))}
      ${roiCard('Yearly Savings', fmt(yearlySavings))}
    </tr>
    <tr>
      ${roiCard('Sprint Investment', fmt(investmentCost))}
      ${roiCard('Annual ROI', annualROI + 'x')}
      <td></td>
    </tr>
  </table>

  <p style="margin-top:20px;font-size:13px;color:#9CA3AF;line-height:1.6;">
    These projections are based on the hours and labor cost ranges you provided. Actual results may vary based on implementation scope and timeline.
  </p>
</div>

<!-- ════════════════════════════════════════════
     NEXT STEPS / CTA
     ════════════════════════════════════════════ -->
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

<!-- ════════════════════════════════════════════
     FOOTER
     ════════════════════════════════════════════ -->
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
