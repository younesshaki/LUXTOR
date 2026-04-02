import Link from "next/link";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthCard } from "@/components/account/AuthCard";
import { verifyUserEmail } from "@/lib/services/users";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const params = await searchParams;
  let title = "Verification failed";
  let description =
    "This verification link is invalid or has already expired. You can create a new account or contact LUXTOR for help.";

  if (params.email && params.token) {
    try {
      await verifyUserEmail({
        email: params.email,
        token: params.token,
      });
      title = "Email verified";
      description = "Your account is now active and your historical website submissions have been linked where possible.";
    } catch (error) {
      description =
        error instanceof Error
          ? error.message
          : "This verification link is invalid or has already expired.";
    }
  }

  return (
    <Section className="pt-36 md:pt-44 pb-16" variant="cream">
      <Container>
        <AuthCard title={title} description={description}>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/account/login" className="text-brand-bronze underline underline-offset-4">
              Go to sign in
            </Link>
            <Link href="/quote" className="text-brand-bronze underline underline-offset-4">
              Request a quote
            </Link>
          </div>
        </AuthCard>
      </Container>
    </Section>
  );
}
