import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { listLeadSubmissionsForUser } from "@/lib/services/lead-submissions";

export async function GET() {
  const session = await getCurrentSession();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const submissions = await listLeadSubmissionsForUser(session.user.id);
  return NextResponse.json({ submissions });
}
