/*
  Motion tokens — the single source of truth for the template's motion.
  Literal values, defined once, referenced everywhere (the reference-to-spec discipline).
  Do not scatter durations/easings inside components. Import from here.

  Note: the Figma template is static (no prototype motion to extract), so these are
  DELIBERATE authored values, not measured from a reference. They are intentionally
  restrained: one signature reveal per section, no parallax, no loops.
*/

// Easing (literal cubic-bezier arrays).
export const EASE = [0.16, 1, 0.3, 1] as const; // primary reveal — easeOutExpo feel
export const EASE_FAST = [0.4, 0, 0.2, 1] as const; // hover / tap

// Durations (seconds).
export const DUR = 0.55; // reveal
export const DUR_HOVER = 0.18;

// Distances / rhythm.
export const RISE = 20; // reveal translateY (px)
export const STAGGER = 0.08; // per-child delay (s)

// Shared viewport trigger for scroll reveals: fire once, slightly before fully in view.
export const VIEWPORT = { once: true, margin: "-10% 0px" } as const;

// framer-motion props for a scroll reveal. `reduce` gates the whole thing:
// when the user prefers reduced motion, render the final state with no animation.
export function reveal(reduce: boolean | null, delay = 0) {
  if (reduce) return { initial: false as const };
  return {
    initial: { opacity: 0, y: RISE },
    whileInView: { opacity: 1, y: 0 },
    viewport: VIEWPORT,
    transition: { duration: DUR, ease: EASE, delay },
  };
}

// framer-motion props for a mount reveal (hero, above the fold).
export function riseIn(reduce: boolean | null, delay = 0) {
  if (reduce) return { initial: false as const };
  return {
    initial: { opacity: 0, y: RISE },
    animate: { opacity: 1, y: 0 },
    transition: { duration: DUR, ease: EASE, delay },
  };
}
