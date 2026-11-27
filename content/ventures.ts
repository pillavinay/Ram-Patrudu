/**
 * ============================================================
 *  VENTURES — one entry per company page (/ventures/<slug>/)
 * ============================================================
 *  - Text inside [square brackets] is a PLACEHOLDER — replace with verified info.
 *  - accent / accentInk: provisional brand colours for each company page.
 *  - layout: gives each company page its own look:
 *      "split"     → corporate split hero, card grid
 *      "bold"      → giant typography, numbered services, horizontal gallery
 *      "editorial" → full-screen photo hero, magazine-style story
 *      "minimal"   → centred, calm, accordion services
 *  - Images: drop files with these exact names into /public/images/ventures/<slug>/
 */

export type VentureLayout = "split" | "bold" | "editorial" | "minimal";

export type Venture = {
  slug: string;
  name: string;
  monogram: string;
  category: string;
  tagline: string;
  shortDescription: string;
  intro: string[];
  whatWeDo: string;
  mission: string;
  vision: string;
  services: { title: string; text: string }[];
  role: string; // Ram's role, e.g. "Co-founder" — shown in the ventures list
  year: string; // year founded/started
  website: string; // full URL, e.g. "https://example.com" — leave "" to hide the button
  accent: string;
  accentInk: string;
  layout: VentureLayout;
  images: {
    logo: string;
    card: string;
    hero: string;
    gallery: string[];
  };
};

const img = (slug: string) => ({
  logo: `/images/ventures/${slug}/logo.png`,
  card: `/images/ventures/${slug}/card.jpg`,
  hero: `/images/ventures/${slug}/hero.jpg`,
  gallery: [1, 2, 3].map((n) => `/images/ventures/${slug}/gallery-${n}.jpg`),
});

const placeholderServices = (name: string) => [
  { title: "[Product / service 1]", text: `[What ${name} offers and who it is for.]` },
  { title: "[Product / service 2]", text: "[Short description — keep it to one or two lines.]" },
  { title: "[Product / service 3]", text: "[Short description — keep it to one or two lines.]" },
];

export const ventures: Venture[] = [
  {
    slug: "trovity-insurance",
    name: "Trovity Insurance",
    monogram: "T",
    category: "Insurance",
    tagline: "[Trovity Insurance tagline]",
    shortDescription: "[One-line description of Trovity Insurance — what it does and who it serves.]",
    intro: [
      "[Introduction to Trovity Insurance: when it started, the problem it solves and the people it serves.]",
      "[Second paragraph: what makes Trovity Insurance different.]",
    ],
    whatWeDo: "[Explain in plain words what Trovity Insurance does for its customers.]",
    mission: "[Trovity Insurance mission statement.]",
    vision: "[Trovity Insurance vision statement.]",
    services: placeholderServices("Trovity Insurance"),
    role: "[Role]",
    year: "[Year]",
    website: "",
    accent: "#5cc2d1",
    accentInk: "#06181b",
    layout: "split",
    images: img("trovity-insurance"),
  },
  {
    slug: "mad-over-insurance",
    name: "Mad Over Insurance",
    monogram: "M",
    category: "Insurance",
    tagline: "[Mad Over Insurance tagline]",
    shortDescription: "[One-line description of Mad Over Insurance — what it does and who it serves.]",
    intro: [
      "[Introduction to Mad Over Insurance: the idea behind it and the audience it speaks to.]",
      "[Second paragraph: the format, community or content that defines Mad Over Insurance.]",
    ],
    whatWeDo: "[Explain in plain words what Mad Over Insurance does.]",
    mission: "[Mad Over Insurance mission statement.]",
    vision: "[Mad Over Insurance vision statement.]",
    services: placeholderServices("Mad Over Insurance"),
    role: "[Role]",
    year: "[Year]",
    website: "",
    accent: "#f47c5c",
    accentInk: "#1f0a04",
    layout: "bold",
    images: img("mad-over-insurance"),
  },
  {
    slug: "redcrabs",
    name: "Redcrabs",
    monogram: "R",
    category: "[Category]",
    tagline: "[Redcrabs tagline]",
    shortDescription: "[One-line description of Redcrabs — what it does and who it serves.]",
    intro: [
      "[Introduction to Redcrabs: the story behind the name and what the company does.]",
      "[Second paragraph: the people, craft or customers at the heart of Redcrabs.]",
    ],
    whatWeDo: "[Explain in plain words what Redcrabs does.]",
    mission: "[Redcrabs mission statement.]",
    vision: "[Redcrabs vision statement.]",
    services: placeholderServices("Redcrabs"),
    role: "[Role]",
    year: "[Year]",
    website: "",
    accent: "#e5533f",
    accentInk: "#1d0603",
    layout: "editorial",
    images: img("redcrabs"),
  },
  {
    slug: "call-me-ooo",
    name: "Call Me OOO",
    monogram: "OOO",
    category: "[Category]",
    tagline: "[Call Me OOO tagline]",
    shortDescription: "[One-line description of Call Me OOO — what it does and who it serves.]",
    intro: [
      "[Introduction to Call Me OOO: what it is and why it was started.]",
      "[Second paragraph: the experience Call Me OOO creates for its customers.]",
    ],
    whatWeDo: "[Explain in plain words what Call Me OOO does.]",
    mission: "[Call Me OOO mission statement.]",
    vision: "[Call Me OOO vision statement.]",
    services: placeholderServices("Call Me OOO"),
    role: "[Role]",
    year: "[Year]",
    website: "",
    accent: "#a597f7",
    accentInk: "#0f0b24",
    layout: "minimal",
    images: img("call-me-ooo"),
  },
];

export const getVenture = (slug: string) => ventures.find((v) => v.slug === slug);

export const nextVenture = (slug: string) => {
  const i = ventures.findIndex((v) => v.slug === slug);
  return ventures[(i + 1) % ventures.length];
};

export const ventureHref = (slug: string) => `/ventures/${slug}/`;
