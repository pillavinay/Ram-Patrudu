/**
 * HIGHLIGHTS — the "Drag to explore" carousel on the homepage.
 * Use it for reels, events, media features, launches or photos.
 * Images: /public/images/highlights/highlight-1.jpg … (portrait ~1080x1350 works best)
 * href: optional link (e.g. an Instagram post). Replace the [placeholders].
 */
export type Highlight = { title: string; caption: string; image: string; href: string };

export const highlights: Highlight[] = Array.from({ length: 6 }, (_, i) => ({
  title: `[Highlight ${i + 1}]`,
  caption: "[Short caption — event, reel, launch or feature]",
  image: `/images/highlights/highlight-${i + 1}.jpg`,
  href: "",
}));
