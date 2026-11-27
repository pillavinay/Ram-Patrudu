/**
 * ============================================================
 *  SITE CONTENT — edit text here, no need to touch components.
 * ============================================================
 *  Anything inside [square brackets] is a PLACEHOLDER.
 *  Replace it with verified information before going live.
 */

export const site = {
  name: "Ram Patrudu",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://rampatrudu.com",
  designation: ["Entrepreneur", "Business Leader", "Co-founder"],
  location: "India", // shown with a live clock in the navbar & footer — confirm
  timeZone: "Asia/Kolkata",
  tagline: "Dreams to Ventures.",
  description:
    "Ram Patrudu — entrepreneur, business leader and co-founder. The ventures behind the vision: Trovity Insurance, Mad Over Insurance, Redcrabs and Call Me OOO.",

  hero: {
    heading: "Turning Dreams Into Ventures.",
    accent: "Ventures.", // word(s) shown in italic accent colour
    supporting: "Entrepreneur. Visionary. Builder of ideas that move businesses forward.",
    /** Short intro under the heading — **double asterisks** make words bold */
    intro: "Building **four ventures** across insurance and beyond — **Trovity Insurance, Mad Over Insurance, Redcrabs and Call Me OOO** — and sharing the journey with a community of **45.6K on Instagram**.",
  },

  /** Instagram figures from the profile screenshot — update when they change. */
  instagram: {
    handle: "@rampatrudu",
    url: "https://www.instagram.com/rampatrudu/",
    posts: "361",
    followers: "45.6K",
    following: "3,229",
  },

  stats: [
    { value: "4", label: "Ventures" },
    { value: "45.6K", label: "Instagram community" },
    { value: "361", label: "Instagram posts" },
  ],

  /** Contact details — leave "" to hide a line. */
  email: "" as string, // e.g. "hello@rampatrudu.com"
  phone: "" as string, // e.g. "+91 90000 00000"
  whatsapp: "" as string, // digits only with country code, e.g. "919000000000" — leave "" to hide the button

  /** Social links — any entry with an empty href is hidden automatically. */
  socials: [
    { label: "Instagram", short: "IG", href: "https://www.instagram.com/rampatrudu/" as string },
    { label: "LinkedIn", short: "in", href: "" as string }, // add LinkedIn URL
    { label: "YouTube", short: "YT", href: "" as string },
    { label: "X", short: "X", href: "" as string },
  ],

  /** Image slots — drop files with these exact names into /public/images/ram/ */
  images: {
    portrait: "/images/ram/hero-portrait.jpg", // tall portrait, ~1200x1500
    about1: "/images/ram/about-1.jpg", // ~1000x1250
    about2: "/images/ram/about-2.jpg", // ~800x800
    vision: "/images/ram/vision-bg.jpg", // wide cinematic, ~2400x1400
    og: "/og-image.png", // social preview, 1200x630
  },

  about: {
    heading: "Beyond Business. Building Possibilities.",
    accent: "Possibilities.",
    /** Big bold statement; the words in `highlight` turn accent-coloured */
    statement: "An entrepreneur, business leader and co-founder — turning ideas into four ventures and building what comes next.",
    highlight: "four ventures",
    paragraphs: [
      "Ram Patrudu is an entrepreneur, business leader and co-founder whose work spans four ventures — Trovity Insurance, Mad Over Insurance, Redcrabs and Call Me OOO.",
      "[Professional introduction: how Ram started, the industries he works in, and what he is building today.]",
      "[Vision and approach: what drives Ram, and how he turns ideas into companies.]",
    ],
    pillars: [
      {
        title: "Entrepreneurial mindset",
        text: "[One or two lines on how Ram spots opportunities and takes the first step.]",
      },
      {
        title: "Vision & approach",
        text: "[One or two lines on how Ram plans, builds and grows a venture.]",
      },
      {
        title: "Leadership philosophy",
        text: "[One or two lines on how Ram leads people and teams.]",
      },
    ],
  },

  vision: {
    statement: "Big Ideas Begin With The Courage To Build.",
    accent: ["Courage", "Build."],
    supporting: "[A short line on Ram's long-term vision — what he wants his ventures to change.]",
  },

  contact: {
    heading: "Let's build the next one.",
    accent: "next one.",
    text: "Partnerships, speaking, media or business enquiries — send a message and the team will get back to you.",
  },
} as const;

export type Site = typeof site;
