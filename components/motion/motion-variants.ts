import type { Transition, Variants } from "motion/react";

/** Shared easing — matches --ease-out in globals.css. */
export const easeOut = [0.22, 1, 0.36, 1] as const;

export const durations = {
  micro: 0.2,
  base: 0.35,
  enter: 0.7,
} as const;

export const enterTransition: Transition = { duration: durations.enter, ease: easeOut };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: enterTransition },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: enterTransition },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Viewport settings for scroll reveals: fire once, slightly before fully in view. */
export const revealViewport = { once: true, amount: 0.2, margin: "0px 0px -8% 0px" } as const;
