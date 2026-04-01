export interface Category {
  title: string;
  description: string;
  image: string;
  href: string;
}

export const featuredCategories: Category[] = [
  {
    title: "Curtains",
    description: "Luxurious fabrics tailored to perfection for every window.",
    image: "/images/3HLinen_Beige_Natural_Pencil_Pleat_Curtains_Unlined.webp",
    href: "/collections#curtains",
  },
  {
    title: "Blinds",
    description: "Modern solutions with precision engineering and elegant finishes.",
    image: "/images/blinds/blind-2.jpg",
    href: "/collections#blinds",
  },
  {
    title: "Awnings",
    description: "Extend your living space with premium outdoor awnings.",
    image: "/images/awnings/awning-2.webp",
    href: "/awnings",
  },
  {
    title: "Pergolas",
    description: "Create a stunning outdoor sanctuary with designer pergolas.",
    image: "/images/pergolas/pergola-2.jpg",
    href: "/pergolas",
  },
  {
    title: "Sheers & Voiles",
    description: "Delicate layers that filter light with ethereal beauty.",
    image: "/images/inspiration/inspiration-6.jpg",
    href: "/collections#sheers",
  },
  {
    title: "Home Decor",
    description: "Curated accessories to complete your interior vision.",
    image: "/images/accessories/accessory-5.jpg",
    href: "/collections#decor",
  },
];

export const allCategories: Category[] = featuredCategories;

export const whyChooseUs = [
  {
    title: "Bespoke Design",
    description:
      "Every piece is custom-made to your exact measurements and style preferences.",
  },
  {
    title: "Premium Fabrics",
    description:
      "We source only the finest materials from trusted mills around the world.",
  },
  {
    title: "Expert Installation",
    description:
      "Our skilled team ensures a flawless fit and finish in your home.",
  },
  {
    title: "Personal Consultation",
    description:
      "Free in-home consultations to help you find the perfect solution.",
  },
] as const;
