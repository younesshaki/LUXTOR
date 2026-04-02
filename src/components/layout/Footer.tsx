import NextLink from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "./Container";
import { Link } from "@/i18n/navigation";
import {
  footerExplore,
  footerCustomerService,
  footerHelp,
  contactInfo,
  socialLinks,
  type FooterLink,
} from "@/data/navigation";

const ACCOUNT_PATHS = ["/account"];

function isAccountPath(href: string) {
  return ACCOUNT_PATHS.some((prefix) => href.startsWith(prefix));
}

interface FooterColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  locale: string;
}

function FooterColumn({ title, links, locale }: FooterColumnProps) {
  return (
    <div>
      <h4 className="text-[11px] font-sans uppercase tracking-[0.22em] text-brand-sand mb-4">
        {title}
      </h4>
      <nav className="flex flex-col gap-2.5">
        {links.map((link) =>
          isAccountPath(link.href) ? (
            <NextLink
              key={link.href}
              href={link.href}
              className="text-sm text-white/60 hover:text-brand-sand transition-colors leading-relaxed"
            >
              {link.label}
            </NextLink>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              locale={locale}
              className="text-sm text-white/60 hover:text-brand-sand transition-colors leading-relaxed"
            >
              {link.label}
            </Link>
          )
        )}
      </nav>
    </div>
  );
}

function resolveLinks(
  items: FooterLink[],
  t: (key: string) => string
): Array<{ label: string; href: string }> {
  return items.map((item) => ({
    label: t(item.labelKey),
    href: item.href,
  }));
}

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale });

  const exploreLinks = resolveLinks(footerExplore, t);
  const serviceLinks = resolveLinks(footerCustomerService, t);
  const helpLinks = resolveLinks(footerHelp, t);

  return (
    <footer className="bg-brand-black text-white">
      <Container className="py-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-8 md:grid-cols-12 md:gap-6">
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" locale={locale} className="inline-block mb-4">
              <span className="font-heading text-2xl tracking-[0.18em] font-light">
                LUXTOR
              </span>
            </Link>
            <p className="max-w-sm text-sm text-white/60 leading-relaxed">
              {t("footer.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-2 lg:col-span-4">
            <FooterColumn title={t("footer.explore")} links={exploreLinks} locale={locale} />
            <FooterColumn title={t("footer.service")} links={serviceLinks} locale={locale} />
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:col-span-4 md:grid-cols-1 lg:col-span-4">
            <div>
              <h4 className="text-[11px] font-sans uppercase tracking-[0.22em] text-brand-sand mb-4">
                {t("footer.help")}
              </h4>
              <nav className="flex flex-wrap gap-x-6 gap-y-2">
                {helpLinks.map((link) =>
                  isAccountPath(link.href) ? (
                    <NextLink
                      key={link.href}
                      href={link.href}
                      className="text-sm text-white/60 hover:text-brand-sand transition-colors"
                    >
                      {link.label}
                    </NextLink>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      locale={locale}
                      className="text-sm text-white/60 hover:text-brand-sand transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
            </div>

            <div>
              <h4 className="text-[11px] font-sans uppercase tracking-[0.22em] text-brand-sand mb-4">
                {t("footer.contact")}
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-brand-bronze mt-0.5 shrink-0" />
                  <span className="text-sm text-white/60 leading-relaxed">
                    {contactInfo.address}
                    <br />
                    {contactInfo.city}
                  </span>
                </div>
                <div className="grid gap-3">
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-sand transition-colors"
                  >
                    <Phone className="h-4 w-4 text-brand-bronze shrink-0" />
                    {contactInfo.phone}
                  </a>
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-sand transition-colors"
                  >
                    <Mail className="h-4 w-4 text-brand-bronze shrink-0" />
                    {contactInfo.email}
                  </a>
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-brand-bronze shrink-0" />
                    <span className="text-sm text-white/60">{t("header.hours")}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} LUXTOR. {t("common.allRightsReserved")}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="#" locale={locale} className="hover:text-white/60 transition-colors">
              {t("common.privacyPolicy")}
            </Link>
            <Link href="#" locale={locale} className="hover:text-white/60 transition-colors">
              {t("common.termsOfService")}
            </Link>
            <span className="hidden md:inline text-white/20">|</span>
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-brand-sand transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
