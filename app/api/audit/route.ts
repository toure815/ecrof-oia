import { NextRequest, NextResponse } from "next/server";

const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://api.ecrofmedia.xyz/webhook/audit-results";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const res = await fetch(N8N_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to process audit" },
      { status: 502 }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
