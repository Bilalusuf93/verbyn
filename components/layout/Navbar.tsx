"use client";

import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { easeOut } from "@/components/motion/motion-variants";
import { navigation } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const sectionIds = navigation.map((n) => n.href.slice(1));

/** Highlights the nav link of the section currently crossing the viewport middle. */
function useActiveSection() {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const els = sectionIds.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return active;
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Lock page scroll, close on Escape, and close if resized to desktop.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        // Keep focus inside toggle + panel while the menu is open.
        const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          (el): el is HTMLElement => !!el,
        );
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open, close]);

  // Mobile links: close first, release the scroll lock, then scroll.
  const onMobileNav = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    close(false);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Two frames: let the effect cleanup release the scroll lock before scrolling.
    requestAnimationFrame(() => requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", href);
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }));
  };

  const solid = scrolled || open;

  return (
    <>
    <header
      className={cn(
        "enter-nav fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        solid ? "border-line bg-bg/80 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Primary" className="container-site flex h-(--nav-h) items-center justify-between gap-6">
        <a href="#top" className="-m-2 rounded-lg p-2 text-[1.15rem]" aria-label="Back to top">
          <Wordmark />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative py-2 text-sm transition-colors duration-200",
                      isActive ? "text-fg" : "text-fg-muted hover:text-fg",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-[opacity,transform] duration-300",
                        isActive ? "scale-100 opacity-100" : "scale-0 opacity-0",
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
          <ButtonLink href="#contact" size="md" className="h-10">
            Start a Project
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 inline-flex size-11 items-center justify-center rounded-full text-fg md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <AnimatePresence initial={false} mode="wait">
            <m.span
              key={open ? "x" : "menu"}
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.18 }}
              className="inline-flex"
            >
              {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            </m.span>
          </AnimatePresence>
        </button>
      </nav>
    </header>

      {/* Sibling of <header>: its backdrop-filter would otherwise become the
          containing block for this fixed panel. */}
      <AnimatePresence>
        {open ? (
          <m.div
            ref={panelRef}
            id="mobile-menu"
            key="mobile-menu"
            className="fixed inset-x-0 top-(--nav-h) bottom-0 z-40 overflow-y-auto border-t border-line bg-bg md:hidden"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: easeOut }}
          >
            <div className="container-site flex min-h-full flex-col justify-between gap-12 py-10">
              <m.ul
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                {navigation.map((item, i) => (
                  <m.li
                    key={item.href}
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="border-b border-line"
                  >
                    <a
                      href={item.href}
                      onClick={(e) => onMobileNav(e, item.href)}
                      className="flex items-baseline justify-between py-5 text-[2rem] font-semibold tracking-[-0.03em] text-fg"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-fg-subtle">0{i + 1}</span>
                    </a>
                  </m.li>
                ))}
              </m.ul>
              <a
                href="#contact"
                onClick={(e) => onMobileNav(e, "#contact")}
                className="inline-flex h-14 items-center justify-center rounded-full bg-accent font-medium text-accent-ink"
              >
                Start a Project
              </a>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
