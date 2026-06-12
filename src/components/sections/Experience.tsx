"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { DecryptText } from "@/components/ui/DecryptText";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { EXPERIENCE } from "@/lib/profile";

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  // Timeline beam draws down the left rail as the section scrolls through.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 60%"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative overflow-hidden bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <SectionBackdrop word="FLIGHT LOG" tint="gold" glow="gold" grid="blueprint" />

      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-12">
        <AnimatedSection className="flex flex-col gap-5">
          <AnimatedItem>
            <EyebrowBadge>FLIGHT LOG // EXPERIENCE</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[18ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              <DecryptText text="Where the suit has " />
              <span className="text-accent">
                <DecryptText text="flown." delay={500} />
              </span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <div className="grid gap-8 md:grid-cols-[44px_1fr]">
          {/* Timeline rail with scroll-linked beam */}
          <div aria-hidden className="hidden justify-center md:flex">
            <div className="relative w-px bg-white/10">
              <motion.div
                className="absolute inset-x-0 top-0 h-full origin-top bg-gradient-to-b from-accent to-accent/20"
                style={{ scaleY: reduced ? 1 : beam }}
              />
              <span className="node-pulse absolute -left-[4.5px] top-4 h-2.5 w-2.5 rounded-full bg-accent" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {EXPERIENCE.map((job) => (
              <AnimatedSection
                key={job.company}
                className="card-surface flex flex-col transition-[border-color] duration-300 ease-out hover:border-accent/30"
              >
                {/* Terminal title bar */}
                <AnimatedItem>
                  <div className="flex items-center gap-2 border-b border-white/8 px-5 py-3">
                    <span aria-hidden className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
                      <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
                    </span>
                    <span className="ml-2 hidden font-mono text-[11px] tracking-[0.18em] text-zinc-500 sm:inline">
                      codeacious.term — mission log
                    </span>
                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-400">
                      {job.period}
                    </span>
                  </div>
                </AnimatedItem>

                <div className="flex flex-col gap-5 p-6 md:p-8">
                  <AnimatedItem>
                    <p className="font-mono text-[11px] tracking-tight text-accent">
                      $ open mission --id=codeacious
                    </p>
                    <h3 className="mt-3 font-sans text-2xl font-semibold tracking-tight text-foreground">
                      {job.role}
                    </h3>
                    <p className="mt-1 font-sans text-base text-accent">
                      {job.company}
                    </p>
                  </AnimatedItem>

                  <ul className="flex flex-col gap-3">
                    {job.bullets.map((b, i) => (
                      <li key={i}>
                        <AnimatedItem className="flex gap-3 font-mono text-[13px] leading-relaxed text-zinc-300 md:text-sm">
                          <span aria-hidden className="shrink-0 text-accent">
                            ▸
                          </span>
                          <span>{b}</span>
                        </AnimatedItem>
                      </li>
                    ))}
                  </ul>

                  <AnimatedItem>
                    <p className="flex items-center gap-2 font-mono text-[13px] text-accent">
                      $
                      <span
                        aria-hidden
                        className="caret-blink inline-block h-[1.1em] w-[7px] bg-accent"
                      />
                    </p>
                  </AnimatedItem>

                  <AnimatedItem>
                    <div className="flex flex-wrap items-center gap-2 border-t border-white/8 pt-5">
                      <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                        TAGS:
                      </span>
                      {job.tags.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] tracking-tight text-zinc-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </AnimatedItem>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
