export interface NavItem {
  labelKey: string;
  href: string;
  badgeKey?: string;
}

export const navItems: NavItem[] = [
  {
    labelKey: "nav.newIn",
    href: "/collections#new",
  },
  {
    labelKey: "nav.privateSale",
    href: "/sale",
    badgeKey: "common.membersOnly",
  },
  {
    labelKey: "nav.blinds",
    href: "/collections#blinds",
  },
  {
    labelKey: "nav.curtains",
    href: "/collections#curtains",
  },
  {
    labelKey: "nav.awnings",
    href: "/awnings",
  },
  {
    labelKey: "nav.pergolas",
    href: "/pergolas",
  },
  {
    labelKey: "nav.accessories",
    href: "/accessories",
  },
  {
    labelKey: "nav.domotics",
    href: "/domotics",
  },
  {
    labelKey: "nav.inspiration",
    href: "/inspiration",
  },
  {
    labelKey: "nav.sale",
    href: "/sale",
    badgeKey: "common.saleBadge",
  },
];

export interface FooterLink {
  labelKey: string;
  href: string;
}

export const footerExplore: FooterLink[] = [
  { labelKey: "footer.newCollections", href: "/collections#new" },
  { labelKey: "footer.shopAllProducts", href: "/collections" },
  { labelKey: "footer.featuredDesigns", href: "/collections#featured" },
  { labelKey: "footer.clearanceSale", href: "/sale" },
];

export const footerCustomerService: FooterLink[] = [
  { labelKey: "footer.measurementsGuide", href: "/guides/measurements" },
  { labelKey: "footer.installationSupport", href: "/support/installation" },
  { labelKey: "footer.careMaintenance", href: "/guides/care" },
  { labelKey: "footer.returnPolicy", href: "/support/returns" },
];

export const footerHelp: FooterLink[] = [
  { labelKey: "footer.contactUs", href: "/contact" },
  { labelKey: "footer.findShowroom", href: "/showrooms" },
  { labelKey: "footer.requestQuote", href: "/quote" },
  { labelKey: "footer.myAccount", href: "/account" },
  { labelKey: "footer.faqs", href: "/faqs" },
];

export const contactInfo = {
  phone: "+1 (555) 123-4567",
  email: "hello@luxtor.com",
  address: "123 Design Avenue, Suite 100",
  city: "Los Angeles, CA 90001",
} as const;

export const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "Pinterest", href: "#" },
  { label: "Facebook", href: "#" },
] as const;
