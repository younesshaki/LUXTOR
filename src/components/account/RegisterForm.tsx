"use client";

import Link from "next/link";
import { useState } from "react";

export function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    suburb: "",
    password: "",
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const payload = (await response.json()) as { message?: string; error?: string };
    setLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "We could not create your account.");
      return;
    }

    setSuccess(payload.message ?? "Account created. You can sign in right away.");
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      suburb: "",
      password: "",
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="register-full-name" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Full Name
        </label>
        <input
          id="register-full-name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="register-email" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Email
        </label>
        <input
          id="register-email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="register-phone" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Phone
          </label>
          <input
            id="register-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="register-suburb" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Suburb
          </label>
          <input
            id="register-suburb"
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
          />
        </div>
      </div>
      <div>
        <label htmlFor="register-password" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Password
        </label>
        <input
          id="register-password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="h-12 w-full rounded-none border border-brand-sand/40 px-4 text-sm focus:border-brand-bronze focus:outline-none"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {success ? <p className="text-sm text-emerald-700">{success}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-none bg-brand-bronze px-5 py-3 text-xs uppercase tracking-wider text-white transition-colors hover:bg-brand-bronze/90 disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      <p className="text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="/account/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </p>
    </form>
  );
}
