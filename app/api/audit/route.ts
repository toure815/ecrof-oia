import { NextRequest, NextResponse } from "next/server";
import { calculateAuditReport } from "@/lib/oia-engine";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://api.ecrofmedia.xyz/webhook/audit-results";

const ECONOMIC_KEYS = new Set(["hours_per_week_lost", "hourly_labor_cost_range", "annualRevenue"]);
const CONTACT_KEYS = new Set(["name", "business", "email"]);

export async function POST(req: NextRequest) {
  const flat: Record<string, string> = await req.json();

  // Split flat payload into the three buckets the engine expects
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

  // Fire-and-forget to n8n for email/PDF delivery — never blocks the response
  fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...flat, report }),
  }).catch((err) => console.error("n8n webhook error:", err));

  // Return shape the results page expects
  return NextResponse.json({
    personal: { name: contact.name, email: contact.email },
    report,
  });
}
