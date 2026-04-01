"use client";

import Link from "next/link";
import { useState } from "react";

export function ResetPasswordForm({
  email,
  token,
}: {
  email?: string;
  token?: string;
}) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (!email || !token) {
      setError("This password reset link is incomplete.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token, password }),
    });

    const payload = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Unable to reset your password.");
      return;
    }

    setMessage(payload.message ?? "Your password has been reset.");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="reset-password" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          New Password
        </label>
        <input
          id="reset-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="reset-confirm-password" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Confirm Password
        </label>
        <input
          id="reset-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
          className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="text-sm text-emerald-700">
          {message}{" "}
          <Link href="/account/login" className="underline underline-offset-4">
            Sign in
          </Link>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-none bg-brand-bronze px-5 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand-bronze/90 disabled:opacity-60"
      >
        {loading ? "Resetting..." : "Reset password"}
      </button>
    </form>
  );
}
