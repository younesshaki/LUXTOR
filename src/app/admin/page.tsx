import Link from "next/link";

import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/session";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export default async function AdminPage() {
  await requireAdmin();

  const [total, pending, queued, synced] = await Promise.all([
    prisma.leadSubmission.count(),
    prisma.leadSubmission.count({ where: { status: "submitted" } }),
    prisma.leadSubmission.count({ where: { odooSyncStatus: "queued" } }),
    prisma.leadSubmission.count({ where: { odooSyncStatus: "synced" } }),
  ]);

  const stats = [
    { label: "Total submissions", value: total },
    { label: "Awaiting review", value: pending },
    { label: "Queued for Odoo", value: queued },
    { label: "Synced to Odoo", value: synced },
  ];

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-14" variant="cream">
        <Container>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-bronze">Admin</p>
          <h1 className="mt-4 font-heading text-4xl text-brand-black">LUXTOR Operations Console</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Monitor website intake, keep submission statuses current, and prepare the data layer for the future Odoo 19 handoff.
          </p>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</p>
                <p className="mt-4 font-heading text-5xl text-brand-black">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-sm border border-brand-sand/20 bg-white p-6 shadow-sm">
            <h2 className="font-heading text-2xl text-brand-black">Next actions</h2>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/admin/submissions" className="text-sm text-brand-bronze underline underline-offset-4">
                Review all submissions
              </Link>
              <Link href="/account" className="text-sm text-brand-bronze underline underline-offset-4">
                Open customer portal view
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
