"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { PROJECTS } from "@/lib/profile";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-white/5 bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-12">
        <AnimatedSection className="flex flex-col gap-5">
          <AnimatedItem>
            <EyebrowBadge>BUILD ARCHIVE // PROJECTS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[20ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              Things I&apos;ve <span className="text-accent">engineered.</span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <AnimatedSection
              key={p.name}
              className="card-surface group flex h-full flex-col gap-5 p-7"
            >
              <AnimatedItem>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-sans text-xl font-semibold leading-snug tracking-tight text-foreground">
                    {p.name}
                  </h3>
                  {p.link && (
                    <a
                      href={p.link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${p.name} on ${p.link.label}`}
                      className="shrink-0 rounded-full border border-white/15 bg-white/[0.05] p-2 text-zinc-300 transition-colors hover:text-accent"
                    >
                      <ArrowUpRight size={15} weight="bold" />
                    </a>
                  )}
                </div>
              </AnimatedItem>

              <AnimatedItem>
                <p className="text-sm leading-relaxed text-zinc-400">{p.blurb}</p>
              </AnimatedItem>

              <AnimatedItem>
                <ul className="flex flex-col gap-2.5">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-zinc-300">
                      <span
                        aria-hidden
                        className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedItem>

              <AnimatedItem className="mt-auto">
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] tracking-tight text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.period && (
                  <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.24em] text-zinc-500">
                    {p.period}
                  </span>
                )}
              </AnimatedItem>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
