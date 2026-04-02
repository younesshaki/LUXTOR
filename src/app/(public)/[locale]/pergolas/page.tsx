import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const pergolas = [
  { src: "/images/pergolas/pergola-1.jpg", alt: "Coastal designer pergola with open white slats" },
  { src: "/images/pergolas/pergola-2.jpg", alt: "Modern bioclimatic pergola with motorized louvres" },
  { src: "/images/pergolas/pergola-3.jpg", alt: "Minimal white pergola attached to a luxury home" },
  { src: "/images/pergolas/pergola-4.jpg", alt: "Architectural pergola structure near the shoreline" },
  { src: "/images/pergolas/pergola-5.jpg", alt: "Curved pergola design overlooking the sea" },
  { src: "/images/pergolas/pergola-6.jpg", alt: "Premium pergola walkway with sculptural shadow lines" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "pergolas");
}

export default async function PergolaPage() {
  const t = await getTranslations("pergolas");

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
            {pergolas.map((pergola, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={pergola.src}
                  alt={pergola.alt}
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
