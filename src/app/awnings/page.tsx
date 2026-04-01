import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Outdoor Awnings",
  description:
    "Premium retractable and fixed awnings from LUXTOR. Extend your living space with motorized outdoor awnings designed for Australian weather.",
};

const awnings = [
  { src: "/images/awnings/awning-1.jpg", alt: "Premium Folding Arm Awning" },
  { src: "/images/awnings/awning-2.webp", alt: "Bestseller Motorized Awning" },
  { src: "/images/awnings/awning-3.jpg", alt: "Folding Arm Awnings Collection" },
  { src: "/images/awnings/awning-4.webp", alt: "Graber Sunsetter Awnings" },
  { src: "/images/awnings/awning-5.webp", alt: "Ozrite Retractable Awning" },
  { src: "/images/awnings/awning-6.jpg", alt: "System 2000 Awnings Benefits" },
];

export default function AwningsPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Outdoor Solutions"
            title="Premium Awnings"
            description="Transform your outdoor space with our range of retractable and fixed awnings. Motorized options available for ultimate convenience."
          />
        </Container>
      </Section>

      {/* Awnings grid */}
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
