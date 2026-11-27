import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getVenture, ventures, ventureHref } from "@/content/ventures";
import { VenturePage } from "@/components/ventures/VenturePage";

/**
 * Creates one page per company at build time:
 *   /ventures/trovity-insurance/
 *   /ventures/mad-over-insurance/
 *   /ventures/redcrabs/
 *   /ventures/call-me-ooo/
 * Add a company in content/ventures.ts and its page appears automatically.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) return {};
  const clean = (s: string) => (s.startsWith("[") ? "" : s);
  const description =
    clean(v.shortDescription) || `${v.name} — a venture by Ram Patrudu, entrepreneur, business leader and co-founder.`;
  const og = `/og/${v.slug}.png`;
  return {
    title: v.name,
    description,
    alternates: { canonical: ventureHref(v.slug) },
    openGraph: {
      title: `${v.name} | Ram Patrudu`,
      description,
      url: ventureHref(v.slug),
      images: [{ url: og, width: 1200, height: 630, alt: v.name }],
    },
    twitter: { card: "summary_large_image", title: `${v.name} | Ram Patrudu`, description, images: [og] },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) notFound();
  return <VenturePage venture={v} />;
}
