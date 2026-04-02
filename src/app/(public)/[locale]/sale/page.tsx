import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

const saleItems = [
  {
    src: "/images/EMILE_0139_WEB.webp",
    alt: "Discounted designer curtain panel in a warm neutral setting",
    titleKey: "items.designerCurtains",
  },
  {
    src: "/images/blinds/blind-5.jpg",
    alt: "Sale blinds collection with soft daylight filtering through slats",
    titleKey: "items.modernBlinds",
  },
  {
    src: "/images/awnings/awning-2.webp",
    alt: "Retractable awning featured in the seasonal sale collection",
    titleKey: "items.outdoorAwnings",
  },
  {
    src: "/images/pergolas/pergola-2.jpg",
    alt: "Pergola promotion featuring a premium louvre outdoor structure",
    titleKey: "items.pergolaSystems",
  },
  {
    src: "/images/accessories/accessory-5.jpg",
    alt: "Decor accessories styled as part of the private sale",
    titleKey: "items.homeAccessories",
  },
  {
    src: "/images/inspiration/inspiration-6.jpg",
    alt: "Soft sheer drapery featured in the last chance collection",
    titleKey: "items.sheersVoiles",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "sale");
}

export default async function SalePage() {
  const t = await getTranslations();

  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16 bg-red-50">
        <Container>
          <SectionHeading
            label={t("sale.heading.label")}
            title={t("sale.heading.title")}
            description={t("sale.heading.description")}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {saleItems.map((item, i) => (
              <div
                key={i}
                className="aspect-[3/4] relative rounded-sm overflow-hidden bg-red-50 border border-red-200"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/65 via-brand-black/10 to-transparent" />
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full">
                  {t("common.saleBadge")}
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-heading">{t(`sale.${item.titleKey}`)}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
