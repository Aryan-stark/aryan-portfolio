"use client";

import { useEffect } from "react";

/**
 * Document-level mouse-spotlight driver for `.card-surface` cards.
 *
 * Renders nothing — a single delegated pointermove listener writes the
 * pointer position (relative to the hovered card) into `--mx` / `--my`,
 * which the `.card-surface::before` radial gradient in globals.css reads.
 */
export function SpotlightEffect() {
  useEffect(() => {
    // Hover-driven effect; pointless on touch devices.
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId = 0;
    let pending: PointerEvent | null = null;

    const apply = () => {
      rafId = 0;
      const e = pending;
      pending = null;
      if (!e) return;
      const card = (e.target as Element | null)?.closest?.(".card-surface");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    const onMove = (e: PointerEvent) => {
      pending = e;
      if (!rafId) rafId = requestAnimationFrame(apply);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
