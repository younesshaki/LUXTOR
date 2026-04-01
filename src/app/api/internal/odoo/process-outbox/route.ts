import { NextResponse } from "next/server";

import { processOdooOutbox } from "@/lib/services/lead-submissions";

function hasValidSecret(request: Request) {
  const expected = process.env.INTERNAL_CRON_SECRET;
  if (!expected) {
    return false;
  }

  const header = request.headers.get("x-internal-cron-secret");
  return header === expected;
}

export async function POST(request: Request) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const result = await processOdooOutbox();
  return NextResponse.json(result);
}
