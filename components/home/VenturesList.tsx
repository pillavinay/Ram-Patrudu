"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useMemo, useState } from "react";
import { ventures, ventureHref, type Venture } from "@/content/ventures";
import { SectionTitle } from "@/components/ui/Bits";
import { Reveal } from "@/components/motion/Reveal";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { VentureLogo } from "@/components/ui/VentureLogo";

const label = (v: Venture) => (v.category.startsWith("[") ? "Venture" : v.category);

/** Ventures as an interactive list: hover a row to see a floating image preview; filter by category. */
export function VenturesList() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(ventures.map(label)))], []);
  const [filter, setFilter] = useState("All");
  const [hovered, setHovered] = useState<Venture | null>(null);
  const shown = ventures.filter((v) => filter === "All" || label(v) === filter);

  // Floating preview follows the mouse
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 26 });
  const sy = useSpring(y, { stiffness: 220, damping: 26 });

  return (
    <section id="ventures" className="relative py-24 md:py-32" onPointerMove={(e) => { x.set(e.clientX); y.set(e.clientY); }}>
      <div className="container-x">
        <SectionTitle
          label="Dreams turned into ventures."
          title="Ventures"
          right={
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter ventures">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  className={`mono-label rounded-full border px-4 py-2 transition-colors ${filter === c ? "border-fg bg-fg text-bg" : "border-line text-muted hover:text-fg"}`}
                >
                  {c}
                </button>
              ))}
              {filter !== "All" && (
                <button type="button" onClick={() => setFilter("All")} className="mono-label px-2 text-muted hover:text-accent">
                  Clear ✕
                </button>
              )}
            </div>
          }
        />

        <ul className="mt-2" onPointerLeave={() => setHovered(null)}>
          <AnimatePresence initial={false}>
            {shown.map((v) => {
              const i = ventures.indexOf(v);
              return (
                <motion.li
                  key={v.slug}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-line"
                >
                  <Reveal y={16}>
                    <Link
                      href={ventureHref(v.slug)}
                      onPointerEnter={() => setHovered(v)}
                      onFocus={() => setHovered(v)}
                      onBlur={() => setHovered(null)}
                      style={{ ["--venture-accent" as string]: v.accent, ["--venture-ink" as string]: v.accentInk }}
                      className="group grid items-center gap-x-6 gap-y-3 py-7 md:grid-cols-12 md:py-9"
                    >
                      <span className="mono-label text-muted md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex items-center gap-5 md:col-span-5">
                        <VentureLogo venture={v} size={48} className="shrink-0 transition-transform duration-500 group-hover:scale-110" />
                        <span className="font-display text-[clamp(2.2rem,4.6vw,4.2rem)] uppercase leading-none transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:text-v">
                          {v.name}
                        </span>
                      </span>
                      <span className="text-sm leading-relaxed text-muted md:col-span-3">{v.shortDescription}</span>
                      <span className="mono-label flex items-center justify-between gap-4 text-muted md:col-span-3 md:justify-end">
                        <span>
                          {label(v)} · {v.role} · {v.year}
                        </span>
                        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line text-base text-fg transition-all duration-500 group-hover:border-v group-hover:bg-v group-hover:text-v-ink">
                          →
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
        <p className="mono-label mt-8 text-muted">Click a venture to open its page →</p>
      </div>

      {/* Floating image preview (desktop only) */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            key="preview"
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
            style={{ x: sx, y: sy, ["--venture-accent" as string]: hovered.accent }}
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageSlot
              key={hovered.slug}
              src={hovered.images.card}
              alt=""
              label={hovered.name}
              className="-ml-[160px] -mt-[220px] aspect-[4/3] w-[320px] rounded-2xl border border-line shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
