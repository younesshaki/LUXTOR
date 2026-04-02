import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const aboutValueKeys = ["qualityFirst", "designLed", "clientFocused"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "about");
}

export default async function AboutPage() {
  const t = await getTranslations("about");

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {aboutValueKeys.map((key) => (
              <div key={key}>
                <h3 className="font-heading text-2xl text-brand-black mb-4">
                  {t(`values.${key}.title`)}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {t(`values.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
