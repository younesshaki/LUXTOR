import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AuthCard } from "@/components/account/AuthCard";
import { RegisterForm } from "@/components/account/RegisterForm";

export default function RegisterPage() {
  return (
    <Section className="pt-36 md:pt-44 pb-16" variant="cream">
      <Container>
        <AuthCard
          title="Create an account"
          description="Create an optional LUXTOR account to keep future quote requests and contact history tied to one verified email."
        >
          <RegisterForm />
        </AuthCard>
      </Container>
    </Section>
  );
}
