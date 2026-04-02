import type { Metadata } from "next";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { contactInfo } from "@/data/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPublicPageMetadata } from "@/lib/i18n/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return getPublicPageMetadata(locale, "contact");
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const tHeader = await getTranslations("header");
  const contactDetails = [
    {
      icon: MapPin,
      label: t("visitShowroom"),
      value: `${contactInfo.address}\n${contactInfo.city}`,
    },
    {
      icon: Phone,
      label: t("callUs"),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
    },
    {
      icon: Mail,
      label: t("emailUs"),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Clock,
      label: t("businessHours"),
      value: tHeader("hours"),
    },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="font-heading text-2xl md:text-3xl text-brand-black mb-8">
                {t("contactInformation")}
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

            <ContactForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
