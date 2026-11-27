"use client";

import { useRef } from "react";
import { highlights } from "@/content/highlights";
import { DragScroller, type DragScrollerHandle } from "./DragScroller";
import { ArrowControls, SectionTitle } from "@/components/ui/Bits";
import { ImageSlot } from "@/components/ui/ImageSlot";

export function Highlights() {
  const scroller = useRef<DragScrollerHandle>(null);
  return (
    <section id="highlights" className="py-24 md:py-32">
      <div className="container-x">
        <SectionTitle
          title="Highlights"
          right={
            <div className="flex items-center gap-5">
              <span className="mono-label hidden text-muted sm:block">Drag to explore</span>
              <ArrowControls label="highlight" onPrev={() => scroller.current?.prev()} onNext={() => scroller.current?.next()} />
            </div>
          }
        />
      </div>
      <DragScroller ref={scroller} label="Highlights — drag to explore" className="mt-10 pl-[max(1.25rem,calc((100vw-1320px)/2+3rem))]">
        {highlights.map((h, i) => {
          const Card = (
            <>
              <ImageSlot
                src={h.image}
                alt={h.title}
                label={`Highlight ${i + 1}`}
                className="aspect-[4/5] rounded-2xl border border-line"
                imgClassName="grayscale transition-all duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
              />
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-2xl uppercase">{h.title}</p>
                  <p className="mt-1 text-sm text-muted">{h.caption}</p>
                </div>
                <span className="mono-label text-accent">{String(i + 1).padStart(2, "0")}</span>
              </div>
            </>
          );
          return (
            <article key={i} className="group w-[72vw] shrink-0 sm:w-[340px]">
              {h.href ? (
                <a href={h.href} target="_blank" rel="noopener noreferrer" draggable={false}>
                  {Card}
                </a>
              ) : (
                Card
              )}
            </article>
          );
        })}
        <div className="w-4 shrink-0" aria-hidden />
      </DragScroller>
    </section>
  );
}
