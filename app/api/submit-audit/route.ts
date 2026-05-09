import { NextResponse } from "next/server";
import { calculateAuditReport } from "@/lib/oia-engine";

const WEBHOOK_URL = process.env.OIA_WEBHOOK_URL || "";

export async function POST(request: Request) {
  const body = await request.json();

  const { answers, economicAnswers, contact } = body as {
    answers: Record<string, string>;
    economicAnswers: Record<string, string>;
    contact: { name: string; email: string; business: string };
  };

  // Calculate the full report
  const report = calculateAuditReport({ answers, economicAnswers, contact });

  // Fire-and-forget to n8n — never block the client response on this
  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(report),
    }).catch((err) => console.error("n8n webhook error:", err));
  }

  return NextResponse.json(report);
}
