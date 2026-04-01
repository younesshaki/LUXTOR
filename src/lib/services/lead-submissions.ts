import {
  LeadSubmissionStatus,
  OdooSyncStatus,
  OutboxEntityType,
  OutboxEventType,
  OutboxStatus,
  type Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/service";
import {
  buildAdminSubmissionNotificationEmail,
  buildSubmissionConfirmationEmail,
} from "@/lib/email/templates";
import { getOdooAdapter } from "@/lib/integrations/odoo";
import { mapLeadSubmissionToOdooPayload } from "@/lib/integrations/odoo/types";
import type { LeadSubmissionInput } from "@/lib/validations/submissions";

type AdminListFilters = {
  type?: string | null;
  status?: string | null;
  odooSyncStatus?: string | null;
  query?: string | null;
};

function getAdminNotificationEmail() {
  return process.env.ADMIN_NOTIFICATION_EMAIL ?? "hello@luxtor.com";
}

export async function createLeadSubmission(
  input: LeadSubmissionInput,
  userId?: string | null
) {
  const submission = await prisma.leadSubmission.create({
    data: {
      type: input.type,
      status: LeadSubmissionStatus.submitted,
      userId: userId ?? null,
      fullName: input.fullName,
      email: input.email,
      phone: input.phone ?? null,
      suburb: input.suburb ?? null,
      serviceInterest: input.serviceInterest ?? null,
      message: input.message ?? null,
      sourcePage: input.sourcePage,
      sourceVariant: input.sourceVariant ?? null,
      odooSyncStatus: OdooSyncStatus.pending,
    },
  });

  await prisma.integrationOutbox.create({
    data: {
      entityType: OutboxEntityType.lead_submission,
      entityId: submission.id,
      eventType: OutboxEventType.lead_submission_created,
      payload: mapLeadSubmissionToOdooPayload(submission) as unknown as Prisma.InputJsonValue,
      leadSubmissionId: submission.id,
    },
  });

  const confirmationEmail = buildSubmissionConfirmationEmail({
    fullName: submission.fullName,
    type: submission.type,
  });

  const adminEmail = buildAdminSubmissionNotificationEmail({
    type: submission.type,
    fullName: submission.fullName,
    email: submission.email,
    serviceInterest: submission.serviceInterest,
    message: submission.message,
  });

  await Promise.all([
    sendEmail({
      to: submission.email,
      ...confirmationEmail,
    }),
    sendEmail({
      to: getAdminNotificationEmail(),
      ...adminEmail,
    }),
  ]);

  return submission;
}

export async function listLeadSubmissionsForUser(userId: string) {
  return prisma.leadSubmission.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeadSubmissionForUser(userId: string, submissionId: string) {
  return prisma.leadSubmission.findFirst({
    where: {
      id: submissionId,
      userId,
    },
  });
}

export async function listLeadSubmissionsForAdmin(filters: AdminListFilters) {
  const where: Prisma.LeadSubmissionWhereInput = {};

  if (filters.type) {
    where.type = filters.type as Prisma.LeadSubmissionWhereInput["type"];
  }

  if (filters.status) {
    where.status = filters.status as Prisma.LeadSubmissionWhereInput["status"];
  }

  if (filters.odooSyncStatus) {
    where.odooSyncStatus = filters.odooSyncStatus as Prisma.LeadSubmissionWhereInput["odooSyncStatus"];
  }

  if (filters.query) {
    where.OR = [
      { fullName: { contains: filters.query, mode: "insensitive" } },
      { email: { contains: filters.query, mode: "insensitive" } },
      { serviceInterest: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  return prisma.leadSubmission.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
}

export async function getLeadSubmissionForAdmin(submissionId: string) {
  return prisma.leadSubmission.findUnique({
    where: { id: submissionId },
    include: {
      user: true,
      outboxEvents: {
        orderBy: { createdAt: "desc" },
      },
    },
  });
}

export async function updateLeadSubmissionByAdmin(
  submissionId: string,
  input: {
    status: LeadSubmissionStatus;
    internalNotes?: string | null;
  }
) {
  const submission = await prisma.leadSubmission.update({
    where: { id: submissionId },
    data: {
      status: input.status,
      internalNotes: input.internalNotes ?? null,
    },
  });

  await prisma.integrationOutbox.create({
    data: {
      entityType: OutboxEntityType.lead_submission,
      entityId: submission.id,
      eventType: OutboxEventType.lead_submission_updated,
      payload: mapLeadSubmissionToOdooPayload(submission) as unknown as Prisma.InputJsonValue,
      leadSubmissionId: submission.id,
    },
  });

  return submission;
}

export async function processOdooOutbox(limit = 25) {
  const adapter = getOdooAdapter();
  const now = new Date();

  const jobs = await prisma.integrationOutbox.findMany({
    where: {
      OR: [
        { status: OutboxStatus.pending },
        {
          status: OutboxStatus.failed,
          nextRetryAt: { lte: now },
        },
      ],
    },
    include: {
      leadSubmission: true,
    },
    orderBy: { createdAt: "asc" },
    take: limit,
  });

  let processed = 0;

  for (const job of jobs) {
    if (!job.leadSubmission) {
      continue;
    }

    processed += 1;

    await prisma.integrationOutbox.update({
      where: { id: job.id },
      data: {
        status: OutboxStatus.processing,
        attemptCount: { increment: 1 },
        lastError: null,
      },
    });

    const result = await adapter.syncLeadSubmission(job.leadSubmission);

    if (result.status === "synced") {
      await prisma.integrationOutbox.update({
        where: { id: job.id },
        data: {
          status: OutboxStatus.processed,
          processedAt: new Date(),
          nextRetryAt: null,
          lastError: null,
        },
      });

      await prisma.leadSubmission.update({
        where: { id: job.leadSubmission.id },
        data: {
          odooSyncStatus: OdooSyncStatus.synced,
          odooExternalId: result.externalId,
        },
      });

      continue;
    }

    if (result.status === "noop") {
      await prisma.integrationOutbox.update({
        where: { id: job.id },
        data: {
          status: OutboxStatus.failed,
          lastError: result.reason,
          nextRetryAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        },
      });

      await prisma.leadSubmission.update({
        where: { id: job.leadSubmission.id },
        data: {
          odooSyncStatus: OdooSyncStatus.queued,
        },
      });

      continue;
    }

    await prisma.integrationOutbox.update({
      where: { id: job.id },
      data: {
        status: OutboxStatus.failed,
        lastError: result.reason,
        nextRetryAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    await prisma.leadSubmission.update({
      where: { id: job.leadSubmission.id },
      data: {
        odooSyncStatus: OdooSyncStatus.failed,
      },
    });
  }

  return { processed };
}
