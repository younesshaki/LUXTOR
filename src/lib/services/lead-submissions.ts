import {
  LeadSubmissionStatus,
  OdooSyncStatus,
  OutboxEntityType,
  OutboxEventType,
  OutboxStatus,
  Prisma,
} from "@prisma/client";

import { prisma } from "@/lib/db";
import { sendEmail } from "@/lib/email/service";
import { ServiceError } from "@/lib/errors";
import {
  buildAdminSubmissionNotificationEmail,
  buildSubmissionConfirmationEmail,
} from "@/lib/email/templates";
import { getOdooAdapter } from "@/lib/integrations/odoo";
import { mapLeadSubmissionToOdooPayload } from "@/lib/integrations/odoo/types";
import { DEFAULT_LIMIT, normalizeLimit, normalizePage } from "@/lib/pagination";
import {
  odooSyncStatuses,
  submissionStatuses,
  submissionTypes,
  type LeadSubmissionInput,
} from "@/lib/validations/submissions";

type AdminListFilters = {
  type?: string | null;
  status?: string | null;
  odooSyncStatus?: string | null;
  query?: string | null;
  page?: number | string | null;
  limit?: number | string | null;
};

type PaginationInput = {
  page?: number | string | null;
  limit?: number | string | null;
};

function isSubmissionType(value: string): value is (typeof submissionTypes)[number] {
  return submissionTypes.includes(value as (typeof submissionTypes)[number]);
}

function isSubmissionStatus(value: string): value is (typeof submissionStatuses)[number] {
  return submissionStatuses.includes(value as (typeof submissionStatuses)[number]);
}

function isOdooSyncStatus(value: string): value is (typeof odooSyncStatuses)[number] {
  return odooSyncStatuses.includes(value as (typeof odooSyncStatuses)[number]);
}

function buildPagination(input?: PaginationInput) {
  const page = normalizePage(input?.page);
  const limit = normalizeLimit(input?.limit ?? DEFAULT_LIMIT);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
  };
}

function getAdminNotificationEmail() {
  return process.env.ADMIN_NOTIFICATION_EMAIL ?? "hello@luxtor.com";
}

export async function createLeadSubmission(
  input: LeadSubmissionInput,
  userId?: string | null
) {
  const submission = await prisma.$transaction(async (tx) => {
    const createdSubmission = await tx.leadSubmission.create({
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

    await tx.integrationOutbox.create({
      data: {
        entityType: OutboxEntityType.lead_submission,
        entityId: createdSubmission.id,
        eventType: OutboxEventType.lead_submission_created,
        payload: mapLeadSubmissionToOdooPayload(createdSubmission) as unknown as Prisma.InputJsonValue,
        leadSubmissionId: createdSubmission.id,
      },
    });

    return createdSubmission;
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

export async function listLeadSubmissionsForUser(
  userId: string,
  pagination?: PaginationInput
) {
  const { limit, page, skip } = buildPagination(pagination);
  const where = { userId };
  const [items, total] = await Promise.all([
    prisma.leadSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.leadSubmission.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
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
  const { limit, page, skip } = buildPagination(filters);

  if (filters.type && isSubmissionType(filters.type)) {
    where.type = filters.type;
  }

  if (filters.status && isSubmissionStatus(filters.status)) {
    where.status = filters.status;
  }

  if (filters.odooSyncStatus && isOdooSyncStatus(filters.odooSyncStatus)) {
    where.odooSyncStatus = filters.odooSyncStatus;
  }

  if (filters.query) {
    where.OR = [
      { fullName: { contains: filters.query, mode: "insensitive" } },
      { email: { contains: filters.query, mode: "insensitive" } },
      { serviceInterest: { contains: filters.query, mode: "insensitive" } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.leadSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.leadSubmission.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    limit,
    totalPages: Math.max(1, Math.ceil(total / limit)),
  };
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
  try {
    return await prisma.$transaction(async (tx) => {
      const submission = await tx.leadSubmission.update({
        where: { id: submissionId },
        data: {
          status: input.status,
          internalNotes: input.internalNotes ?? null,
        },
      });

      await tx.integrationOutbox.create({
        data: {
          entityType: OutboxEntityType.lead_submission,
          entityId: submission.id,
          eventType: OutboxEventType.lead_submission_updated,
          payload: mapLeadSubmissionToOdooPayload(submission) as unknown as Prisma.InputJsonValue,
          leadSubmissionId: submission.id,
        },
      });

      return submission;
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      throw new ServiceError("Submission not found.", 404);
    }

    throw error;
  }
}

export async function processOdooOutbox(limit = 25) {
  const adapter = getOdooAdapter();
  const now = new Date();
  const jobs = await prisma.$transaction(async (tx) => {
    const claimed = await tx.$queryRaw<Array<{ id: string }>>`
      WITH claimed AS (
        SELECT id
        FROM "IntegrationOutbox"
        WHERE (
          status = ${OutboxStatus.pending}::"OutboxStatus"
          OR (
            status = ${OutboxStatus.failed}::"OutboxStatus"
            AND "nextRetryAt" <= ${now}
          )
        )
        ORDER BY "createdAt" ASC
        LIMIT ${limit}
        FOR UPDATE SKIP LOCKED
      )
      UPDATE "IntegrationOutbox" AS io
      SET
        status = ${OutboxStatus.processing}::"OutboxStatus",
        "attemptCount" = io."attemptCount" + 1,
        "lastError" = NULL,
        "updatedAt" = NOW()
      FROM claimed
      WHERE io.id = claimed.id
      RETURNING io.id
    `;

    const ids = claimed.map((job) => job.id);

    if (ids.length === 0) {
      return [];
    }

    return tx.integrationOutbox.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        leadSubmission: true,
      },
      orderBy: { createdAt: "asc" },
    });
  });

  let processed = 0;

  for (const job of jobs) {
    if (job.attemptCount >= 10) {
      await prisma.integrationOutbox.update({
        where: { id: job.id },
        data: {
          status: OutboxStatus.dead_letter,
          lastError: "Maximum retry attempts reached.",
          nextRetryAt: null,
        },
      });

      if (job.leadSubmission) {
        await prisma.leadSubmission.update({
          where: { id: job.leadSubmission.id },
          data: {
            odooSyncStatus: OdooSyncStatus.failed,
          },
        });
      }

      continue;
    }

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
