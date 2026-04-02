import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const accessories = [
  { src: "/images/accessories/accessory-1.jpg", alt: "Decorative curtain tieback detail in a refined interior" },
  { src: "/images/accessories/accessory-2.jpg", alt: "Soft drapery fabric gathered with a minimalist tie" },
  { src: "/images/accessories/accessory-3.jpg", alt: "Layered curtain panels framing a bright interior opening" },
  { src: "/images/accessories/accessory-4.jpg", alt: "Luxury curtain fabric and trim detail in warm neutral tones" },
  { src: "/images/accessories/accessory-5.jpg", alt: "Elegant interior vignette with styled home decor accessories" },
  { src: "/images/accessories/accessory-6.jpg", alt: "Window styling accessories arranged in a polished room setting" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "accessories");
}

export default async function AccessoriesPage() {
  const t = await getTranslations("accessories");

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
            {accessories.map((accessory, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={accessory.src}
                  alt={accessory.alt}
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
