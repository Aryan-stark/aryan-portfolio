"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

function subscribePointerFine(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function usePointerFine() {
  return useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

type Props = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees. */
  maxTilt?: number;
};

// Pointer-tracked 3D tilt. Renders a plain div on touch devices and under
// reduced motion. Wrap OUTSIDE AnimatedSection so the entrance spring and the
// tilt transform live on different elements.
export function TiltCard({ children, className = "", maxTilt = 6 }: Props) {
  const reduced = useReducedMotion();
  const fine = usePointerFine();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });

  if (reduced || !fine) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{
        rotateX: srx,
        rotateY: sry,
        transformPerspective: 900,
        willChange: "transform",
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * 2 * maxTilt);
        rx.set(-py * 2 * maxTilt);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
