export interface Category {
  titleKey: string;
  descriptionKey: string;
  image: string;
  href: string;
}

export const featuredCategories: Category[] = [
  {
    titleKey: "categories.curtains.title",
    descriptionKey: "categories.curtains.description",
    image: "/images/3HLinen_Beige_Natural_Pencil_Pleat_Curtains_Unlined.webp",
    href: "/collections#curtains",
  },
  {
    titleKey: "categories.blinds.title",
    descriptionKey: "categories.blinds.description",
    image: "/images/blinds/blind-2.jpg",
    href: "/collections#blinds",
  },
  {
    titleKey: "categories.awnings.title",
    descriptionKey: "categories.awnings.description",
    image: "/images/awnings/awning-2.webp",
    href: "/awnings",
  },
  {
    titleKey: "categories.pergolas.title",
    descriptionKey: "categories.pergolas.description",
    image: "/images/pergolas/pergola-2.jpg",
    href: "/pergolas",
  },
  {
    titleKey: "categories.sheers.title",
    descriptionKey: "categories.sheers.description",
    image: "/images/inspiration/inspiration-6.jpg",
    href: "/collections#sheers",
  },
  {
    titleKey: "categories.homeDecor.title",
    descriptionKey: "categories.homeDecor.description",
    image: "/images/accessories/accessory-5.jpg",
    href: "/collections#decor",
  },
];

export const allCategories: Category[] = featuredCategories;

export const whyChooseUsKeys = [
  {
    titleKey: "whyChooseUsItems.bespokeDesign.title",
    descriptionKey: "whyChooseUsItems.bespokeDesign.description",
  },
  {
    titleKey: "whyChooseUsItems.premiumFabrics.title",
    descriptionKey: "whyChooseUsItems.premiumFabrics.description",
  },
  {
    titleKey: "whyChooseUsItems.expertInstallation.title",
    descriptionKey: "whyChooseUsItems.expertInstallation.description",
  },
  {
    titleKey: "whyChooseUsItems.personalConsultation.title",
    descriptionKey: "whyChooseUsItems.personalConsultation.description",
  },
] as const;
