import { NextIntlClientProvider } from "next-intl";
import { Lato, Cormorant_Garamond, Playfair_Display } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import enMessages from "../../../messages/en.json";
import "../globals.css";

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

export const metadata = {
  title: {
    default: "LUXTOR | Premium Curtains, Blinds & Home Decor",
    template: "%s | LUXTOR",
  },
  description:
    "Transform your space with LUXTOR's premium curtains, blinds, and bespoke home decor.",
};

export default function InternalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${cormorant.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <NextIntlClientProvider locale="en" messages={enMessages}>
            <SmoothScroll>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer locale="en" />
            </SmoothScroll>
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
