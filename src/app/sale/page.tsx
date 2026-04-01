import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Last Chance Deals",
  description:
    "LUXTOR private sale. Members only exclusive deals. Up to 50% off premium curtains, blinds, and home decor.",
};

const saleItems = [
  {
    src: "/images/EMILE_0139_WEB.webp",
    alt: "Discounted designer curtain panel in a warm neutral setting",
    title: "Designer Curtains",
  },
  {
    src: "/images/blinds/blind-5.jpg",
    alt: "Sale blinds collection with soft daylight filtering through slats",
    title: "Modern Blinds",
  },
  {
    src: "/images/awnings/awning-2.webp",
    alt: "Retractable awning featured in the seasonal sale collection",
    title: "Outdoor Awnings",
  },
  {
    src: "/images/pergolas/pergola-2.jpg",
    alt: "Pergola promotion featuring a premium louvre outdoor structure",
    title: "Pergola Systems",
  },
  {
    src: "/images/accessories/accessory-5.jpg",
    alt: "Decor accessories styled as part of the private sale",
    title: "Home Accessories",
  },
  {
    src: "/images/inspiration/inspiration-6.jpg",
    alt: "Soft sheer drapery featured in the last chance collection",
    title: "Sheers & Voiles",
  },
];

export default function SalePage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16 bg-red-50">
        <Container>
          <SectionHeading
            label="Exclusive Members Only"
            title="Last Chance Deals"
            description="Premium collections at exceptional prices. Limited quantities on clearance items and seasonal sales."
          />
        </Container>
      </Section>

      {/* Sale items grid */}
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
                  Sale
                </div>
                <div className="absolute bottom-5 left-5 right-5">
                  <p className="text-white text-lg font-heading">{item.title}</p>
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
