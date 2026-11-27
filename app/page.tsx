import { Hero } from "@/components/home/Hero";
import { VenturesStrip } from "@/components/home/VenturesStrip";
import { Highlights } from "@/components/home/Highlights";
import { VenturesList } from "@/components/home/VenturesList";
import { About } from "@/components/home/About";
import { Journey } from "@/components/home/Journey";
import { Vision } from "@/components/home/Vision";
import { Contact } from "@/components/home/Contact";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/content/site";
import { ventures, ventureHref } from "@/content/ventures";

/** Homepage — sections in order. Re-order or remove lines below to change the page. */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: site.name,
          url: site.url,
          image: `${site.url}${site.images.og}`,
          jobTitle: site.designation.join(", "),
          description: site.description,
          sameAs: site.socials.filter((s) => s.href).map((s) => s.href),
          worksFor: ventures.map((v) => ({ "@type": "Organization", name: v.name, url: `${site.url}${ventureHref(v.slug)}` })),
        }}
      />
      <Hero />
      <VenturesStrip />
      <VenturesList />
      <Highlights />
      <About />
      <Journey />
      <Vision />
      <Contact />
    </>
  );
}
