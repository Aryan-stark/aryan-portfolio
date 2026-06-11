"use client";

import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { ACHIEVEMENTS, EDUCATION, SOFT_SKILLS } from "@/lib/profile";

export function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-white/5 bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <div className="mx-auto grid max-w-[1100px] gap-12 md:grid-cols-2 md:gap-16">
        {/* Education */}
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>ORIGIN // EDUCATION</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <div className="card-surface p-7">
              <h3 className="font-sans text-xl font-semibold leading-snug tracking-tight text-foreground">
                {EDUCATION.degree}
              </h3>
              <p className="mt-1.5 font-sans text-base text-accent">
                {EDUCATION.institution}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
                <span>{EDUCATION.period}</span>
                <span className="text-zinc-600">·</span>
                <span>{EDUCATION.detail}</span>
              </div>
              <ul className="mt-4 flex flex-col gap-2 border-t border-white/8 pt-4 text-[13px] leading-relaxed text-zinc-300">
                {EDUCATION.extra.map((e, i) => (
                  <li key={i}>{e}</li>
                ))}
              </ul>
            </div>
          </AnimatedItem>
        </AnimatedSection>

        {/* Achievements + soft skills */}
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>COMMENDATIONS // ACHIEVEMENTS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <ul className="flex flex-col divide-y divide-white/8 border-y border-white/8">
              {ACHIEVEMENTS.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-3 py-4 font-sans text-[15px] text-zinc-200"
                >
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_rgba(212,162,47,0.7)]"
                  />
                  {a}
                </li>
              ))}
            </ul>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-wrap gap-2 pt-1">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-tight text-zinc-300"
                >
                  {s}
                </span>
              ))}
            </div>
          </AnimatedItem>
        </AnimatedSection>
      </div>
    </section>
  );
}
