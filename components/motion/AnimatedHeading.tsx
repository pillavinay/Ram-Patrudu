"use client";

import { motion } from "framer-motion";
import { EASE } from "./Reveal";

type Props = {
  text: string;
  /** Word(s) to show in italic accent colour, e.g. "Ventures." or ["Courage", "Build."] */
  accent?: string | readonly string[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
  /** "view" = animate when scrolled into view, "mount" = animate when `play` becomes true */
  trigger?: "view" | "mount";
  play?: boolean;
};

/** Heading whose words slide up one after another from behind a mask. */
export function AnimatedHeading({
  text,
  accent,
  as = "h2",
  className,
  delay = 0,
  trigger = "view",
  play = true,
}: Props) {
  const Tag = as;
  const accents = new Set((Array.isArray(accent) ? accent : accent ? (accent as string).split(" ") : []).map(clean));
  const words = text.split(" ");

  const animateProps =
    trigger === "view"
      ? { whileInView: { y: "0%" }, viewport: { once: true, margin: "-40px" } }
      : { animate: play ? { y: "0%" } : { y: "110%" } };

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom">
          <motion.span
            className={`inline-block will-change-transform ${accents.has(clean(word)) ? "accent-word" : ""}`}
            initial={{ y: "110%" }}
            {...animateProps}
            transition={{ duration: 1, ease: EASE, delay: delay + i * 0.07 }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}

function clean(w: string) {
  return w.toLowerCase();
}
