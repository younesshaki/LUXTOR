import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { Lato, Cormorant_Garamond, Playfair_Display, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { routing, type Locale } from "@/i18n/routing";
import "../../globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });

  return {
    title: {
      default: t("title"),
      template: "%s | LUXTOR",
    },
    description: t("description"),
    keywords: [
      "curtains",
      "blinds",
      "home decor",
      "interior design",
      "custom curtains",
      "window treatments",
      "luxury blinds",
      "bespoke curtains",
    ],
    openGraph: {
      type: "website" as const,
      locale: locale === "ar" ? "ar_SA" : locale === "fr" ? "fr_FR" : "en_US",
      siteName: "LUXTOR",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale });
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${lato.variable} ${cormorant.variable} ${playfair.variable} ${locale === "ar" ? ibmPlexArabic.variable : ""} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SmoothScroll>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer locale={locale} />
            </SmoothScroll>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
