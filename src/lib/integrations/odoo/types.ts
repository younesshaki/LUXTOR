import type { LeadSubmission } from "@prisma/client";

export type OdooLeadPayload = {
  websiteSubmissionId: string;
  type: LeadSubmission["type"];
  fullName: string;
  email: string;
  phone: string | null;
  suburb: string | null;
  serviceInterest: string | null;
  message: string | null;
  sourcePage: string;
  sourceVariant: string | null;
};

export type OdooSyncResult =
  | { status: "synced"; externalId: string }
  | { status: "noop"; reason: string }
  | { status: "failed"; reason: string };

export interface OdooAdapter {
  syncLeadSubmission(submission: LeadSubmission): Promise<OdooSyncResult>;
}

export function mapLeadSubmissionToOdooPayload(submission: LeadSubmission): OdooLeadPayload {
  return {
    websiteSubmissionId: submission.id,
    type: submission.type,
    fullName: submission.fullName,
    email: submission.email,
    phone: submission.phone,
    suburb: submission.suburb,
    serviceInterest: submission.serviceInterest,
    message: submission.message,
    sourcePage: submission.sourcePage,
    sourceVariant: submission.sourceVariant,
  };
}
