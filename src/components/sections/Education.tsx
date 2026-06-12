"use client";

import { Certificate, Code, Medal } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { ACHIEVEMENTS, EDUCATION, SOFT_SKILLS } from "@/lib/profile";

// One icon per achievement: HCL cert, LeetCode, CBSE merit.
const ACHIEVEMENT_ICONS = [Certificate, Code, Medal];

export function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <SectionBackdrop word="ORIGIN" tint="white" glow="gold" />

      <div className="relative mx-auto grid max-w-[1100px] gap-12 md:grid-cols-2 md:gap-16">
        {/* Education */}
        <AnimatedSection className="flex flex-col gap-6">
          <AnimatedItem>
            <EyebrowBadge>ORIGIN // EDUCATION</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <div className="card-surface p-7 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent/30">
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
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {ACHIEVEMENTS.map((a, i) => {
                const Icon = ACHIEVEMENT_ICONS[i % ACHIEVEMENT_ICONS.length];
                return (
                  <li
                    key={a}
                    className="card-surface flex flex-col gap-3 p-4 transition-colors hover:border-accent/30"
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={20} weight="duotone" className="text-accent" />
                      <span className="font-mono text-[9px] tracking-[0.3em] text-zinc-500">
                        A.0{i + 1}
                      </span>
                    </div>
                    <span className="text-[13px] leading-snug text-zinc-200">
                      {a}
                    </span>
                  </li>
                );
              })}
            </ul>
          </AnimatedItem>
          <AnimatedItem>
            <div className="flex flex-wrap gap-2 pt-1">
              {SOFT_SKILLS.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 font-mono text-[11px] tracking-tight text-zinc-300 transition-colors hover:border-accent/40 hover:text-accent"
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
