export const site = {
  name: "Gott Data",
  tagline:
    "Where will your category be in three years, and where should you be standing when it gets there.",
  description:
    "Gott Data is a confidential research firm. We answer category foresight questions through four lenses: data, human, technology, and category.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gottdata.com",
  locale: "en_GB",
} as const;
