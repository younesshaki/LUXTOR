import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { QuoteCTA } from "@/components/sections/QuoteCTA";

export const metadata: Metadata = {
  title: "Last Chance Deals",
  description:
    "LUXTOR private sale. Members only exclusive deals. Up to 50% off premium curtains, blinds, and home decor.",
};

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

      {/* Placeholder for sale items grid */}
      <Section>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-sm bg-red-50 border border-red-200 flex flex-col items-center justify-center"
              >
                <p className="text-sm text-red-600 font-medium mb-2">
                  SALE ITEM
                </p>
                <p className="text-sm text-muted-foreground">Item {i + 1}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <QuoteCTA />
    </>
  );
}
