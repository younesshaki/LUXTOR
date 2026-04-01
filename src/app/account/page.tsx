import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { requireUser } from "@/lib/auth/session";
import { listLeadSubmissionsForUser } from "@/lib/services/lead-submissions";
import { SubmissionStatusBadge } from "@/components/account/SubmissionStatusBadge";
import { SignOutButton } from "@/components/account/SignOutButton";
import { formatStableDate } from "@/lib/format/date";

function statusTone(status: string) {
  switch (status) {
    case "synced":
    case "converted":
    case "contacted":
      return "success" as const;
    case "under_review":
    case "queued":
      return "warning" as const;
    case "failed":
      return "danger" as const;
    default:
      return "neutral" as const;
  }
}

export default async function AccountPage() {
  const session = await requireUser();
  const submissions = await listLeadSubmissionsForUser(session.user.id);

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-14" variant="cream">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze">My Account</p>
              <h1 className="mt-4 font-heading text-4xl text-brand-black">Welcome back, {session.user.fullName ?? session.user.email}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                Review your submissions, keep your details up to date, and stay ready for the future Odoo-backed customer portal.
              </p>
            </div>
            <SignOutButton />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
            <div className="rounded-sm border border-brand-sand/20 bg-brand-cream/30 p-6">
              <h2 className="font-heading text-2xl text-brand-black">Profile</h2>
              <dl className="mt-5 grid gap-4 text-sm text-muted-foreground">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-charcoal/50">Email</dt>
                  <dd className="mt-1 text-brand-charcoal">{session.user.email}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-charcoal/50">Phone</dt>
                  <dd className="mt-1 text-brand-charcoal">{session.user.phone ?? "Not provided yet"}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-brand-charcoal/50">Suburb</dt>
                  <dd className="mt-1 text-brand-charcoal">{session.user.suburb ?? "Not provided yet"}</dd>
                </div>
              </dl>
              <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
                This first version keeps your account simple. Profile editing and deeper order visibility can be layered in as the Odoo integration matures.
              </p>
            </div>

            <div className="rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-heading text-2xl text-brand-black">My Requests</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Submissions tied to your verified email appear here automatically.
                  </p>
                </div>
                <Link href="/quote" className="text-sm text-brand-bronze underline underline-offset-4">
                  Create a new request
                </Link>
              </div>

              {submissions.length === 0 ? (
                <div className="mt-8 rounded-sm border border-dashed border-brand-sand/30 p-8 text-sm text-muted-foreground">
                  No requests yet. Submit a quote or contact form and it will show up here.
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <table className="min-w-full border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                        <th>Type</th>
                        <th>Status</th>
                        <th>Odoo Sync</th>
                        <th>Submitted</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((submission) => (
                        <tr key={submission.id} className="rounded-sm bg-brand-cream/20 text-sm text-brand-charcoal">
                          <td className="px-4 py-4 capitalize">{submission.type}</td>
                          <td className="px-4 py-4">
                            <SubmissionStatusBadge
                              label={submission.status.replaceAll("_", " ")}
                              tone={statusTone(submission.status)}
                            />
                          </td>
                          <td className="px-4 py-4">
                            <SubmissionStatusBadge
                              label={submission.odooSyncStatus.replaceAll("_", " ")}
                              tone={statusTone(submission.odooSyncStatus)}
                            />
                          </td>
                          <td className="px-4 py-4">{formatStableDate(submission.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
