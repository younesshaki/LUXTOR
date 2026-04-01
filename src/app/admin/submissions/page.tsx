import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { requireAdmin } from "@/lib/auth/session";
import { listLeadSubmissionsForAdmin } from "@/lib/services/lead-submissions";
import { SubmissionStatusBadge } from "@/components/account/SubmissionStatusBadge";
import { formatStableDate } from "@/lib/format/date";
import { normalizePage } from "@/lib/pagination";
import { odooSyncStatuses, submissionStatuses, submissionTypes } from "@/lib/validations/submissions";

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

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    status?: string;
    odooSyncStatus?: string;
    query?: string;
    page?: string;
  }>;
}) {
  await requireAdmin();
  const params = await searchParams;
  const submissions = await listLeadSubmissionsForAdmin({
    ...params,
    page: normalizePage(params.page),
  });
  const buildAdminPageHref = (page: number) => {
    const query = new URLSearchParams();

    if (params.query) {
      query.set("query", params.query);
    }
    if (params.type) {
      query.set("type", params.type);
    }
    if (params.status) {
      query.set("status", params.status);
    }
    if (params.odooSyncStatus) {
      query.set("odooSyncStatus", params.odooSyncStatus);
    }
    if (page > 1) {
      query.set("page", String(page));
    }

    const search = query.toString();
    return search ? `/admin/submissions?${search}` : "/admin/submissions";
  };

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-10" variant="cream">
        <Container>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze">Admin</p>
          <h1 className="mt-4 font-heading text-4xl text-brand-black">Submission Queue</h1>
        </Container>
      </Section>

      <Section>
        <Container>
          <form className="mb-6 grid gap-4 rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm md:grid-cols-4">
            <input
              type="text"
              name="query"
              defaultValue={params.query ?? ""}
              placeholder="Search by name, email, or service"
              className="h-12 rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
            />
            <select
              name="type"
              defaultValue={params.type ?? ""}
              className="h-12 rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
            >
              <option value="">All types</option>
              {submissionTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <select
              name="status"
              defaultValue={params.status ?? ""}
              className="h-12 rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
            >
              <option value="">All statuses</option>
              {submissionStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <select
              name="odooSyncStatus"
              defaultValue={params.odooSyncStatus ?? ""}
              className="h-12 rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
            >
              <option value="">All Odoo sync states</option>
              {odooSyncStatuses.map((status) => (
                <option key={status} value={status}>
                  {status.replaceAll("_", " ")}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="md:col-span-4 rounded-none bg-brand-bronze px-5 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand-bronze/90"
            >
              Apply filters
            </button>
          </form>

          <p className="mb-4 text-xs uppercase tracking-wider text-muted-foreground">
            Showing {submissions.items.length} of {submissions.total} submissions
          </p>

          <div className="overflow-x-auto rounded-sm border border-brand-sand/20 bg-white shadow-sm">
            <table className="min-w-full">
              <thead className="border-b border-brand-sand/20 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Requester</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Odoo</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4" />
                </tr>
              </thead>
              <tbody>
                {submissions.items.map((submission) => (
                  <tr key={submission.id} className="border-b border-brand-sand/10 text-sm text-brand-charcoal last:border-b-0">
                    <td className="px-6 py-5">
                      <div className="font-medium">{submission.fullName}</div>
                      <div className="text-xs text-muted-foreground">{submission.email}</div>
                    </td>
                    <td className="px-6 py-5 capitalize">{submission.type}</td>
                    <td className="px-6 py-5">
                      <SubmissionStatusBadge
                        label={submission.status.replaceAll("_", " ")}
                        tone={toneFor(submission.status)}
                      />
                    </td>
                    <td className="px-6 py-5">
                      <SubmissionStatusBadge
                        label={submission.odooSyncStatus.replaceAll("_", " ")}
                        tone={toneFor(submission.odooSyncStatus)}
                      />
                    </td>
                    <td className="px-6 py-5">{formatStableDate(submission.createdAt)}</td>
                    <td className="px-6 py-5 text-right">
                      <Link
                        href={`/admin/submissions/${submission.id}`}
                        className="text-brand-bronze underline underline-offset-4"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
                {submissions.items.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-sm text-muted-foreground">
                      No submissions matched those filters.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          {submissions.totalPages > 1 ? (
            <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Page {submissions.page} of {submissions.totalPages}
              </span>
              <div className="flex gap-4">
                {submissions.page > 1 ? (
                  <Link
                    href={buildAdminPageHref(submissions.page - 1)}
                    className="text-brand-bronze underline underline-offset-4"
                  >
                    Previous
                  </Link>
                ) : (
                  <span className="opacity-50">Previous</span>
                )}
                {submissions.page < submissions.totalPages ? (
                  <Link
                    href={buildAdminPageHref(submissions.page + 1)}
                    className="text-brand-bronze underline underline-offset-4"
                  >
                    Next
                  </Link>
                ) : (
                  <span className="opacity-50">Next</span>
                )}
              </div>
            </div>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
