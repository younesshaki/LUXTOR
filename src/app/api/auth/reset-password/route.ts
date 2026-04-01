import { NextResponse } from "next/server";

import { getErrorResponse } from "@/lib/errors";
import { getClientIp, MemoryRateLimiter } from "@/lib/security/rate-limit";
import { resetPassword } from "@/lib/services/users";

const resetLimiter = new MemoryRateLimiter(10, 1000 * 60 * 10);

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = resetLimiter.check(`reset-password:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many password reset attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const payload = await request.json();
    await resetPassword(payload);

    return NextResponse.json({
      message: "Your password has been reset. You can now sign in.",
    });
  } catch (error) {
    return getErrorResponse(error, "Unable to reset your password.", 400);
  }
}
