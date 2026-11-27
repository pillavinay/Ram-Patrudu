"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Dot cursor (as on the reference site):
 * a small white dot replaces the mouse pointer and uses `mix-blend-mode: difference`,
 * so it turns black over white text/images and white over dark backgrounds.
 * Over links/buttons it grows so the text underneath is inverted.
 *
 * Only on desktop mouse devices; disabled for touch screens and reduced-motion users.
 */
const DOT = 12; // dot size in px
const HOVER_SCALE = 3.4; // size multiplier over links & buttons — set to 1 for "no grow"

export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.25 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    document.documentElement.classList.add("has-dot-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as Element | null;
      setHovering(!!t?.closest?.("a, button, summary, label, [data-cursor='hover']"));
    };
    const leave = () => setVisible(false);
    const press = () => setDown(true);
    const release = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    window.addEventListener("pointerdown", press);
    window.addEventListener("pointerup", release);
    return () => {
      document.documentElement.classList.remove("has-dot-cursor");
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[400] rounded-full bg-white mix-blend-difference"
      style={{ x: sx, y: sy, width: DOT, height: DOT, marginLeft: -DOT / 2, marginTop: -DOT / 2 }}
      animate={{ scale: down ? 0.7 : hovering ? HOVER_SCALE : 1, opacity: visible ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    />
  );
}
