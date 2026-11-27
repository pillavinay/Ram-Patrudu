"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";
import { useLoader } from "@/components/layout/Providers";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";
import { EASE } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { RichText } from "@/components/ui/Bits";

/** Camera-viewfinder hero: REC timecode, corner brackets, giant condensed name, greyscale portrait. */
export function Hero() {
  const { ready } = useLoader();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Mouse-reactive red glow
  const mx = useMotionValue(0.7);
  const my = useMotionValue(0.45);
  const smx = useSpring(mx, { stiffness: 50, damping: 18 });
  const smy = useSpring(my, { stiffness: 50, damping: 18 });
  const gx = useTransform(smx, (v) => `${v * 100}%`);
  const gy = useTransform(smy, (v) => `${v * 100}%`);
  const glow = useMotionTemplate`radial-gradient(520px circle at ${gx} ${gy}, color-mix(in oklab, var(--brand-accent) 13%, transparent), transparent 70%)`;
  const px = useTransform(smx, [0, 1], [-10, 10]);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };

  const show = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    transition: { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section id="home" ref={ref} onPointerMove={onMove} className="grain relative min-h-[100svh] overflow-hidden pb-6 pt-20 md:pt-24">
      <motion.div aria-hidden className="absolute inset-0" style={{ background: glow }} />

      {/* Viewfinder frame */}
      <div className="container-x relative flex min-h-[calc(100svh-6.5rem)] flex-col">
        <Corners ready={ready} />

        {/* Top HUD */}
        <motion.div {...show(0.1)} className="relative z-10 flex items-center justify-between px-5 pt-5 md:px-8 md:pt-7">
          <span className="mono-label flex items-center gap-2.5 text-fg">
            <span className="animate-rec h-2.5 w-2.5 rounded-full bg-accent" aria-hidden />
            REC <Timecode />
          </span>
          <span className="mono-label hidden text-muted sm:block">{site.tagline}</span>
        </motion.div>

        <div className="relative grid flex-1 items-end gap-10 px-5 pb-8 md:px-8 lg:grid-cols-12 lg:gap-6">
          {/* Text */}
          <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 pt-10 lg:col-span-8 lg:pb-6">
            <motion.p {...show(0.2)} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="mono-label text-accent">Currently</span>
              <span className="text-sm text-fg md:text-base">{site.designation.join(", ")}</span>
            </motion.p>

            <h1 aria-label={site.name} className="mt-5 text-[clamp(4.6rem,15vw,13.5rem)] uppercase leading-[0.8] tracking-[-0.02em]">
              {site.name.split(" ").map((w, i) => (
                <span key={w} aria-hidden className="block overflow-hidden pb-[0.04em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={ready ? { y: "0%" } : { y: "105%" }}
                    transition={{ duration: 1.1, ease: EASE, delay: 0.25 + i * 0.12 }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <AnimatedHeading
              as="h2"
              text={site.hero.heading}
              accent={site.hero.accent}
              trigger="mount"
              play={ready}
              delay={0.55}
              className="mt-6 text-[clamp(1.8rem,3.6vw,3.2rem)] uppercase leading-[0.95]"
            />

            <motion.p {...show(0.85)} className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              <span className="sr-only">{site.hero.supporting} </span>
              <RichText text={site.hero.intro} />
            </motion.p>

            <motion.div {...show(1)} className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
              <ArrowLink href="/#ventures">Explore my ventures</ArrowLink>
              <ArrowLink href="/#contact">Get in touch</ArrowLink>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            className="relative mx-auto w-full max-w-[420px] lg:absolute lg:bottom-0 lg:right-8 lg:w-[38%] lg:max-w-[520px]"
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1.4, ease: EASE, delay: 0.35 }}
          >
            <div aria-hidden className="absolute -bottom-10 left-1/2 h-[70%] w-[90%] -translate-x-1/2 rounded-full bg-accent/30 blur-[90px]" />
            <motion.div style={{ y: imageY, x: px }} className="relative">
              <ImageSlot
                src={site.images.portrait}
                alt="Portrait of Ram Patrudu"
                label="Ram Patrudu — portrait"
                priority
                className="aspect-[4/5] bg-transparent [mask-image:linear-gradient(to_bottom,black_70%,transparent)]"
                imgClassName="grayscale contrast-110"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom HUD */}
        <motion.div {...show(1.15)} className="relative z-10 flex items-center justify-between px-5 pb-5 md:px-8 md:pb-6">
          <span className="mono-label text-muted">Scroll ↓</span>
          <span className="mono-label hidden text-muted md:block">{site.instagram.handle}</span>
          <span className="mono-label text-muted">{site.location}</span>
        </motion.div>
      </div>
    </section>
  );
}

export function ArrowLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group mono-label inline-flex items-center gap-2 border-b border-fg/40 pb-1.5 text-fg transition-colors hover:border-accent hover:text-accent">
      {children}
      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
    </Link>
  );
}

/** Running camera timecode HH:MM:SS:FF (24 fps) */
function Timecode() {
  const [t, setT] = useState("00:00:00:00");
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const ms = performance.now() - start;
      const f = Math.floor((ms % 1000) / (1000 / 24));
      const s = Math.floor(ms / 1000);
      const pad = (n: number) => String(n).padStart(2, "0");
      setT(`${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`);
    }, 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

function Corners({ ready }: { ready: boolean }) {
  const c = "absolute h-8 w-8 border-fg/50 md:h-12 md:w-12";
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-x-[clamp(1.25rem,4vw,3rem)] inset-y-0"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={ready ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 1.2, ease: EASE }}
    >
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
      <span className="absolute left-1/2 top-1/2 hidden h-5 w-px -translate-x-1/2 -translate-y-1/2 bg-fg/25 lg:block" />
      <span className="absolute left-1/2 top-1/2 hidden h-px w-5 -translate-x-1/2 -translate-y-1/2 bg-fg/25 lg:block" />
    </motion.div>
  );
}
