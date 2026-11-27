"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Venture } from "@/content/ventures";
import { ventures } from "@/content/ventures";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { EASE } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { VentureLogo } from "@/components/ui/VentureLogo";
import { Button } from "@/components/ui/Button";

const enquiryHref = (v: Venture) => `/?enquiry=${v.slug}#contact`;
const category = (v: Venture) => (v.category.startsWith("[") ? "Venture" : v.category);
const number = (v: Venture) => `0${ventures.findIndex((x) => x.slug === v.slug) + 1}`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export function BackToPortfolio({ className = "" }: { className?: string }) {
  return (
    <Link href="/#ventures" className={`group mono-label inline-flex items-center gap-2 text-muted transition-colors hover:text-v ${className}`}>
      <span className="transition-transform group-hover:-translate-x-1">←</span> Back to Ram Patrudu
    </Link>
  );
}

function HeroButtons({ v, center = false }: { v: Venture; center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-4 ${center ? "justify-center" : ""}`}>
      <Button href={enquiryHref(v)} arrow>
        Enquire Now
      </Button>
      {v.website ? (
        <Button href={v.website} external variant="outline">
          Visit Website ↗
        </Button>
      ) : (
        <Button href="#story" variant="outline">
          Discover More
        </Button>
      )}
    </div>
  );
}

/* ---------- 1. SPLIT — clean corporate (Trovity Insurance) ---------- */
export function SplitHero({ v }: { v: Venture }) {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 md:pt-40">
      <div aria-hidden className="absolute -left-40 -top-40 h-[560px] w-[560px] rounded-full bg-v/15 blur-[140px]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <motion.div {...fadeUp(0)}>
            <BackToPortfolio />
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="mt-10 flex items-center gap-4">
            <VentureLogo venture={v} size={64} />
            <span className="mono-label rounded-full border border-v/40 px-4 py-1.5 text-v">{category(v)}</span>
          </motion.div>
          <AnimatedHeading as="h1" text={v.name} trigger="mount" delay={0.2} className="mt-8 text-[clamp(3.4rem,8vw,7.5rem)] uppercase" />
          <motion.p {...fadeUp(0.5)} className="mt-6 max-w-lg text-xl text-muted">
            {v.tagline}
          </motion.p>
          <motion.div {...fadeUp(0.65)} className="mt-10">
            <HeroButtons v={v} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.3 }}
          className="relative"
        >
          <div aria-hidden className="absolute -bottom-5 -right-5 h-full w-full rounded-[32px] border border-v/40" />
          <ImageSlot src={v.images.hero} alt={`${v.name}`} label={`${v.name} — hero image`} priority className="aspect-[5/4] rounded-[32px] border border-line" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- 2. BOLD — giant typography + marquee (Mad Over Insurance) ---------- */
export function BoldHero({ v }: { v: Venture }) {
  const words = v.name.toUpperCase().split(" ");
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="container-x">
        <motion.div {...fadeUp(0)} className="flex items-center justify-between">
          <BackToPortfolio />
          <span className="mono-label text-v">Venture {number(v)} / 0{ventures.length}</span>
        </motion.div>
        <h1 aria-label={v.name} className="mt-10 text-[clamp(3rem,11.5vw,11rem)] font-[650] leading-[0.82] tracking-[-0.04em]">
          {words.map((w, i) => (
            <span key={i} aria-hidden className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? "accent-word pl-[8vw]" : ""} ${i === 2 ? "text-right" : ""}`}
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.12 }}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div {...fadeUp(0.6)} className="mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-2 md:items-end">
          <div className="flex items-start gap-5">
            <VentureLogo venture={v} size={56} />
            <p className="max-w-md text-xl text-muted">{v.tagline}</p>
          </div>
          <div className="md:justify-self-end">
            <HeroButtons v={v} />
          </div>
        </motion.div>
      </div>
      <div className="mt-16 -rotate-2 bg-v py-4 text-v-ink" aria-hidden>
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap font-display text-2xl font-semibold uppercase md:text-4xl">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              {v.name} <span>✺</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. EDITORIAL — full-screen photo hero (Redcrabs) ---------- */
export function EditorialHero({ v }: { v: Venture }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-32">
      <motion.div aria-hidden style={{ scale }} className="absolute inset-0">
        <ImageSlot src={v.images.hero} alt="" label={`${v.name} — full-screen hero image`} priority quiet className="h-full w-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-bg/30" />
      <motion.div style={{ y }} className="container-x relative">
        <motion.div {...fadeUp(0)}>
          <BackToPortfolio />
        </motion.div>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p {...fadeUp(0.1)} className="eyebrow">
              <span className="h-px w-10 bg-v" />
              {category(v) === "Venture" ? `Venture ${number(v)}` : `${category(v)} · Venture ${number(v)}`}
            </motion.p>
            <AnimatedHeading as="h1" text={v.name} trigger="mount" delay={0.2} className="mt-6 text-[clamp(4.4rem,15vw,14rem)] uppercase leading-[0.82]" />
          </div>
          <motion.div {...fadeUp(0.6)} className="lg:col-span-4">
            <VentureLogo venture={v} size={52} />
            <p className="mt-5 text-lg text-fg/80">{v.tagline}</p>
            <div className="mt-8">
              <HeroButtons v={v} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ---------- 4. MINIMAL — centred & calm (Call Me OOO) ---------- */
export function MinimalHero({ v }: { v: Venture }) {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-36">
      <div aria-hidden className="animate-drift absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-v/20 blur-[150px]" />
      <div className="container-x relative text-center">
        <motion.div {...fadeUp(0)}>
          <BackToPortfolio />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
          className="relative mx-auto mt-14 grid h-40 w-40 place-items-center"
        >
          <svg aria-hidden viewBox="0 0 100 100" className="animate-spin-slow absolute inset-0 h-full w-full text-v/60">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
          </svg>
          <VentureLogo venture={v} size={104} />
        </motion.div>
        <AnimatedHeading as="h1" text={v.name} trigger="mount" delay={0.35} className="mt-12 text-[clamp(3.4rem,9vw,8rem)] uppercase" />
        <motion.p {...fadeUp(0.7)} className="mx-auto mt-6 max-w-xl text-xl text-muted">
          {v.tagline}
        </motion.p>
        <motion.div {...fadeUp(0.85)} className="mx-auto mt-6 h-px w-24 bg-v" />
        <motion.div {...fadeUp(0.95)} className="mt-10">
          <HeroButtons v={v} center />
        </motion.div>
      </div>
    </section>
  );
}
