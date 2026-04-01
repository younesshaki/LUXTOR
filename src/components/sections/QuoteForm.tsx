"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export function QuoteForm() {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-xs uppercase tracking-wider text-muted-foreground mb-2"
          >
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
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
            className="rounded-none border-brand-sand/40 focus:border-brand-bronze h-12"
          />
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
            name="service"
            className="flex h-12 w-full border border-brand-sand/40 bg-transparent px-3 py-1 text-sm transition-colors focus-visible:outline-none focus-visible:border-brand-bronze disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">Select a service</option>
            <option value="curtains">Custom Curtains</option>
            <option value="blinds">Blinds</option>
            <option value="sheers">Sheers & Voiles</option>
            <option value="awnings">Awnings</option>
            <option value="pergolas">Pergolas</option>
            <option value="accessories">Accessories</option>
            <option value="domotics">Smart Home Control</option>
            <option value="decor">Home Decor</option>
            <option value="consultation">Design Consultation</option>
            <option value="other">Other</option>
          </select>
        </div>
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
          placeholder="Describe your space, your style preferences, and what you're looking for..."
          className="rounded-none border-brand-sand/40 focus:border-brand-bronze resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto bg-brand-bronze hover:bg-brand-bronze/90 text-white rounded-none uppercase tracking-wider text-xs h-13 px-10"
      >
        Send Request
        <Send className="ml-2 h-4 w-4" />
      </Button>

      <p className="text-xs text-muted-foreground">
        We typically respond within 24 hours. Your information is kept private and
        never shared.
      </p>
    </form>
  );
}
