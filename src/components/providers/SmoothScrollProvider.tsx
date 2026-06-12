"use client";

import { useEffect, useRef } from "react";
import { MotionConfig } from "framer-motion";
import Lenis from "lenis";

type Props = { children: React.ReactNode };

// Module-level singleton so other client components (e.g. the command
// palette) can drive programmatic smooth scrolling or pause Lenis.
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function SmoothScrollProvider({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect reduced-motion: fall back to native scrolling entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      duration: 1.2,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;
    lenisInstance = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  // reducedMotion="user" lets framer-motion drop transform/layout animations
  // for users who prefer reduced motion, app-wide, with no per-component work.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
