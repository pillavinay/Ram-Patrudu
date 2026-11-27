"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Shows an image from /public. If the file does not exist yet, an elegant
 * placeholder is shown instead — so you can add photos later without
 * changing any code. Just drop the file at the path in `src`.
 */
export function ImageSlot({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  priority = false,
  quiet = false,
}: {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** hide the placeholder text (for full-bleed background images) */
  quiet?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  const ref = useRef<HTMLImageElement>(null);

  // The image may fail before React hydrates — check once mounted.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {!failed && src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 grid place-items-center"
          style={{
            background:
              "radial-gradient(120% 80% at 20% 0%, color-mix(in oklab, var(--venture-accent, var(--brand-accent)) 22%, transparent), transparent 60%), radial-gradient(90% 70% at 100% 100%, color-mix(in oklab, var(--venture-accent, var(--brand-accent)) 12%, transparent), transparent 60%), linear-gradient(160deg, var(--brand-surface-2), var(--brand-surface))",
          }}
        >
          <div className={`px-6 text-center ${quiet ? "hidden" : ""}`}>
            <svg aria-hidden viewBox="0 0 24 24" className="mx-auto mb-3 h-6 w-6 text-v/70" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="m21 16-5-5-9 9" />
            </svg>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-muted">Image</span>
            {label && <span className="mt-1.5 block font-display text-base text-fg/70">{label}</span>}
            {process.env.NODE_ENV !== "production" && src && (
              <code className="mt-1 block text-[10px] text-muted/70">public{src}</code>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
