import Link from "next/link";
import type { Venture } from "@/content/ventures";
import { nextVenture, ventureHref } from "@/content/ventures";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Arrow, Button } from "@/components/ui/Button";
import { BackToPortfolio } from "./Heroes";

type P = { v: Venture };

function Eyebrow({ children, center = false }: { children: React.ReactNode; center?: boolean }) {
  return (
    <p className={`eyebrow ${center ? "justify-center" : ""}`}>
      <span className="h-px w-10 bg-v" />
      {children}
    </p>
  );
}

/* =========================== INTRODUCTION =========================== */

/** Two columns: title left, story right (split layout) */
export function IntroColumns({ v }: P) {
  return (
    <section id="story" className="py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Introduction</Eyebrow>
          </Reveal>
          <AnimatedHeading text={`About ${v.name}.`} accent={v.name.split(" ").slice(-1)[0] + "."} className="mt-6 text-[clamp(2.4rem,4.5vw,4rem)]" />
        </div>
        <div className="space-y-6 text-lg leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
          {v.intro.map((p, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <p className={i === 0 ? "text-2xl leading-snug text-fg" : ""}>{p}</p>
            </Reveal>
          ))}
          <Reveal delay={0.2}>
            <div className="mt-10 rounded-3xl border border-line bg-surface p-8">
              <h3 className="text-2xl">What {v.name} does</h3>
              <p className="mt-3">{v.whatWeDo}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Sticky big title + scrolling story (bold layout) */
export function IntroSticky({ v }: P) {
  return (
    <section id="story" className="py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>The story</Eyebrow>
          </Reveal>
          <h2 className="mt-6 text-[clamp(2.8rem,6vw,5.5rem)] font-[650] uppercase leading-[0.9] tracking-[-0.03em]">
            What we&apos;re <span className="accent-word">about.</span>
          </h2>
        </div>
        <div className="space-y-10">
          {v.intro.map((p, i) => (
            <Reveal key={i}>
              <p className="text-2xl leading-snug text-fg/90 md:text-3xl">{p}</p>
            </Reveal>
          ))}
          <Reveal>
            <div className="border-l-4 border-v pl-6">
              <p className="mono-label text-v">What we do</p>
              <p className="mt-3 text-lg leading-relaxed text-muted">{v.whatWeDo}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/** Magazine column with drop cap (editorial layout) */
export function IntroDropcap({ v }: P) {
  const [first, ...rest] = v.intro;
  return (
    <section id="story" className="py-24 md:py-36">
      <div className="container-x mx-auto max-w-3xl">
        <Reveal>
          <Eyebrow>The story of {v.name}</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 text-xl leading-relaxed text-fg/90 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:text-v md:text-2xl">
            {first}
          </p>
        </Reveal>
        {rest.map((p, i) => (
          <Reveal key={i}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{p}</p>
          </Reveal>
        ))}
        <Reveal>
          <blockquote className="my-14 border-y border-line py-10 text-center font-display text-3xl italic leading-snug md:text-4xl">
            <span className="text-v">“</span>
            {v.tagline}
            <span className="text-v">”</span>
          </blockquote>
        </Reveal>
        <Reveal>
          <h3 className="text-2xl">What {v.name} does</h3>
          <p className="mt-3 text-lg leading-relaxed text-muted">{v.whatWeDo}</p>
        </Reveal>
      </div>
    </section>
  );
}

/** Centred, airy (minimal layout) */
export function IntroCentered({ v }: P) {
  return (
    <section id="story" className="py-24 md:py-32">
      <div className="container-x mx-auto max-w-3xl text-center">
        <Reveal>
          <Eyebrow center>Introduction</Eyebrow>
        </Reveal>
        {v.intro.map((p, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <p className={`mt-8 leading-relaxed ${i === 0 ? "font-display text-3xl leading-snug md:text-4xl" : "text-lg text-muted"}`}>{p}</p>
          </Reveal>
        ))}
        <Reveal>
          <div className="mx-auto mt-14 max-w-xl rounded-full border border-line px-8 py-6">
            <p className="mono-label text-v">What we do</p>
            <p className="mt-2 text-muted">{v.whatWeDo}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================== SERVICES =========================== */

export function ServicesGrid({ v }: P) {
  return (
    <section className="bg-surface/40 py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Products &amp; services</Eyebrow>
        </Reveal>
        <AnimatedHeading text="What we offer." accent="offer." className="mt-6 text-[clamp(2.4rem,4.5vw,4rem)]" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {v.services.map((s, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <article className="group h-full rounded-3xl border border-line bg-bg p-8 transition-all duration-500 hover:-translate-y-1 hover:border-v/50">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-v/15 font-display text-lg text-v">0{i + 1}</span>
                <h3 className="mt-8 text-2xl">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesNumbered({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <Reveal>
          <Eyebrow>Products &amp; services</Eyebrow>
        </Reveal>
        <ol className="mt-10">
          {v.services.map((s, i) => (
            <Reveal key={i}>
              <li className="group grid items-baseline gap-4 border-b border-line py-10 transition-colors md:grid-cols-12">
                <span className="outline-text hover-fill font-display text-7xl font-[650] text-v md:col-span-3 md:text-8xl">
                  0{i + 1}
                </span>
                <h3 className="text-3xl font-[600] uppercase tracking-tight md:col-span-4 md:text-4xl">{s.title}</h3>
                <p className="text-lg leading-relaxed text-muted md:col-span-5">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServicesRows({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="text-center">
          <Reveal>
            <Eyebrow center>Products &amp; services</Eyebrow>
          </Reveal>
          <AnimatedHeading text="Crafted with care." accent="care." className="mt-6 text-[clamp(2.4rem,4.5vw,4rem)]" />
        </div>
        <div className="mt-20 space-y-24">
          {v.services.map((s, i) => (
            <div key={i} className="grid items-center gap-10 md:grid-cols-2 md:gap-20">
              <Parallax offset={30} className={i % 2 ? "md:order-2" : ""}>
                <ImageSlot src={v.images.gallery[i % v.images.gallery.length]} alt={s.title} label={`${s.title} — image`} className="aspect-[4/3] rounded-3xl border border-line" />
              </Parallax>
              <Reveal>
                <span className="font-display text-7xl text-v">0{i + 1}</span>
                <h3 className="mt-4 text-4xl">{s.title}</h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{s.text}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesList({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal>
            <Eyebrow center>Products &amp; services</Eyebrow>
          </Reveal>
        </div>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {v.services.map((s, i) => (
            <Reveal key={i}>
              <details className="group py-6" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl md:text-3xl [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="mr-4 text-base text-v">0{i + 1}</span>
                    {s.title}
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-v transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 pl-9 text-lg leading-relaxed text-muted">{s.text}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================== MISSION & VISION =========================== */

export function MissionSplit({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x grid gap-6 md:grid-cols-2">
        {[
          { label: "Mission", text: v.mission },
          { label: "Vision", text: v.vision },
        ].map((b, i) => (
          <Reveal key={b.label} delay={i * 0.12} className="h-full">
            <div className={`relative h-full overflow-hidden rounded-[32px] p-10 md:p-14 ${i === 0 ? "bg-v text-v-ink" : "border border-line bg-surface"}`}>
              <p className={`mono-label ${i === 0 ? "" : "text-v"}`}>Our {b.label}</p>
              <p className="mt-8 font-display text-3xl leading-snug md:text-4xl">{b.text}</p>
              <span aria-hidden className="absolute -bottom-10 -right-4 font-display text-[10rem] leading-none opacity-10">
                {b.label[0]}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function MissionQuotes({ v }: P) {
  return (
    <section className="relative overflow-hidden bg-surface/40 py-24 md:py-36">
      <div className="container-x mx-auto max-w-5xl space-y-20">
        {[
          { label: "Mission", text: v.mission },
          { label: "Vision", text: v.vision },
        ].map((b, i) => (
          <Reveal key={b.label}>
            <figure className={i % 2 ? "md:text-right" : ""}>
              <figcaption className={`eyebrow ${i % 2 ? "md:justify-end" : ""}`}>
                <span className="h-px w-10 bg-v" />
                Our {b.label}
              </figcaption>
              <blockquote className="mt-6 font-display text-[clamp(2rem,4.5vw,3.8rem)] leading-[1.1]">
                <span className="text-v">“</span>
                {b.text}
                <span className="text-v">”</span>
              </blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* =========================== GALLERY / MEDIA =========================== */

function GalleryHeader({ v, center = false }: P & { center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      <Reveal>
        <Eyebrow center={center}>Media</Eyebrow>
      </Reveal>
      <AnimatedHeading text={`Inside ${v.name}.`} className="mt-6 text-[clamp(2.2rem,4vw,3.5rem)]" />
    </div>
  );
}

export function GalleryGrid({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <GalleryHeader v={v} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {v.images.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <ImageSlot src={src} alt={`${v.name} — photo ${i + 1}`} label={`Photo ${i + 1}`} className={`rounded-3xl border border-line ${i === 1 ? "aspect-[3/4] md:mt-12" : "aspect-[3/4]"}`} imgClassName="transition-transform duration-1000 hover:scale-105" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryScroll({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <GalleryHeader v={v} />
      </div>
      <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[max(1.25rem,calc((100vw-1320px)/2+3rem))] pb-6 [scrollbar-width:thin]">
        {v.images.gallery.map((src, i) => (
          <ImageSlot key={src} src={src} alt={`${v.name} — photo ${i + 1}`} label={`Photo ${i + 1}`} className="aspect-[4/5] w-[78vw] shrink-0 snap-center rounded-3xl border border-line sm:w-[46vw] lg:w-[32vw]" />
        ))}
      </div>
      <p className="container-x mono-label mt-4 text-muted">Drag / swipe to explore →</p>
    </section>
  );
}

export function GalleryMasonry({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <GalleryHeader v={v} center />
        <div className="mt-12 grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <ImageSlot src={v.images.gallery[0]} alt={`${v.name} — photo 1`} label="Photo 1" className="aspect-[4/3] rounded-3xl border border-line md:aspect-auto md:h-full md:min-h-[520px]" />
          </Reveal>
          <div className="grid gap-6 md:col-span-5">
            {v.images.gallery.slice(1).map((src, i) => (
              <Reveal key={src} delay={(i + 1) * 0.1}>
                <ImageSlot src={src} alt={`${v.name} — photo ${i + 2}`} label={`Photo ${i + 2}`} className="aspect-[4/3] rounded-3xl border border-line" />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function GalleryStrip({ v }: P) {
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <GalleryHeader v={v} center />
        <div className="mt-12 grid grid-cols-3 gap-3 md:gap-6">
          {v.images.gallery.map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <ImageSlot src={src} alt={`${v.name} — photo ${i + 1}`} label={`Photo ${i + 1}`} className="aspect-square rounded-full border border-line" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================== CTA + NEXT =========================== */

export function EnquiryCTA({ v }: P) {
  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-[36px] border border-v/30 bg-surface p-10 md:p-16">
            <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-v/25 blur-[100px]" />
            <div className="relative grid items-end gap-10 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Eyebrow>Work with {v.name}</Eyebrow>
                <h2 className="mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">
                  Interested in <span className="accent-word">{v.name}?</span>
                </h2>
                <p className="mt-5 max-w-xl text-lg text-muted">Send an enquiry and the team will get back to you.</p>
              </div>
              <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
                <Button href={`/?enquiry=${v.slug}#contact`} arrow>
                  Send an Enquiry
                </Button>
                {v.website && (
                  <Button href={v.website} external variant="outline">
                    Visit {v.name} ↗
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function NextVenture({ v }: P) {
  const n = nextVenture(v.slug);
  return (
    <section className="border-t border-line">
      <div className="container-x flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
        <BackToPortfolio />
        <Link
          href={ventureHref(n.slug)}
          style={{ ["--venture-accent" as string]: n.accent }}
          className="group text-right"
        >
          <span className="mono-label block text-muted">Next venture</span>
          <span className="mt-2 flex items-center gap-4 font-display text-5xl uppercase transition-colors group-hover:text-v md:text-7xl">
            {n.name} <Arrow className="h-8 w-8" />
          </span>
        </Link>
      </div>
    </section>
  );
}
