import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { calculateAuditReport } from "@/lib/oia-engine";

const resend = new Resend(process.env.RESEND_API_KEY);

const ECONOMIC_KEYS = new Set(["hours_per_week_lost", "hourly_labor_cost_range", "annualRevenue", "total_people"]);
const CONTACT_KEYS = new Set(["name", "business", "email"]);

function buildEmailHtml(report: Awaited<ReturnType<typeof calculateAuditReport>>, name: string): string {
  const score = report.oiScore;
  const level = report.maturityLevel;
  const playbook = report.recommendation.playbook;
  const sprint = report.sprintRecommendation;
  const desc = report.recommendation.description;
  const weakest = report.pillarScores.find(p => p.key === report.weakestPillar);

  const pillarRows = report.pillarScores
    .map(p => `
      <tr>
        <td style="padding:8px 12px;font-size:14px;color:#374151;border-bottom:1px solid #f3f4f6;">${p.label}</td>
        <td style="padding:8px 12px;text-align:right;font-weight:700;font-size:14px;color:${p.pct >= 60 ? "#22c55e" : p.pct >= 35 ? "#facc15" : "#f87171"};border-bottom:1px solid #f3f4f6;">${p.pct}%</td>
      </tr>`).join("");

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:580px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

    <!-- Header -->
    <div style="background:#0a0a1a;padding:32px 40px;">
      <p style="margin:0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,0.4);">Ecrof Media</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#fff;">Your Operational Intelligence Report</h1>
    </div>

    <!-- Score -->
    <div style="padding:32px 40px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 4px;font-size:13px;color:#6b7280;text-transform:uppercase;letter-spacing:0.08em;">Overall OI Score</p>
      <p style="margin:0;font-size:56px;font-weight:800;color:#0a0a1a;line-height:1;">${score}<span style="font-size:24px;color:#9ca3af;">/100</span></p>
      <p style="margin:8px 0 0;font-size:15px;color:#374151;">${level}</p>
    </div>

    <!-- Greeting -->
    <div style="padding:28px 40px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0;font-size:15px;color:#374151;line-height:1.6;">Hey ${name}, here's what the audit surfaced. Your biggest constraint is in <strong>${weakest?.label ?? report.weakestPillar}</strong> — that's where friction is costing you the most.</p>
    </div>

    <!-- Pillar Scores -->
    <div style="padding:28px 40px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">The 4 D's Breakdown</p>
      <table style="width:100%;border-collapse:collapse;">
        ${pillarRows}
      </table>
    </div>

    <!-- Recommendation -->
    <div style="padding:28px 40px;border-bottom:1px solid #f3f4f6;background:#f8faff;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Recommended Next Move</p>
      <p style="margin:0 0 4px;font-size:18px;font-weight:700;color:#0a0a1a;">${playbook} — ${sprint} Sprint</p>
      <p style="margin:8px 0 0;font-size:14px;color:#374151;line-height:1.6;">${desc}</p>
    </div>

    <!-- ROI + RPE -->
    <div style="padding:28px 40px;border-bottom:1px solid #f3f4f6;">
      <p style="margin:0 0 16px;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#6b7280;">Estimated Impact</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:${report.rpe.revenuePerPerson !== null ? "20px" : "0"};">
        <div>
          <p style="margin:0;font-size:22px;font-weight:700;color:#0a0a1a;">$${report.roi.yearlySavings.toLocaleString()}</p>
          <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Yearly savings potential</p>
        </div>
        <div>
          <p style="margin:0;font-size:22px;font-weight:700;color:#0a0a1a;">${report.roi.hoursRecovered}h</p>
          <p style="margin:4px 0 0;font-size:12px;color:#6b7280;">Hours recovered per year</p>
        </div>
      </div>
      ${report.rpe.revenuePerPerson !== null ? `
      <div style="padding:16px;border-radius:8px;background:${report.rpe.status === "Below Healthy Threshold" ? "#FFF7ED" : "#F0FDF4"};border:1px solid ${report.rpe.status === "Below Healthy Threshold" ? "#FED7AA" : "#BBF7D0"};">
        <p style="margin:0 0 4px;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:${report.rpe.status === "Below Healthy Threshold" ? "#C2410C" : "#15803D"};">Revenue Per Person — ${report.rpe.status}</p>
        <p style="margin:0 0 6px;font-size:18px;font-weight:700;color:#0a0a1a;">$${report.rpe.revenuePerPerson.toLocaleString()} <span style="font-size:12px;font-weight:400;color:#6b7280;">vs $125K benchmark</span></p>
        <p style="margin:0;font-size:13px;color:#374151;line-height:1.5;">${report.rpe.message}</p>
      </div>` : ""}
    </div>

    <!-- CTA -->
    <div style="padding:32px 40px;text-align:center;">
      <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">Ready to close the gap? Let's map it out.</p>
      <a href="https://ecrofmedia.com/brain-map" style="display:inline-block;padding:14px 32px;background:#0a0a1a;color:#fff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600;">Book a Brain Map Call</a>
    </div>

  </div>
  <p style="text-align:center;font-size:12px;color:#9ca3af;margin:16px 0 40px;">Ecrof Media &bull; ecrofmedia.com</p>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  const flat: Record<string, string> = await req.json();

  const answers: Record<string, string> = {};
  const economicAnswers: Record<string, string> = {};
  const contact = { name: "", business: "", email: "" };

  for (const [k, v] of Object.entries(flat)) {
    if (CONTACT_KEYS.has(k)) {
      (contact as Record<string, string>)[k] = v;
    } else if (ECONOMIC_KEYS.has(k)) {
      economicAnswers[k] = v;
    } else {
      answers[k] = v;
    }
  }

  const report = calculateAuditReport({ answers, economicAnswers, contact });

  // Send email via Resend — fire-and-forget, never blocks response
  if (process.env.RESEND_API_KEY && contact.email) {
    resend.emails.send({
      from: "Ecrof Media <onboarding@resend.dev>",
      to: contact.email,
      subject: `Your OI Score: ${report.oiScore}/100 — ${report.recommendation.playbook}`,
      html: buildEmailHtml(report, contact.name || "there"),
    }).catch((err: unknown) => console.error("Resend error:", err));
  }

  return NextResponse.json({
    personal: { name: contact.name, email: contact.email },
    report,
  });
}
