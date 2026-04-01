import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicAccountPaths = new Set([
  "/account/login",
  "/account/register",
  "/account/verify",
  "/account/forgot-password",
  "/account/reset-password",
]);

function hasSessionCookie(request: NextRequest) {
  return (
    request.cookies.has("next-auth.session-token") ||
    request.cookies.has("__Secure-next-auth.session-token")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/account/") && publicAccountPaths.has(pathname)) {
    return NextResponse.next();
  }

  if ((pathname.startsWith("/account") || pathname.startsWith("/admin")) && !hasSessionCookie(request)) {
    const loginUrl = new URL("/account/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/admin/:path*"],
};
