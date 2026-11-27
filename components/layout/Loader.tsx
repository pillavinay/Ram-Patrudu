"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE } from "@/components/motion/Reveal";

const KEY = "rp-loaded";

/**
 * Premium intro loader — shown once per browser session.
 * On repeat visits an inline script (app/layout.tsx) hides it before the first paint.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const seen = document.documentElement.classList.contains("rp-seen");
    if (seen) {
      setVisible(false);
      onDone();
      return;
    }
    const start = performance.now();
    const duration = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.round(100 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          setVisible(false);
          onDone();
        }, 250);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="rp-loader"
          aria-hidden
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div className="mono-label flex justify-between text-muted">
            <span className="flex items-center gap-2.5 text-fg">
              <span className="animate-rec h-2.5 w-2.5 rounded-full bg-accent" /> REC
            </span>
            <span>Dreams to Ventures</span>
          </div>

          <div className="overflow-hidden">
            <motion.p
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease: EASE }}
              className="font-display text-[clamp(3.5rem,15vw,14rem)] uppercase leading-[0.85]"
            >
              Ram <span className="accent-word">Patrudu</span>
            </motion.p>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-line">
              <div className="h-px bg-accent transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
            <span className="mono-label tabular-nums text-fg">{String(count).padStart(3, "0")}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
