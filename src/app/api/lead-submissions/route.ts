import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { getClientIp, MemoryRateLimiter } from "@/lib/security/rate-limit";
import { verifyTurnstileToken } from "@/lib/security/turnstile";
import { createLeadSubmission } from "@/lib/services/lead-submissions";
import { leadSubmissionSchema } from "@/lib/validations/submissions";

const submissionLimiter = new MemoryRateLimiter(20, 1000 * 60 * 10);

export async function POST(request: Request) {
  const ip = getClientIp(request.headers);
  const limit = submissionLimiter.check(`lead-submission:${ip}`);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many submissions from this device. Please try again shortly." },
      { status: 429 }
    );
  }

  try {
    const payload = await request.json();
    const parsed = leadSubmissionSchema.parse(payload);
    const isValidTurnstile = await verifyTurnstileToken(parsed.turnstileToken, ip);

    if (!isValidTurnstile) {
      return NextResponse.json(
        { error: "Spam protection failed. Please try again." },
        { status: 400 }
      );
    }

    const session = await getCurrentSession();
    const submission = await createLeadSubmission(parsed, session?.user?.id);

    return NextResponse.json(
      {
        submissionId: submission.id,
        message:
          submission.type === "quote"
            ? "Your quote request has been received."
            : "Your message has been received.",
        suggestAccountCreation: !session?.user?.id,
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "We could not save your request right now.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
