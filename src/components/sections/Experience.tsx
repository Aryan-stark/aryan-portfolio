"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { EXPERIENCE } from "@/lib/profile";

export function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-white/5 bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-12">
        <AnimatedSection className="flex flex-col gap-5">
          <AnimatedItem>
            <EyebrowBadge>FLIGHT LOG // EXPERIENCE</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[18ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              Where the suit has <span className="text-accent">flown.</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        {EXPERIENCE.map((job) => (
          <AnimatedSection
            key={job.company}
            className="card-surface flex flex-col gap-6 p-7 md:p-9"
          >
            <AnimatedItem>
              <div className="flex flex-col justify-between gap-2 md:flex-row md:items-baseline">
                <div>
                  <h3 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
                    {job.role}
                  </h3>
                  <p className="mt-1 font-sans text-base text-accent">
                    {job.company}
                  </p>
                </div>
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">
                  {job.period}
                </span>
              </div>
            </AnimatedItem>

            <AnimatedItem>
              <ul className="flex flex-col gap-3">
                {job.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-zinc-300 md:text-[15px]">
                    <span
                      aria-hidden
                      className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(212,162,47,0.7)]"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </AnimatedItem>

            <AnimatedItem>
              <div className="flex flex-wrap gap-2">
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
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
