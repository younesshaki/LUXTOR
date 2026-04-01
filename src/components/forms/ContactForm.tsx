"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { CheckCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { serviceOptions } from "@/data/services";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { useLeadSubmission } from "@/components/forms/useLeadSubmission";

export function ContactForm() {
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

  const handleTokenChange = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

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
        type: "contact",
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        suburb: formData.suburb,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
        sourcePage: "/contact",
        sourceVariant: "contact-page",
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
      <div className="rounded-sm border border-brand-sand/20 bg-white p-8 text-center shadow-sm">
        <CheckCircle className="mx-auto mb-4 h-12 w-12 text-brand-bronze" />
        <h3 className="font-heading text-2xl text-brand-black">Message received</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{result.message}</p>
        {result.suggestAccountCreation ? (
          <p className="mt-4 text-sm text-brand-charcoal">
            Want to keep track of your requests?{" "}
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
    <form className="space-y-6 rounded-sm border border-brand-sand/20 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-full-name" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Full Name
          </label>
          <Input
            id="contact-full-name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="h-12 rounded-none border-brand-sand/40 focus:border-brand-bronze"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Email Address
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
            className="h-12 rounded-none border-brand-sand/40 focus:border-brand-bronze"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Phone Number
          </label>
          <Input
            id="contact-phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="(555) 123-4567"
            className="h-12 rounded-none border-brand-sand/40 focus:border-brand-bronze"
          />
        </div>
        <div>
          <label htmlFor="contact-suburb" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
            Suburb / Area
          </label>
          <Input
            id="contact-suburb"
            name="suburb"
            value={formData.suburb}
            onChange={handleChange}
            placeholder="Your suburb"
            className="h-12 rounded-none border-brand-sand/40 focus:border-brand-bronze"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-service" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Service Interested In
        </label>
        <select
          id="contact-service"
          name="serviceInterest"
          value={formData.serviceInterest}
          onChange={handleChange}
          className="flex h-12 w-full rounded-none border border-brand-sand/40 bg-transparent px-3 py-1 text-sm transition-colors focus-visible:border-brand-bronze focus-visible:outline-none"
        >
          <option value="">General enquiry</option>
          {serviceOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="contact-message" className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Message
        </label>
        <Textarea
          id="contact-message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          required
          placeholder="Tell us how we can help..."
          className="resize-none rounded-none border-brand-sand/40 focus:border-brand-bronze"
        />
      </div>

      <TurnstileField onTokenChange={handleTokenChange} />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="w-full bg-brand-bronze text-white hover:bg-brand-bronze/90 sm:w-auto"
      >
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
