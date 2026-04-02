import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const domotics = [
  { src: "/images/domotics/domotics-1.jpg", alt: "Smart home control panel integrated into a modern wall" },
  { src: "/images/domotics/domotics-2.jpg", alt: "Tablet interface controlling connected devices in a living room" },
  { src: "/images/domotics/domotics-3.jpg", alt: "Voice and app-enabled smart lighting and blinds setup" },
  { src: "/images/domotics/domotics-4.jpg", alt: "Minimal smart home dashboard in a premium residential interior" },
  { src: "/images/domotics/domotics-5.jpg", alt: "Modern automation scene with connected comfort systems" },
  { src: "/images/domotics/domotics-6.jpg", alt: "Mobile-first home automation controls for window treatments" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "domotics");
}

export default async function DomoticsPage() {
  const t = await getTranslations("domotics");

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
            {domotics.map((system, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={system.src}
                  alt={system.alt}
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
