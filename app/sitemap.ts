import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { ventures, ventureHref } from "@/content/ventures";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...ventures.map((v) => ({
      url: `${site.url}${ventureHref(v.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
