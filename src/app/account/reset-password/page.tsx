import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthCard } from "@/components/account/AuthCard";
import { ResetPasswordForm } from "@/components/account/ResetPasswordForm";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; token?: string }>;
}) {
  const params = await searchParams;

  return (
    <Section className="pt-36 md:pt-44 pb-16" variant="cream">
      <Container>
        <AuthCard
          title="Choose a new password"
          description="Set a fresh password for your LUXTOR account."
        >
          <ResetPasswordForm email={params.email} token={params.token} />
        </AuthCard>
      </Container>
    </Section>
  );
}
