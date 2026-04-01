import { describe, expect, it } from "vitest";
import type { LeadSubmission } from "@prisma/client";

import { mapLeadSubmissionToOdooPayload } from "@/lib/integrations/odoo/types";

describe("mapLeadSubmissionToOdooPayload", () => {
  it("maps a website submission into an Odoo-ready payload", () => {
    const submission: LeadSubmission = {
      id: "submission_123",
      type: "quote",
      status: "submitted",
      userId: null,
      fullName: "Youness Haki",
      email: "test@example.com",
      phone: "+1 555 123 4567",
      suburb: "Los Angeles",
      serviceInterest: "curtains",
      message: "Please help with a bedroom quote.",
      sourcePage: "/quote",
      sourceVariant: "quote-page",
      internalNotes: null,
      odooSyncStatus: "pending",
      odooExternalId: null,
      createdAt: new Date("2026-04-01T00:00:00.000Z"),
      updatedAt: new Date("2026-04-01T00:00:00.000Z"),
    };

    expect(mapLeadSubmissionToOdooPayload(submission)).toEqual({
      websiteSubmissionId: "submission_123",
      type: "quote",
      fullName: "Youness Haki",
      email: "test@example.com",
      phone: "+1 555 123 4567",
      suburb: "Los Angeles",
      serviceInterest: "curtains",
      message: "Please help with a bedroom quote.",
      sourcePage: "/quote",
      sourceVariant: "quote-page",
    });
  });
});
