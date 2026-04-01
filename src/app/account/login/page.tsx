import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthCard } from "@/components/account/AuthCard";
import { LoginForm } from "@/components/account/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;

  return (
    <Section className="pt-36 md:pt-44 pb-16" variant="cream">
      <Container>
        <AuthCard
          title="Sign in"
          description="Access your LUXTOR account to review quote requests and keep your details in one place."
        >
          <LoginForm callbackUrl={params.callbackUrl ?? "/account"} />
        </AuthCard>
      </Container>
    </Section>
  );
}
