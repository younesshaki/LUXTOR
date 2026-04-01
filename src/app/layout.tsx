import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "LUXTOR | Premium Curtains, Blinds & Home Decor",
    template: "%s | LUXTOR",
  },
  description:
    "Transform your space with LUXTOR's premium curtains, blinds, and bespoke home decor. Expert craftsmanship, luxurious fabrics, and personalized design consultations.",
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
    type: "website",
    locale: "en_US",
    siteName: "LUXTOR",
    title: "LUXTOR | Premium Curtains, Blinds & Home Decor",
    description:
      "Transform your space with LUXTOR's premium curtains, blinds, and bespoke home decor.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
