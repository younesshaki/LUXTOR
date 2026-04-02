import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const publicMetadataPages = [
  "about",
  "collections",
  "awnings",
  "pergolas",
  "accessories",
  "domotics",
  "inspiration",
  "sale",
  "quote",
  "contact",
] as const;

export type PublicMetadataPage = (typeof publicMetadataPages)[number];

export async function getPublicPageMetadata(
  locale: string,
  page: PublicMetadataPage
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t(`${page}.title`),
    description: t(`${page}.description`),
  };
}
