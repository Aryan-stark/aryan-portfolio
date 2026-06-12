"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, [role='option']";

/**
 * HUD reticle companion cursor — a lagging targeting ring + gold dot that
 * follows the pointer. The native cursor stays visible (deliberate: hiding it
 * hurts text selection and usability). Desktop pointers only; skipped under
 * prefers-reduced-motion. The elements always render (opacity 0) — the effect
 * only attaches listeners when the environment qualifies.
 */
export function HudCursor() {
  const ringRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let dotX = targetX;
    let dotY = targetY;
    let visible = false;
    let rafId = 0;

    const setVisible = (v: boolean) => {
      if (v === visible) return;
      visible = v;
      ring.style.opacity = v ? "1" : "0";
      dot.style.opacity = v ? "1" : "0";
    };

    const loop = () => {
      // Lerp: dot snaps quickly, ring trails for the HUD lag feel.
      dotX += (targetX - dotX) * 0.5;
      dotY += (targetY - dotY) * 0.5;
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setVisible(true);
    };

    const onOver = (e: PointerEvent) => {
      const hit = (e.target as Element | null)?.closest?.(INTERACTIVE);
      ring.dataset.active = hit ? "true" : "false";
    };

    const onLeave = (e: PointerEvent) => {
      if (!e.relatedTarget) setVisible(false);
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onLeave);
      cancelAnimationFrame(rafId);
      setVisible(false);
    };
  }, [reduced]);

  return (
    <>
      <div ref={ringRef} aria-hidden className="hud-cursor-ring" style={{ opacity: 0 }} />
      <div ref={dotRef} aria-hidden className="hud-cursor-dot" style={{ opacity: 0 }} />
    </>
  );
}
