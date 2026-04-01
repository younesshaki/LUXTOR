import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { listLeadSubmissionsForAdmin } from "@/lib/services/lead-submissions";

export async function GET(request: Request) {
  const session = await getCurrentSession();

  if (!session?.user?.id || session.user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const submissions = await listLeadSubmissionsForAdmin({
    type: searchParams.get("type"),
    status: searchParams.get("status"),
    odooSyncStatus: searchParams.get("odooSyncStatus"),
    query: searchParams.get("query"),
  });

  return NextResponse.json({ submissions });
}
