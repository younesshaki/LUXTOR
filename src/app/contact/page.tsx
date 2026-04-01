import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { contactInfo } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LUXTOR. Visit our showroom, call us, or send a message. We'd love to help transform your space.",
};

const contactDetails = [
  {
    icon: MapPin,
    label: "Visit Our Showroom",
    value: `${contactInfo.address}\n${contactInfo.city}`,
  },
  {
    icon: Phone,
    label: "Call Us",
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
  },
  {
    icon: Mail,
    label: "Email Us",
    value: contactInfo.email,
    href: `mailto:${contactInfo.email}`,
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: contactInfo.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section className="pt-36 md:pt-44 pb-12 md:pb-16" variant="cream">
        <Container>
          <SectionHeading
            label="Get in Touch"
            title="We'd Love to Hear From You"
            description="Whether you have a question about our collections or want to schedule a consultation, our team is here to help."
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-brand-black mb-8">
                Contact Information
              </h3>
              <div className="space-y-6">
                {contactDetails.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-cream border border-brand-sand/30 shrink-0">
                        <Icon className="h-4 w-4 text-brand-bronze" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">
                          {item.label}
                        </p>
                        <p className="text-brand-charcoal whitespace-pre-line">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      className="block hover:opacity-75 transition-opacity"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="aspect-square lg:aspect-auto rounded-sm bg-brand-cream/50 border border-brand-sand/20 flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Map / Contact Form</p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
