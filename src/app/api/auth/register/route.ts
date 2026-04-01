import { NextResponse } from "next/server";

import { getErrorResponse } from "@/lib/errors";
import { getClientIp, MemoryRateLimiter } from "@/lib/security/rate-limit";
import { registerUser } from "@/lib/services/users";

const registerLimiter = new MemoryRateLimiter(5, 1000 * 60 * 10);

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = registerLimiter.check(`register:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many registration attempts. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const payload = await request.json();
    const result = await registerUser(payload);

    return NextResponse.json({
      message: result.verificationRequired
        ? "Account created. Please check your email to verify your account."
        : "Account created. You can sign in right away.",
    });
  } catch (error) {
    return getErrorResponse(error, "Unable to create your account right now.", 400);
  }
}
