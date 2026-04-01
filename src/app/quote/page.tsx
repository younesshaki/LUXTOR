import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteForm } from "@/components/sections/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Request a free, no-obligation quote for custom curtains, blinds, and home decor from LUXTOR. We'll get back to you within 24 hours.",
};

export default function QuotePage() {
  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Free Quote"
            title="Request a Quote"
            description="Tell us about your project and we'll get back to you within 24 hours with a personalized quote. No obligation, no pressure."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="max-w-2xl mx-auto">
            <QuoteForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
