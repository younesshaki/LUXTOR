export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  mega?: {
    heading: string;
    links: Array<{ label: string; href: string }>;
  };
}

export const navItems: NavItem[] = [
  {
    label: "New In",
    href: "/collections#new",
  },
  {
    label: "Private Sale",
    href: "/sale",
    badge: "Members Only",
  },
  {
    label: "Blinds",
    href: "/collections#blinds",
  },
  {
    label: "Curtains",
    href: "/collections#curtains",
  },
  {
    label: "Awnings",
    href: "/awnings",
  },
  {
    label: "Pergolas",
    href: "/pergolas",
  },
  {
    label: "Accessories",
    href: "/accessories",
  },
  {
    label: "Domotics",
    href: "/domotics",
  },
  {
    label: "Inspiration",
    href: "/inspiration",
  },
  {
    label: "Sale",
    href: "/sale",
    badge: "Sale",
  },
];

export const footerExplore = [
  { label: "New Collections", href: "/collections#new" },
  { label: "Shop All Products", href: "/collections" },
  { label: "Featured Designs", href: "/collections#featured" },
  { label: "Clearance Sale", href: "/sale" },
];

export const footerCustomerService = [
  { label: "Measurements Guide", href: "/guides/measurements" },
  { label: "Installation Support", href: "/support/installation" },
  { label: "Care & Maintenance", href: "/guides/care" },
  { label: "Return Policy", href: "/support/returns" },
];

export const footerHelp = [
  { label: "Contact Us", href: "/contact" },
  { label: "Find a Showroom", href: "/showrooms" },
  { label: "Request a Quote", href: "/quote" },
  { label: "FAQs", href: "/faqs" },
];

export const contactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@luxtor.com",
  address: "123 Design Avenue, Suite 100",
  city: "Los Angeles, CA 90001",
  hours: "Mon - Sat: 9:00 AM - 6:00 PM",
} as const;

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Facebook", href: "#" },
] as const;
