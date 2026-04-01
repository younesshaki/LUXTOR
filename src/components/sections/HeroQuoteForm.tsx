"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { serviceOptions } from "@/data/services";
import { TurnstileField } from "@/components/forms/TurnstileField";
import { useLeadSubmission } from "@/components/forms/useLeadSubmission";

interface HeroQuoteFormProps {
  variant?: "panel" | "section";
}

export function HeroQuoteForm({ variant = "section" }: HeroQuoteFormProps) {
  const { loading, error, result, setError, submitSubmission } = useLeadSubmission();
  const [turnstileToken, setTurnstileToken] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    suburb: "",
    phone: "",
    serviceInterest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      await submitSubmission({
        type: "quote",
        fullName: formData.fullName,
        email: formData.email,
        suburb: formData.suburb,
        phone: formData.phone,
        serviceInterest: formData.serviceInterest,
        message: formData.message,
        sourcePage: "/",
        sourceVariant: isPanel ? "hero-panel" : "hero-section",
        turnstileToken,
      });

      setFormData({
        fullName: "",
        email: "",
        suburb: "",
        phone: "",
        serviceInterest: "",
        message: "",
      });
      setTurnstileToken("");
    } catch {
      return;
    }
  };

  const isPanel = variant === "panel";

  return (
    <div
      className={cn(
        isPanel
          ? "bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-8"
          : "bg-brand-cream py-16 md:py-20"
      )}
    >
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3
              className={cn(
                "font-heading mb-6",
                isPanel
                  ? "text-xl text-white"
                  : "text-4xl sm:text-5xl text-brand-charcoal max-w-2xl"
              )}
            >
              Book a <span className="font-bold">FREE</span> MEASURE & QUOTE
            </h3>

            <p
              className={cn(
                "text-sm mb-6",
                isPanel
                  ? "text-white/70"
                  : "text-brand-charcoal/70 text-lg max-w-lg"
              )}
            >
              Get expert advice tailored to your space. No obligation, completely
              free.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className={isPanel ? "" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Your Name *"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-0",
                    isPanel
                      ? "bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-brand-bronze"
                      : "bg-white border border-brand-sand/20 text-brand-charcoal placeholder-brand-charcoal/40 focus:ring-brand-bronze"
                  )}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-0",
                    isPanel
                      ? "bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-brand-bronze"
                      : "bg-white border border-brand-sand/20 text-brand-charcoal placeholder-brand-charcoal/40 focus:ring-brand-bronze"
                  )}
                />
              </div>

              <div
                className={
                  isPanel ? "" : "grid grid-cols-1 md:grid-cols-2 gap-4"
                }
              >
                <input
                  type="text"
                  name="suburb"
                  placeholder="Suburb / Area *"
                  value={formData.suburb}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-0",
                    isPanel
                      ? "bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-brand-bronze"
                      : "bg-white border border-brand-sand/20 text-brand-charcoal placeholder-brand-charcoal/40 focus:ring-brand-bronze"
                  )}
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Contact Number *"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-0",
                    isPanel
                      ? "bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-brand-bronze"
                      : "bg-white border border-brand-sand/20 text-brand-charcoal placeholder-brand-charcoal/40 focus:ring-brand-bronze"
                  )}
                />
              </div>

              <select
                name="serviceInterest"
                value={formData.serviceInterest}
                onChange={handleChange}
                required
                className={cn(
                  "flex h-12 w-full px-4 py-3 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-offset-0",
                  isPanel
                    ? "bg-white/10 border border-white/20 text-white focus:ring-brand-bronze"
                    : "bg-white border border-brand-sand/20 text-brand-charcoal focus:ring-brand-bronze"
                )}
              >
                <option value="">Select a service *</option>
                {serviceOptions.map((option) => (
                  <option key={option.value} value={option.value} className="text-brand-charcoal">
                    {option.label}
                  </option>
                ))}
              </select>

              {!isPanel && (
                <textarea
                  name="message"
                  placeholder="Tell us about your space and style preferences..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-sm text-sm bg-white border border-brand-sand/20 text-brand-charcoal placeholder-brand-charcoal/40 focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-offset-0"
                />
              )}

              <TurnstileField onTokenChange={setTurnstileToken} />

              {error ? (
                <p className={cn("text-sm", isPanel ? "text-red-200" : "text-red-600")}>{error}</p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className={cn(
                  "w-full uppercase tracking-wider text-xs py-3 rounded-sm transition-colors font-medium",
                  isPanel
                    ? "bg-brand-bronze hover:bg-brand-bronze/90 text-white disabled:opacity-50"
                    : "bg-brand-bronze hover:bg-brand-bronze/90 text-white disabled:opacity-50"
                )}
              >
                {loading ? "Submitting..." : "Get Free Quote"}
              </button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center text-center"
          >
            <CheckCircle
              className={cn(
                "h-12 w-12 mb-4",
                isPanel ? "text-white" : "text-brand-bronze"
              )}
            />
            <h4
              className={cn(
                "font-heading text-xl mb-2",
                isPanel ? "text-white" : "text-brand-charcoal"
              )}
            >
              Thank You!
            </h4>
            <p
              className={cn(
                "text-sm",
                isPanel ? "text-white/70" : "text-brand-charcoal/70"
              )}
            >
              We&apos;ll be in touch soon with your free quote.
            </p>
            {result.suggestAccountCreation ? (
              <p className={cn("mt-4 text-sm", isPanel ? "text-white/80" : "text-brand-charcoal/80")}>
                Want to track your requests?{" "}
                <Link href="/account/register" className="underline underline-offset-4">
                  Create an account
                </Link>
                .
              </p>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
