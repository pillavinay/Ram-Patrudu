import Link from "next/link";
import { ventures, ventureHref } from "@/content/ventures";
import { VentureLogo } from "@/components/ui/VentureLogo";

/** Looping logo band of the four ventures (like the "Brands" strip on the reference). Pauses on hover. */
export function VenturesStrip() {
  const loop = [...ventures, ...ventures, ...ventures, ...ventures];
  return (
    <section aria-label="Ventures" className="group/strip border-y border-line py-8">
      <div className="container-x mb-6 flex items-center justify-between">
        <p className="mono-label text-muted">Building</p>
        <p className="mono-label text-muted">{ventures.length} ventures</p>
      </div>
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <ul className="animate-marquee flex w-max gap-4 group-hover/strip:[animation-play-state:paused]">
          {loop.map((v, i) => (
            <li key={i} aria-hidden={i >= ventures.length || undefined}>
              <Link
                href={ventureHref(v.slug)}
                tabIndex={i >= ventures.length ? -1 : undefined}
                style={{ ["--venture-accent" as string]: v.accent, ["--venture-ink" as string]: v.accentInk }}
                className="flex h-24 w-[280px] items-center gap-4 rounded-2xl border border-line px-6 grayscale transition-all duration-500 hover:border-v/60 hover:bg-surface hover:grayscale-0 md:w-[320px]"
              >
                <VentureLogo venture={v} size={44} />
                <span className="font-display text-2xl uppercase">{v.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
