"use client";

import { m } from "motion/react";
import { easeOut, revealViewport } from "@/components/motion/motion-variants";
import { cn } from "@/lib/utils";

/** A hairline that draws itself in when scrolled into view (decorative). */
export function DrawLine({ axis = "x", className }: { axis?: "x" | "y"; className?: string }) {
  return (
    <m.span
      aria-hidden
      data-reveal=""
      className={cn("block bg-accent", axis === "x" ? "origin-left" : "origin-top", className)}
      initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={revealViewport}
      transition={{ duration: 1.4, ease: easeOut, delay: 0.15 }}
    />
  );
}
