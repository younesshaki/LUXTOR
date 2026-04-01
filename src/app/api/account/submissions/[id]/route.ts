import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { getLeadSubmissionForUser } from "@/lib/services/lead-submissions";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const submission = await getLeadSubmissionForUser(session.user.id, id);

  if (!submission) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ submission });
}
