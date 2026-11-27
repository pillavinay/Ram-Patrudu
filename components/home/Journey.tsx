"use client";

import { useRef } from "react";
import { journey } from "@/content/journey";
import { DragScroller, type DragScrollerHandle } from "./DragScroller";
import { ArrowControls, SectionTitle } from "@/components/ui/Bits";

/** Numbered career-style timeline you can drag or move with ← → (like "Career" on the reference). */
export function Journey() {
  const scroller = useRef<DragScrollerHandle>(null);
  return (
    <section id="journey" className="py-24 md:py-32">
      <div className="container-x">
        <SectionTitle
          label="The entrepreneurial journey"
          title="Journey"
          right={<ArrowControls label="journey step" onPrev={() => scroller.current?.prev()} onNext={() => scroller.current?.next()} />}
        />
      </div>

      <DragScroller ref={scroller} label="Journey timeline — drag to explore" className="mt-10 pl-[max(1.25rem,calc((100vw-1320px)/2+3rem))]">
        {journey.map((item, i) => (
          <article key={item.stage} className="group flex w-[80vw] shrink-0 flex-col sm:w-[380px]">
            <div className="mono-label rounded-t-xl border border-b-0 border-line px-4 py-3 text-accent">
              {item.stage}
            </div>
            <div className="flex flex-1 flex-col rounded-b-xl border border-line p-6 transition-colors duration-500 group-hover:bg-surface md:p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-7xl leading-none text-fg/15 transition-colors duration-500 group-hover:text-accent">
                  {i + 1}
                </span>
                <span className="mono-label text-muted">{item.year}</span>
              </div>
              <h3 className="mt-8 text-3xl uppercase">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
            </div>
          </article>
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </DragScroller>
    </section>
  );
}
