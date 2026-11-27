import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  solid: "bg-v text-v-ink hover:brightness-110 shadow-[0_10px_40px_-12px_var(--venture-accent, var(--brand-accent))]",
  outline: "border border-line text-fg hover:border-v hover:text-v",
  ghost: "text-fg hover:text-v",
};

/** Pill button that works for internal links, external links and plain buttons. */
export function Button({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
  arrow = false,
  onClick,
  type = "button",
  disabled,
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = `group inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-500 ease-[var(--ease-premium)] disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );

  if (href && external)
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  if (href)
    return (
      <Link href={href} className={cls} onClick={onClick}>
        {inner}
      </Link>
    );
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {inner}
    </button>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover:translate-x-1 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
