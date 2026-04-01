import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import {
  getLeadSubmissionForAdmin,
  updateLeadSubmissionByAdmin,
} from "@/lib/services/lead-submissions";
import { adminSubmissionUpdateSchema } from "@/lib/validations/submissions";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentSession();

  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await context.params;
  const submission = await getLeadSubmissionForAdmin(id);

  if (!submission) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentSession();

  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  try {
    const payload = await request.json();
    const parsed = adminSubmissionUpdateSchema.parse(payload);
    const { id } = await context.params;

    const updated = await updateLeadSubmissionByAdmin(id, {
      status: parsed.status,
      internalNotes: parsed.internalNotes ?? null,
    });

    return NextResponse.json({ submission: updated });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to update the submission.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
