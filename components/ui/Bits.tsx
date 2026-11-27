"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatedHeading } from "@/components/motion/AnimatedHeading";

/** Big condensed section title (like "About" on the reference), with optional controls on the right. */
export function SectionTitle({
  title,
  accent,
  label,
  right,
  className = "",
}: {
  title: string;
  accent?: string;
  label?: string;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6 ${className}`}>
      <div>
        {label && <p className="mono-label mb-4 text-accent">{label}</p>}
        <AnimatedHeading text={title} accent={accent} className="text-[clamp(3.4rem,9vw,8.5rem)] leading-[0.85]" />
      </div>
      {right}
    </div>
  );
}

/** ← → arrow buttons (used by carousels). */
export function ArrowControls({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  const cls =
    "grid h-12 w-12 place-items-center rounded-full border border-line text-lg transition-colors hover:border-fg hover:bg-fg hover:text-bg";
  return (
    <div className="flex gap-2" role="group" aria-label={`${label} controls`}>
      <button type="button" className={cls} onClick={onPrev} aria-label={`Previous ${label}`}>
        ←
      </button>
      <button type="button" className={cls} onClick={onNext} aria-label={`Next ${label}`}>
        →
      </button>
    </div>
  );
}

/** Counts up from 0 when scrolled into view. Works with "45.6K", "361", "3,229", "₹3.7 Cr", "12+". */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num.replace(/,/g, ""));
    const decimals = (num.split(".")[1] || "").length;
    const commas = num.includes(",");
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      return `${pre}${commas ? Number(fixed).toLocaleString("en-IN", { minimumFractionDigits: decimals }) : fixed}${post}`;
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;
    setDisplay(format(0));
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / 1800);
        setDisplay(format(target * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {display}
    </span>
  );
}

/** Turns "**bold** text" into text with <strong> parts. */
export function RichText({ text, boldClass = "font-semibold text-fg" }: { text: string; boldClass?: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <strong key={i} className={boldClass}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/** Highlights one phrase inside a sentence with the accent colour. */
export function Highlight({ text, phrase }: { text: string; phrase?: string }) {
  if (!phrase || !text.includes(phrase)) return <>{text}</>;
  const [a, b] = text.split(phrase);
  return (
    <>
      {a}
      <span className="accent-word">{phrase}</span>
      {b}
    </>
  );
}

/** Live clock, e.g. "India 16:34" */
export function LiveClock({ timeZone, location, className = "" }: { timeZone: string; location: string; className?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, [timeZone]);
  return (
    <span className={className} suppressHydrationWarning>
      {location} <span className="tabular-nums">{time || "--:--"}</span>
    </span>
  );
}

/** Copy-to-clipboard button with "Copied" feedback. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };
  return (
    <button type="button" onClick={copy} className="mono-label rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:border-fg hover:text-fg" aria-label={`Copy ${label}`}>
      <span aria-live="polite">{copied ? "Copied ✓" : "Copy"}</span>
    </button>
  );
}
