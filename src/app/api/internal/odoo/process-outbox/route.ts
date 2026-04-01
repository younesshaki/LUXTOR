import { timingSafeEqual } from "node:crypto";

import { NextResponse } from "next/server";

import { getErrorResponse } from "@/lib/errors";
import { processOdooOutbox } from "@/lib/services/lead-submissions";

function hasValidSecret(request: Request) {
  const expected = process.env.INTERNAL_CRON_SECRET;
  if (!expected) {
    return false;
  }

  const header = request.headers.get("x-internal-cron-secret");
  if (!header) {
    return false;
  }

  const actualBuffer = Buffer.from(header);
  const expectedBuffer = Buffer.from(expected);

  if (actualBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  if (!hasValidSecret(request)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const result = await processOdooOutbox();
    return NextResponse.json(result);
  } catch (error) {
    return getErrorResponse(error);
  }
}
