import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { getErrorResponse } from "@/lib/errors";
import { normalizeLimit, normalizePage } from "@/lib/pagination";
import { listLeadSubmissionsForAdmin } from "@/lib/services/lead-submissions";

export async function GET(request: Request) {
  try {
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
      page: normalizePage(searchParams.get("page")),
      limit: normalizeLimit(searchParams.get("limit")),
    });

    return NextResponse.json(submissions);
  } catch (error) {
    return getErrorResponse(error);
  }
}
