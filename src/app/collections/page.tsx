import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore LUXTOR's curated collections of premium curtains, blinds, sheers, and home decor accessories.",
};

const blinds = [
  { src: "/images/blinds/blind-1.jpg", alt: "Dark-toned venetian blinds across a wide window" },
  { src: "/images/blinds/blind-2.jpg", alt: "Minimal white blinds with tropical greenery in front" },
  { src: "/images/blinds/blind-3.jpg", alt: "Architectural close-up of horizontal blind slats" },
  { src: "/images/blinds/blind-4.jpg", alt: "Clean modern interior with white window blinds" },
  { src: "/images/blinds/blind-5.jpg", alt: "Soft daylight filtering through white blinds" },
  { src: "/images/blinds/blind-6.jpg", alt: "Elegant shadow pattern cast by blinds onto a wall" },
];

export default function CollectionsPage() {
  return (
    <>
      {/* Page header */}
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Our Collections"
            title="Curated With Care"
            description="Browse our range of premium window treatments and home decor, each collection thoughtfully designed to suit different styles and spaces."
          />
        </Container>
      </Section>

      <Section id="blinds">
        <Container>
          <SectionHeading
            label="Blinds"
            title="Tailored Light Control"
            description="From sleek venetians to soft-filtering modern systems, our blinds collection balances privacy, texture, and refined architectural detail."
            className="mb-12"
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
