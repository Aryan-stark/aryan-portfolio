"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  /** Giant ghost word rendered behind the section content. */
  word: string;
  /** Stroke color of the ghost word. */
  tint?: "white" | "gold" | "holo";
  /** Ambient radial glow. */
  glow?: "gold" | "holo" | "none";
  /** Decorative grid/texture layer. */
  grid?: "blueprint" | "scanlines" | "none";
  /** md = smaller ghost word (footer name). */
  size?: "lg" | "md";
  /** Position overrides for the ghost word. */
  wordClassName?: string;
};

// Decorative identity layer for content sections: ambient glow + optional
// grid texture + a giant outlined word drifting slowly with scroll. The host
// section must be `relative overflow-hidden`, with its content `relative` so
// it stacks above this backdrop.
export function SectionBackdrop({
  word,
  tint = "white",
  glow = "none",
  grid = "none",
  size = "lg",
  wordClassName = "left-1/2 top-10",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const tintClass =
    tint === "gold"
      ? "ghost-word--accent"
      : tint === "holo"
      ? "ghost-word--holo"
      : "";

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {glow !== "none" && (
        <div
          className={`absolute inset-0 ${
            glow === "gold" ? "section-glow-gold" : "section-glow-holo"
          }`}
        />
      )}
      {grid !== "none" && (
        <div
          className={`absolute inset-0 ${
            grid === "blueprint" ? "blueprint-grid" : "scanlines"
          }`}
        />
      )}
      <motion.span
        className={`ghost-word ${tintClass} ${
          size === "md" ? "ghost-word--md" : ""
        } absolute ${wordClassName}`}
        style={{ x: "-50%", y: reduced ? 0 : y }}
      >
        {word}
      </motion.span>
    </div>
  );
}
