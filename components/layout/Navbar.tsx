"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ventures, ventureHref } from "@/content/ventures";
import { site } from "@/content/site";
import { VentureLogo } from "@/components/ui/VentureLogo";
import { Arrow } from "@/components/ui/Button";
import { EASE } from "@/components/motion/Reveal";
import { LiveClock } from "@/components/ui/Bits";

type NavItem = { label: string; id: string; href?: string };

const NAV: NavItem[] = [
  { label: "Home", id: "home", href: "/#home" },
  { label: "About", id: "about", href: "/#about" },
  { label: "Ventures", id: "ventures" }, // dropdown
  { label: "Journey", id: "journey", href: "/#journey" },
  { label: "Contact", id: "contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Transparent → solid background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently on screen (homepage) or "Ventures" on company pages
  useEffect(() => {
    if (pathname?.startsWith("/ventures")) {
      setActive("ventures");
      return;
    }
    const ids = NAV.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  // Close the mobile menu on navigation, lock page scroll while open
  useEffect(() => setMobileOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-[var(--ease-premium)] ${
        // no backdrop-blur while the mobile menu is open (blur would trap the fixed menu inside the header)
        mobileOpen
          ? "border-b border-transparent bg-transparent"
          : scrolled
            ? "border-b border-line bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main" className={`container-x relative z-10 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-20 md:h-24"}`}>
        <Link href="/#home" className="relative z-10 flex items-center gap-2 font-display text-[1.7rem] leading-none" aria-label="Ram Patrudu — home">
          RP<span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) =>
            item.id === "ventures" ? (
              <li key={item.id}>
                <VenturesDropdown active={active === "ventures"} />
              </li>
            ) : (
              <li key={item.id}>
                <NavLink href={item.href!} active={active === item.id}>
                  {item.label}
                </NavLink>
              </li>
            )
          )}
        </ul>

        <div className="flex items-center gap-3">
          <LiveClock timeZone={site.timeZone} location={site.location} className="mono-label hidden text-fg xl:inline" />
          <Link
            href="/#contact"
            className="mono-label hidden rounded-full border border-fg/40 px-4 py-2.5 text-fg transition-colors hover:border-fg hover:bg-fg hover:text-bg sm:inline-flex"
          >
            Contact ↓
          </Link>
          <button
            type="button"
            className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-line lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-px w-5 bg-fg transition-all duration-300 ${mobileOpen ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-5 bg-fg transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-5 bg-fg transition-all duration-300 ${mobileOpen ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} active={active} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`mono-label relative px-3 py-2 transition-colors ${active ? "text-fg" : "text-muted hover:text-fg"}`}
    >
      {children}
      <span
        className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-premium)] ${
          active ? "scale-x-100" : "scale-x-0"
        }`}
      />
    </Link>
  );
}

function VenturesDropdown({ active }: { active: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const openNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }, []);
  const closeSoon = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setOpen(false), 160);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Escape key + click outside close the menu
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="ventures-menu"
        onClick={() => setOpen((o) => !o)}
        className={`mono-label relative flex items-center gap-1.5 px-3 py-2 transition-colors ${active || open ? "text-fg" : "text-muted hover:text-fg"}`}
      >
        Ventures
        <svg aria-hidden viewBox="0 0 24 24" className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m6 9 6 6 6-6" />
        </svg>
        <span
          className={`absolute inset-x-3 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-500 ease-[var(--ease-premium)] ${
            active ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </button>

      <div className="absolute left-1/2 top-full -translate-x-1/2 pt-4">
        <AnimatePresence>
          {open && (
            <motion.div
              id="ventures-menu"
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="w-[380px] origin-top rounded-2xl border border-line bg-surface/95 p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl"
            >
              <ul>
                {ventures.map((v, i) => {
                  const current = pathname === ventureHref(v.slug) || pathname === ventureHref(v.slug).slice(0, -1);
                  return (
                    <motion.li key={v.slug} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i + 0.05 }}>
                      <Link
                        href={ventureHref(v.slug)}
                        aria-current={current ? "page" : undefined}
                        className={`group flex items-center gap-4 rounded-xl p-3 transition-colors hover:bg-white/[0.04] ${current ? "bg-white/[0.05]" : ""}`}
                      >
                        <VentureLogo venture={v} size={40} />
                        <span className="flex-1">
                          <span className="block font-display text-xl uppercase leading-tight">{v.name}</span>
                          <span className="mono-label block text-[10px] text-muted">{v.category.startsWith("[") ? "Venture" : v.category}</span>
                        </span>
                        <Arrow className="text-muted group-hover:text-accent" />
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <Link href="/#ventures" className="mono-label mt-1 flex items-center justify-between rounded-xl border-t border-line px-3 pb-2 pt-3 text-muted hover:text-accent">
                All ventures <Arrow />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileMenu({ open, active, onClose }: { open: boolean; active: string; onClose: () => void }) {
  const [venturesOpen, setVenturesOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="fixed inset-0 z-0 flex h-[100svh] flex-col overflow-y-auto bg-bg px-6 pb-10 pt-28 lg:hidden"
        >
          <ul className="space-y-1">
            {NAV.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                className="border-b border-line"
              >
                {item.id === "ventures" ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={venturesOpen}
                      onClick={() => setVenturesOpen((o) => !o)}
                      className={`flex w-full items-center justify-between py-4 font-display text-5xl uppercase ${active === "ventures" ? "text-accent" : ""}`}
                    >
                      Ventures
                      <svg aria-hidden viewBox="0 0 24 24" className={`h-6 w-6 transition-transform ${venturesOpen ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                    <AnimatePresence initial={false}>
                      {venturesOpen && (
                        <motion.ul initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                          {ventures.map((v) => (
                            <li key={v.slug}>
                              <Link href={ventureHref(v.slug)} onClick={onClose} className="flex items-center gap-3 py-3 pl-1 text-lg text-muted hover:text-fg">
                                <VentureLogo venture={v} size={30} />
                                {v.name}
                              </Link>
                            </li>
                          ))}
                          <li className="pb-4" />
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href={item.href!} onClick={onClose} className={`block py-4 font-display text-5xl uppercase ${active === item.id ? "text-accent" : ""}`}>
                    {item.label}
                  </Link>
                )}
              </motion.li>
            ))}
          </ul>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mono-label mt-auto flex justify-between pt-10 text-muted">
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
              {site.instagram.handle} ↗
            </a>
            <LiveClock timeZone={site.timeZone} location={site.location} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
