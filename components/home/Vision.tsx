"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { site } from "@/content/site";
import { ventures } from "@/content/ventures";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { Reveal } from "@/components/motion/Reveal";

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  // Words light up one by one as you scroll
  const { scrollYProgress: wordsProgress } = useScroll({ target: ref, offset: ["start 75%", "center 45%"] });
  const words = site.vision.statement.split(" ");
  const accents = new Set(site.vision.accent.map((w) => w.toLowerCase()));

  return (
    <section ref={ref} aria-labelledby="vision-heading" className="grain relative overflow-hidden py-36 md:py-56">
      <motion.div aria-hidden style={{ scale: bgScale, y: bgY }} className="absolute inset-0">
        <ImageSlot src={site.images.vision} alt="" label="Vision — cinematic background" quiet className="h-full w-full" />
      </motion.div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-bg via-bg/75 to-bg" />

      <div className="container-x relative text-center">
        <Reveal>
          <p className="mono-label text-accent">Vision &amp; Philosophy</p>
        </Reveal>

        <h2 id="vision-heading" aria-label={site.vision.statement} className="mx-auto mt-10 max-w-6xl text-[clamp(3rem,9vw,8.5rem)] uppercase leading-[0.88]">
          {words.map((w, i) => (
            <Word key={i} progress={wordsProgress} range={[i / words.length, (i + 1) / words.length]} accent={accents.has(w.toLowerCase())}>
              {w}
            </Word>
          ))}
        </h2>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-xl text-lg text-muted">{site.vision.supporting}</p>
        </Reveal>
      </div>

      {/* Ventures marquee */}
      <div className="relative mt-24 border-y border-line py-6" aria-hidden>
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap font-display text-3xl uppercase text-fg/30 md:text-6xl">
          {[...ventures, ...ventures, ...ventures, ...ventures].map((v, i) => (
            <span key={i} className="flex items-center gap-12">
              {v.name}
              <span className="text-accent">●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range, accent }: { children: string; progress: MotionValue<number>; range: [number, number]; accent: boolean }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span aria-hidden style={{ opacity }} className={`inline-block ${accent ? "accent-word" : ""}`}>
      {children}&nbsp;
    </motion.span>
  );
}
