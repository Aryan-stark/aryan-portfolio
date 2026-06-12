"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARSET = "ABCDEF0123456789<>/\\|#";

/**
 * HUD-style "decrypt" reveal: characters scramble, then resolve left-to-right
 * once the element scrolls into view. Renders a plain <span> so it can sit
 * inside headings next to accent spans.
 */
export function DecryptText({
  text,
  delay = 0,
  duration = 900,
}: {
  text: string;
  /** ms before the decrypt starts after entering the viewport */
  delay?: number;
  /** total resolve time in ms */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Under reduced motion the render path shows the final text directly.
    if (!inView || done || reduced) return;

    let rafId = 0;
    let start = 0;
    const scramble = (resolved: number) =>
      text
        .split("")
        .map((ch, i) => {
          if (ch === " " || i < resolved) return ch;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

    const tick = (t: number) => {
      if (!start) start = t;
      const elapsed = t - start - delay;
      if (elapsed < 0) {
        setDisplay(scramble(0));
        rafId = requestAnimationFrame(tick);
        return;
      }
      const progress = Math.min(1, elapsed / duration);
      const resolved = Math.floor(progress * text.length);
      if (progress >= 1) {
        setDisplay(text);
        setDone(true);
        return;
      }
      setDisplay(scramble(resolved));
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView, done, reduced, text, delay, duration]);

  return (
    <span ref={ref} aria-label={text}>
      <span aria-hidden>{done || reduced ? text : display}</span>
    </span>
  );
}
