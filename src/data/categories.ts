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
    image: "/images/category-curtains.svg",
    href: "/collections#curtains",
  },
  {
    title: "Blinds",
    description: "Modern solutions with precision engineering and elegant finishes.",
    image: "/images/category-blinds.svg",
    href: "/collections#blinds",
  },
  {
    title: "Awnings",
    description: "Extend your living space with premium outdoor awnings.",
    image: "/images/category-awnings.svg",
    href: "/awnings",
  },
  {
    title: "Pergolas",
    description: "Create a stunning outdoor sanctuary with designer pergolas.",
    image: "/images/category-pergolas.svg",
    href: "/pergolas",
  },
  {
    title: "Sheers & Voiles",
    description: "Delicate layers that filter light with ethereal beauty.",
    image: "/images/category-sheers.svg",
    href: "/collections#sheers",
  },
  {
    title: "Home Decor",
    description: "Curated accessories to complete your interior vision.",
    image: "/images/category-decor.svg",
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
