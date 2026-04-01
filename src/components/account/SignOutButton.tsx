"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm text-brand-bronze underline underline-offset-4 transition-colors hover:text-brand-charcoal"
    >
      Sign out
    </button>
  );
}
