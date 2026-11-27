"use client";

import { useEffect, useRef, useState } from "react";
import type { Venture } from "@/content/ventures";

/** Company logo from /public/images/ventures/<slug>/logo.png, or a monogram until it's added. */
export function VentureLogo({ venture, size = 48, className = "" }: { venture: Venture; size?: number; className?: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  const box = { width: size, height: size, ["--venture-accent" as string]: venture.accent, ["--venture-ink" as string]: venture.accentInk };

  if (!failed)
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={ref}
        src={venture.images.logo}
        alt={`${venture.name} logo`}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        className={`object-contain ${className}`}
        style={{ width: size, height: size }}
      />
    );

  return (
    <span
      aria-label={`${venture.name} logo`}
      role="img"
      style={box}
      className={`inline-grid shrink-0 place-items-center rounded-full bg-v font-display text-v-ink ${className}`}
    >
      <span style={{ fontSize: venture.monogram.length > 1 ? size * 0.26 : size * 0.46 }} className="leading-none tracking-tight">
        {venture.monogram}
      </span>
    </span>
  );
}
