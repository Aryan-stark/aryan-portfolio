"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { AnimatedItem, AnimatedSection } from "@/components/ui/AnimatedSection";
import { DecryptText } from "@/components/ui/DecryptText";
import { KlypupPreview } from "@/components/ui/KlypupPreview";
import { SectionBackdrop } from "@/components/ui/SectionBackdrop";
import { TiltCard } from "@/components/ui/TiltCard";
import { PROJECTS } from "@/lib/profile";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-background px-6 pb-24 pt-24 md:px-10 md:pb-32 md:pt-32"
    >
      <SectionBackdrop word="ARCHIVE" tint="holo" glow="holo" grid="scanlines" />

      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-12">
        <AnimatedSection className="flex flex-col gap-5">
          <AnimatedItem>
            <EyebrowBadge>BUILD ARCHIVE // PROJECTS</EyebrowBadge>
          </AnimatedItem>
          <AnimatedItem>
            <h2 className="max-w-[20ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
              <DecryptText text="Things I've " />
              <span className="text-accent">
                <DecryptText text="engineered." delay={400} />
              </span>
            </h2>
          </AnimatedItem>
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2">
          {PROJECTS.map((p, idx) => {
            const card = (
              <AnimatedSection
                className={`card-surface group flex h-full flex-col gap-5 p-7 duration-300 ease-out hover:border-accent/30 ${
                  p.featured
                    ? "transition-[transform,border-color] hover:-translate-y-1 md:p-9"
                    : "transition-[border-color]"
                }`}
              >
                {/* Editorial ghost index */}
                <span
                  aria-hidden
                  className="ghost-word ghost-word--accent pointer-events-none absolute -right-2 -top-6 font-mono"
                  style={{ fontSize: "clamp(4rem, 8vw, 7rem)" }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>

                <AnimatedItem>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                      {p.featured && (
                        <span className="inline-flex w-fit items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.28em] text-accent">
                          <span
                            aria-hidden
                            className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(212,162,47,0.7)]"
                          />
                          Flagship Build
                        </span>
                      )}
                      <h3
                        className={`font-sans font-semibold leading-snug tracking-tight text-foreground ${
                          p.featured ? "text-2xl md:text-3xl" : "text-xl"
                        }`}
                      >
                        {p.name}
                      </h3>
                    </div>
                    {p.link && (
                      <a
                        href={p.link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${p.name} on ${p.link.label}`}
                        className="relative shrink-0 rounded-full border border-white/15 bg-white/[0.05] p-2 text-zinc-300 transition-colors hover:text-accent"
                      >
                        <ArrowUpRight size={15} weight="bold" />
                      </a>
                    )}
                  </div>
                </AnimatedItem>

                <AnimatedItem>
                  <p
                    className={`leading-relaxed text-zinc-400 ${
                      p.featured ? "max-w-[70ch] text-[15px]" : "text-sm"
                    }`}
                  >
                    {p.blurb}
                  </p>
                </AnimatedItem>

                {p.featured && (
                  <AnimatedItem>
                    <KlypupPreview />
                  </AnimatedItem>
                )}

                <AnimatedItem>
                  <ul
                    className={`gap-2.5 ${
                      p.featured
                        ? "grid sm:grid-cols-2 sm:gap-x-8"
                        : "flex flex-col"
                    }`}
                  >
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
            );

            return p.featured ? (
              <div key={p.name} className="md:col-span-2">
                {card}
              </div>
            ) : (
              <TiltCard key={p.name} className="h-full">
                {card}
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
