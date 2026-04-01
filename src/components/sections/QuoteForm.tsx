"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Send } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { TurnstileField } from "@/components/forms/TurnstileField";
import { useLeadSubmission } from "@/components/forms/useLeadSubmission";
import { serviceOptions } from "@/data/services";

export function QuoteForm() {
  const { loading, error, result, setError, submitSubmission } = useLeadSubmission();
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    suburb: "",
    serviceInterest: "",
    message: "",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await submitSubmission({
        type: "quote",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        suburb: formData.suburb,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
        sourcePage: "/quote",
        sourceVariant: "quote-page",
        turnstileToken,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        suburb: "",
        serviceInterest: "",
        message: "",
      });
      setTurnstileToken("");
    } catch {
      return;
    }
  }

  if (result) {
    return (
      <div className="rounded-none border border-brand-sand/30 bg-brand-cream/40 p-10 text-center">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-brand-bronze" />
        <h3 className="font-heading text-3xl text-brand-black">Request received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.message}</p>
        {result.suggestAccountCreation ? (
          <p className="mt-4 text-sm text-brand-charcoal">
            Want to track your requests?{" "}
            <Link href="/account/register" className="text-brand-bronze underline underline-offset-4">
              Create an account
            </Link>
            .
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
          >
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            placeholder="Your name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="rounded-none border-brand-sand/40 focus:border-brand-bronze h-12"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
          >
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="rounded-none border-brand-sand/40 focus:border-brand-bronze h-12"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
          >
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className="rounded-none border-brand-sand/40 focus:border-brand-bronze h-12"
          />
        </div>
        <div>
          <label
            htmlFor="suburb"
            className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
          >
            Suburb / Area
          </label>
          <Input
            id="suburb"
            name="suburb"
            placeholder="Your suburb"
            value={formData.suburb}
            onChange={handleChange}
            required
            className="rounded-none border-brand-sand/40 focus:border-brand-bronze h-12"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="service"
          className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
        >
          Service Interested In
        </label>
          <select
            id="service"
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            required
            className="flex h-12 w-full border border-brand-sand/40 bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:border-brand-bronze disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a service</option>
            {serviceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
        >
          Tell Us About Your Project
        </label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your space, your style preferences, and what you're looking for..."
          className="rounded-none border-brand-sand/40 focus:border-brand-bronze resize-none"
        />
      </div>

      <TurnstileField onTokenChange={setTurnstileToken} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full sm:w-auto bg-brand-bronze hover:bg-brand-bronze/90 text-white rounded-none uppercase tracking-wider text-xs h-13 px-10"
      >
        {loading ? "Sending..." : "Send Request"}
        <Send className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-muted-foreground">
        We typically respond within 24 hours. Your information is kept private and
        never shared.
      </p>
    </form>
  );
}
