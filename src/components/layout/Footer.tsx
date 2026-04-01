import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Container } from "./Container";
import { Separator } from "@/components/ui/separator";
import { navLinks, contactInfo, socialLinks } from "@/data/navigation";

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <Container className="py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-heading text-2xl tracking-[0.2em] font-light">
                LUXTOR
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              Premium curtains, blinds, and bespoke home decor. Crafted with care,
              designed for your space.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-brand-sand mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-brand-sand transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote"
                className="text-sm text-white/60 hover:text-brand-sand transition-colors"
              >
                Request a Quote
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-brand-sand mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brand-bronze mt-0.5 shrink-0" />
                <span className="text-sm text-white/60">
                  {contactInfo.address}
                  <br />
                  {contactInfo.city}
                </span>
              </div>
              <a
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-sand transition-colors"
              >
                <Phone className="h-4 w-4 text-brand-bronze shrink-0" />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 text-sm text-white/60 hover:text-brand-sand transition-colors"
              >
                <Mail className="h-4 w-4 text-brand-bronze shrink-0" />
                {contactInfo.email}
              </a>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-brand-bronze shrink-0" />
                <span className="text-sm text-white/60">{contactInfo.hours}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-sans uppercase tracking-[0.2em] text-brand-sand mb-6">
              Follow Us
            </h4>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-brand-sand transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} LUXTOR. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white/60 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white/60 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
