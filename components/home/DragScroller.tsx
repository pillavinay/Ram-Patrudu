"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { forwardRef, useImperativeHandle, useRef, type ReactNode } from "react";

export type DragScrollerHandle = { prev: () => void; next: () => void };

/**
 * Horizontal row you can drag with the mouse, swipe on touch, or move with ← → buttons.
 * Shows a thin accent progress line underneath.
 */
export const DragScroller = forwardRef<DragScrollerHandle, { children: ReactNode; className?: string; label: string }>(
  function DragScroller({ children, className = "", label }, ref) {
    const el = useRef<HTMLDivElement>(null);
    const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
    const progress = useMotionValue(0);
    const smooth = useSpring(progress, { stiffness: 120, damping: 24 });

    const step = () => {
      const first = el.current?.firstElementChild as HTMLElement | null;
      return first ? first.offsetWidth + 24 : 320;
    };
    useImperativeHandle(ref, () => ({
      prev: () => el.current?.scrollBy({ left: -step(), behavior: "smooth" }),
      next: () => el.current?.scrollBy({ left: step(), behavior: "smooth" }),
    }));

    const onScroll = () => {
      const s = el.current;
      if (!s) return;
      const max = s.scrollWidth - s.clientWidth;
      progress.set(max > 0 ? s.scrollLeft / max : 0);
    };

    const onDown = (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse" || !el.current) return;
      drag.current = { active: true, startX: e.clientX, startLeft: el.current.scrollLeft, moved: false };
    };
    const onMove = (e: React.PointerEvent) => {
      const d = drag.current;
      if (!d.active || !el.current) return;
      const dx = e.clientX - d.startX;
      if (Math.abs(dx) > 5) d.moved = true;
      el.current.scrollLeft = d.startLeft - dx;
    };
    const onUp = () => {
      drag.current.active = false;
    };
    // Stop a click on a card from firing after a drag
    const onClickCapture = (e: React.MouseEvent) => {
      if (drag.current.moved) {
        e.preventDefault();
        e.stopPropagation();
        drag.current.moved = false;
      }
    };

    return (
      <div className={className}>
        <div
          ref={el}
          role="region"
          aria-label={label}
          tabIndex={0}
          onScroll={onScroll}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerLeave={onUp}
          onClickCapture={onClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className="flex select-none gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
        <div className="mt-8 h-px w-full bg-line" aria-hidden>
          <motion.div className="h-px origin-left bg-accent" style={{ scaleX: smooth }} />
        </div>
      </div>
    );
  }
);
