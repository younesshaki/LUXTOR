import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthCard } from "@/components/account/AuthCard";
import { ForgotPasswordForm } from "@/components/account/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <Section className="pt-36 md:pt-44 pb-16" variant="cream">
      <Container>
        <AuthCard
          title="Reset your password"
          description="Enter your account email and we’ll send you a secure reset link."
        >
          <ForgotPasswordForm />
        </AuthCard>
      </Container>
    </Section>
  );
}
