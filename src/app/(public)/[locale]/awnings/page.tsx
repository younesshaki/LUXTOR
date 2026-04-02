import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const awnings = [
  { src: "/images/awnings/awning-1.jpg", alt: "Premium Folding Arm Awning" },
  { src: "/images/awnings/awning-2.webp", alt: "Bestseller Motorized Awning" },
  { src: "/images/awnings/awning-3.jpg", alt: "Folding Arm Awnings Collection" },
  { src: "/images/awnings/awning-4.webp", alt: "Graber Sunsetter Awnings" },
  { src: "/images/awnings/awning-5.webp", alt: "Ozrite Retractable Awning" },
  { src: "/images/awnings/awning-6.jpg", alt: "System 2000 Awnings Benefits" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "awnings");
}

export default async function AwningsPage() {
  const t = await getTranslations("awnings");

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {awnings.map((awning, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={awning.src}
                  alt={awning.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
