import type { CSSProperties } from "react";
import type { Venture, VentureLayout } from "@/content/ventures";
import { ventureHref } from "@/content/ventures";
import { site } from "@/content/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { SplitHero, BoldHero, EditorialHero, MinimalHero } from "./Heroes";
import {
  IntroColumns,
  IntroSticky,
  IntroDropcap,
  IntroCentered,
  ServicesGrid,
  ServicesNumbered,
  ServicesRows,
  ServicesList,
  MissionSplit,
  MissionQuotes,
  GalleryGrid,
  GalleryScroll,
  GalleryMasonry,
  GalleryStrip,
  EnquiryCTA,
  NextVenture,
} from "./Blocks";

type Block = (props: { v: Venture }) => React.ReactElement;

/**
 * Each company gets its OWN page structure.
 * Re-order or swap blocks here to change a company page's layout.
 */
const LAYOUTS: Record<VentureLayout, Block[]> = {
  split: [SplitHero, IntroColumns, ServicesGrid, MissionSplit, GalleryGrid],
  bold: [BoldHero, IntroSticky, ServicesNumbered, GalleryScroll, MissionQuotes],
  editorial: [EditorialHero, IntroDropcap, ServicesRows, MissionSplit, GalleryMasonry],
  minimal: [MinimalHero, IntroCentered, ServicesList, MissionQuotes, GalleryStrip],
};

export function VenturePage({ venture: v }: { venture: Venture }) {
  const style = { "--venture-accent": v.accent, "--venture-ink": v.accentInk } as CSSProperties;
  const blocks = LAYOUTS[v.layout];
  return (
    <div style={style}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: v.name,
          url: v.website || `${site.url}${ventureHref(v.slug)}`,
          logo: `${site.url}${v.images.logo}`,
          founder: { "@type": "Person", name: site.name, url: site.url },
        }}
      />
      {blocks.map((B, i) => (
        <B key={i} v={v} />
      ))}
      <EnquiryCTA v={v} />
      <NextVenture v={v} />
    </div>
  );
}
