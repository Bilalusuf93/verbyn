"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import type { Variants } from "motion/react";
import { enterTransition, fadeUp, revealViewport, stagger } from "@/components/motion/motion-variants";

const withDelay = (delay: number): Variants => ({
  hidden: fadeUp.hidden,
  visible: { opacity: 1, y: 0, transition: { ...enterTransition, delay } },
});

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a stagger group; direct <RevealItem> children animate in sequence. */
  group?: boolean;
  staggerBy?: number;
  delay?: number;
  as?: "div" | "ul" | "ol" | "li" | "section" | "article";
};

/**
 * Scroll reveal. Elements carry data-reveal so the <noscript> rule in
 * layout.tsx can force them visible when JavaScript is unavailable.
 */
export function Reveal({ children, className, group, staggerBy = 0.08, delay = 0, as = "div" }: RevealProps) {
  const Comp = m[as];
  return (
    <Comp
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={group ? stagger(staggerBy, delay) : delay ? withDelay(delay) : fadeUp}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = m[as];
  return (
    <Comp data-reveal="" className={className} variants={fadeUp}>
      {children}
    </Comp>
  );
}
