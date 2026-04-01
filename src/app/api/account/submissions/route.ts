import { NextResponse } from "next/server";

import { getCurrentSession } from "@/lib/auth/session";
import { getErrorResponse } from "@/lib/errors";
import { listLeadSubmissionsForUser } from "@/lib/services/lead-submissions";
import { normalizeLimit, normalizePage } from "@/lib/pagination";

export async function GET(request: Request) {
  try {
    const session = await getCurrentSession();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const submissions = await listLeadSubmissionsForUser(session.user.id, {
      page: normalizePage(searchParams.get("page")),
      limit: normalizeLimit(searchParams.get("limit")),
    });

    return NextResponse.json(submissions);
  } catch (error) {
    return getErrorResponse(error);
  }
}
