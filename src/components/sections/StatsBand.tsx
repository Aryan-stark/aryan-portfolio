"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { STATS } from "@/lib/profile";

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref}>
      {reduced ? value : n}
      {suffix}
    </span>
  );
}

export function StatsBand() {
  return (
    <section
      aria-label="Key stats"
      className="relative border-t border-white/5 bg-background px-6 py-14 md:px-10 md:py-20"
    >
      <AnimatedSection className="mx-auto flex max-w-[1100px] flex-col gap-10">
        <AnimatedItem>
          <EyebrowBadge>TELEMETRY // BY THE NUMBERS</EyebrowBadge>
        </AnimatedItem>
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:divide-x md:divide-white/8">
          {STATS.map((s) => (
            <AnimatedItem
              key={s.label}
              className="flex flex-col gap-2 md:px-8 md:first:pl-0 md:last:pr-0"
            >
              <span
                className="font-sans font-semibold leading-none tracking-tight text-accent"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                <CountUp value={s.value} suffix={s.suffix} />
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                {s.label}
              </span>
            </AnimatedItem>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
