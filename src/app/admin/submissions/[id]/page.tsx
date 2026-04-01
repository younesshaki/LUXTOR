import { notFound } from "next/navigation";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { requireAdmin } from "@/lib/auth/session";
import { getLeadSubmissionForAdmin } from "@/lib/services/lead-submissions";
import { SubmissionStatusBadge } from "@/components/account/SubmissionStatusBadge";
import { AdminSubmissionUpdateForm } from "@/components/account/AdminSubmissionUpdateForm";

function toneFor(value: string) {
  switch (value) {
    case "synced":
    case "contacted":
    case "converted":
      return "success" as const;
    case "queued":
    case "under_review":
      return "warning" as const;
    case "failed":
      return "danger" as const;
    default:
      return "neutral" as const;
  }
}

export default async function AdminSubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  const submission = await getLeadSubmissionForAdmin(id);

  if (!submission) {
    notFound();
  }

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-10" variant="cream">
        <Container>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze">Admin</p>
          <h1 className="mt-4 font-heading text-4xl text-brand-black">{submission.fullName}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{submission.email}</p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
            <div className="space-y-6">
              <div className="rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center gap-3">
                  <SubmissionStatusBadge
                    label={submission.status.replaceAll("_", " ")}
                    tone={toneFor(submission.status)}
                  />
                  <SubmissionStatusBadge
                    label={submission.odooSyncStatus.replaceAll("_", " ")}
                    tone={toneFor(submission.odooSyncStatus)}
                  />
                </div>

                <dl className="mt-6 grid gap-4 md:grid-cols-2">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Type</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal capitalize">{submission.type}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Phone</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal">{submission.phone ?? "Not provided"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Suburb</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal">{submission.suburb ?? "Not provided"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Service</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal">{submission.serviceInterest ?? "General"}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Linked User</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal">
                      {submission.user ? `${submission.user.fullName ?? submission.user.email}` : "Guest submission"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">Submitted</dt>
                    <dd className="mt-1 text-sm text-brand-charcoal">
                      {new Date(submission.createdAt).toLocaleString()}
                    </dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Message</p>
                  <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-brand-charcoal">
                    {submission.message ?? "No message was provided."}
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm">
                <h2 className="font-heading text-2xl text-brand-black">Odoo outbox history</h2>
                <div className="mt-4 space-y-4">
                  {submission.outboxEvents.map((event) => (
                    <div key={event.id} className="rounded-sm border border-brand-sand/10 bg-brand-cream/20 p-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <SubmissionStatusBadge
                          label={event.status}
                          tone={toneFor(event.status)}
                        />
                        <p className="text-xs uppercase tracking-wider text-muted-foreground">
                          {event.eventType.replaceAll("_", " ")}
                        </p>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Attempts: {event.attemptCount}
                        {event.lastError ? ` • ${event.lastError}` : ""}
                      </p>
                    </div>
                  ))}
                  {submission.outboxEvents.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No outbox events yet.</p>
                  ) : null}
                </div>
              </div>
            </div>

            <AdminSubmissionUpdateForm
              submissionId={submission.id}
              initialStatus={submission.status}
              initialNotes={submission.internalNotes}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
