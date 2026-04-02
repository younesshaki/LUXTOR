import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const inspirationGallery = [
  { src: "/images/inspiration/inspiration-1.jpg", alt: "Earthy modern living room with layered textures and warm tones" },
  { src: "/images/inspiration/inspiration-2.jpg", alt: "Minimal bedroom styling with soft curtain light and natural materials" },
  { src: "/images/inspiration/inspiration-3.jpg", alt: "Pattern-rich bedroom composition with statement drapery" },
  { src: "/images/inspiration/inspiration-4.jpg", alt: "Luxury lounge with sculptural furniture and rich finishing details" },
  { src: "/images/inspiration/inspiration-5.jpg", alt: "Refined interior palette with modern furniture and soft light" },
  { src: "/images/inspiration/inspiration-6.jpg", alt: "Bright room scene framed by airy curtains and architectural lines" },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "inspiration");
}

export default async function InspirationPage() {
  const t = await getTranslations("inspiration");

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
            {inspirationGallery.map((room, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden border border-brand-sand/20 bg-brand-cream/50"
              >
                <Image
                  src={room.src}
                  alt={room.alt}
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
