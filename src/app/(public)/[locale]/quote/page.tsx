import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "quote");
}

export default async function QuotePage() {
  const t = await getTranslations("quote");

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label={t("heading.label")}
            title={t("heading.title")}
            description={t("heading.description")}
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
