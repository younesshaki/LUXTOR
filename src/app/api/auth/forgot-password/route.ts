import { NextResponse } from "next/server";

import { getClientIp, MemoryRateLimiter } from "@/lib/security/rate-limit";
import { requestPasswordReset } from "@/lib/services/users";

const forgotPasswordLimiter = new MemoryRateLimiter(5, 1000 * 60 * 10);

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = forgotPasswordLimiter.check(`forgot-password:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many reset attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const payload = await request.json();
    await requestPasswordReset(payload);

    return NextResponse.json({
      message: "If an account exists for that email, a reset link has been sent.",
    });
  } catch {
    return NextResponse.json({
      message: "If an account exists for that email, a reset link has been sent.",
    });
  }
}
