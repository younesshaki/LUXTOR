import { NextRequest, NextResponse } from "next/server";

import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import { hasLocalePrefix, isInternalPath, localizePublicPath, stripLocalePrefix } from "@/lib/i18n/pathnames";

const COOKIE_NAME = "NEXT_LOCALE";
const PUBLIC_ACCOUNT_PATHS = new Set([
  "/account/login",
  "/account/register",
  "/account/verify",
  "/account/forgot-password",
  "/account/reset-password",
]);
const SESSION_COOKIE_NAMES = [
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "authjs.session-token",
  "__Secure-authjs.session-token",
] as const;

function detectLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(COOKIE_NAME)?.value;

  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }

  const acceptLanguage = request.headers.get("accept-language");

  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((language) => language.split(";")[0]?.trim().split("-")[0])
      .find((language): language is Locale => locales.includes(language as Locale));

    if (preferred) {
      return preferred;
    }
  }

  return defaultLocale;
}

function hasSessionToken(request: NextRequest) {
  return SESSION_COOKIE_NAMES.some((name) => Boolean(request.cookies.get(name)?.value));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const normalizedPath = stripLocalePrefix(pathname);

  if (pathname !== normalizedPath && isInternalPath(normalizedPath)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = normalizedPath;
    return NextResponse.redirect(redirectUrl);
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  if (isInternalPath(pathname)) {
    if (PUBLIC_ACCOUNT_PATHS.has(pathname)) {
      return NextResponse.next();
    }

    if (!hasSessionToken(request)) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/account/login";
      redirectUrl.searchParams.set(
        "callbackUrl",
        `${request.nextUrl.pathname}${request.nextUrl.search}`
      );
      return NextResponse.redirect(redirectUrl);
    }

    return NextResponse.next();
  }

  if (hasLocalePrefix(pathname)) {
    return NextResponse.next();
  }

  const locale = detectLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = localizePublicPath(pathname, locale);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)"],
};
