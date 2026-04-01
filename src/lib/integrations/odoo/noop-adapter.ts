import type { LeadSubmission } from "@prisma/client";

import type { OdooAdapter, OdooSyncResult } from "@/lib/integrations/odoo/types";

export class NoopOdooAdapter implements OdooAdapter {
  async syncLeadSubmission(submission: LeadSubmission): Promise<OdooSyncResult> {
    void submission;
    return {
      status: "noop",
      reason: "Odoo integration is not configured yet.",
    };
  }
}
