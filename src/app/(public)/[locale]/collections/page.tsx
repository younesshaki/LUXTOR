import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const blinds = [
  { src: "/images/blinds/blind-1.jpg", alt: "Dark-toned venetian blinds across a wide window" },
  { src: "/images/blinds/blind-2.jpg", alt: "Minimal white blinds with tropical greenery in front" },
  { src: "/images/blinds/blind-3.jpg", alt: "Architectural close-up of horizontal blind slats" },
  { src: "/images/blinds/blind-4.jpg", alt: "Clean modern interior with white window blinds" },
  { src: "/images/blinds/blind-5.jpg", alt: "Soft daylight filtering through white blinds" },
  { src: "/images/blinds/blind-6.jpg", alt: "Elegant shadow pattern cast by blinds onto a wall" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "collections");
}

export default async function CollectionsPage() {
  const t = await getTranslations("collections");

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

      <Section id="blinds">
        <Container>
          <SectionHeading
            label={t("blinds.label")}
            title={t("blinds.title")}
            description={t("blinds.description")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blinds.map((blind, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={blind.src}
                  alt={blind.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
