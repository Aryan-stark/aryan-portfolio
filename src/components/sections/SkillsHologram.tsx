"use client";

import { useEffect, useRef, useState } from "react";
import { EyebrowBadge } from "@/components/ui/EyebrowBadge";
import { HudFrame } from "@/components/ui/HudFrame";
import { DecryptText } from "@/components/ui/DecryptText";
import { SKILL_FIGURE, SKILL_GROUPS } from "@/lib/skills";

export function SkillsHologram() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const figureRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const reticleRef = useRef<SVGSVGElement | null>(null);
  const scanRef = useRef<HTMLDivElement | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const seqReadoutRef = useRef<HTMLSpanElement | null>(null);

  const tickingRef = useRef(false);
  const prevActiveRef = useRef("");

  const [active, setActive] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;

      requestAnimationFrame(() => {
        tickingRef.current = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        const progress =
          scrollable <= 0
            ? 0
            : Math.min(1, Math.max(0, -rect.top / scrollable));

        const isMobile = window.innerWidth <= 768;

        // The figure "slides" across the holographic field as you scroll.
        if (figureRef.current) {
          const slide = isMobile ? 4 : 9; // vw of horizontal travel
          const x = (progress - 0.5) * 2 * slide; // -slide → +slide
          const scale = 1.04 + progress * 0.12;
          const intro = Math.min(1, progress / 0.06);
          const tail = 1 - Math.min(1, Math.max(0, (progress - 0.94) / 0.06));
          figureRef.current.style.transform = `translateX(${x}vw) scale(${scale})`;
          figureRef.current.style.opacity = String(intro * tail);
        }

        if (auraRef.current) {
          const a = 0.35 + Math.sin(progress * Math.PI) * 0.35;
          auraRef.current.style.opacity = String(a);
        }

        if (reticleRef.current) {
          reticleRef.current.style.transform = `rotate(${progress * 220}deg)`;
        }

        if (scanRef.current) {
          scanRef.current.style.transform = `translateY(${progress * 100}vh)`;
        }

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress})`;
        }

        if (seqReadoutRef.current) {
          seqReadoutRef.current.textContent = `SYS ${String(
            Math.round(progress * 100),
          ).padStart(3, "0")} / 100`;
        }

        const next = new Set<string>();
        for (const g of SKILL_GROUPS) {
          if (progress >= g.show && progress <= g.hide) next.add(g.id);
        }
        const ids = [...next].sort().join(",");
        if (ids !== prevActiveRef.current) {
          prevActiveRef.current = ids;
          setActive(next);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="scroll-animation relative border-t border-white/5 bg-background"
    >
      <div
        className="sticky top-0 min-h-[100dvh] w-full overflow-hidden bg-background"
        style={{ height: "100dvh", willChange: "transform", transform: "translateZ(0)" }}
      >
        {/* deep holographic field */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 70% at 50% 45%, rgba(45,140,255,0.16) 0%, transparent 60%), radial-gradient(120% 90% at 50% 100%, rgba(10,10,11,0.2) 40%, rgba(10,10,11,0.9) 100%)",
          }}
        />
        <div className="holo-grid pointer-events-none absolute inset-0 opacity-[0.18]" />

        {/* scan line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[100vh] overflow-hidden">
          <div
            ref={scanRef}
            className="absolute inset-x-0 -top-[100vh] h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(96,178,255,0.7) 50%, transparent)",
              boxShadow: "0 0 18px 1px rgba(96,178,255,0.4)",
            }}
          />
        </div>

        {/* the operator figure — slides across the field */}
        <div className="absolute inset-0 z-[6] flex items-center justify-center">
          <div
            ref={auraRef}
            className="pointer-events-none absolute h-[62vmin] w-[62vmin] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(56,150,255,0.28) 0%, transparent 62%)",
              filter: "blur(8px)",
            }}
          />
          {/* slow-spinning reticle behind the figure */}
          <svg
            ref={reticleRef}
            aria-hidden
            viewBox="0 0 400 400"
            className="pointer-events-none absolute h-[78vmin] w-[78vmin] text-holo/40"
            style={{ willChange: "transform" }}
          >
            <circle cx="200" cy="200" r="150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 10" />
            <circle cx="200" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 18" opacity="0.6" />
            <circle cx="200" cy="200" r="178" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
            {Array.from({ length: 12 }).map((_, i) => {
              const a = (i / 12) * Math.PI * 2;
              return (
                <line
                  key={i}
                  x1={200 + Math.cos(a) * 168}
                  y1={200 + Math.sin(a) * 168}
                  x2={200 + Math.cos(a) * 178}
                  y2={200 + Math.sin(a) * 178}
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>

          <div
            ref={figureRef}
            className="relative h-[78vmin] max-h-[760px] w-auto"
            style={{ willChange: "transform, opacity", opacity: 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SKILL_FIGURE}
              alt="Aryan Sethi operating a holographic skills interface"
              className="h-full w-auto select-none object-contain"
              draggable={false}
              style={{
                filter:
                  "drop-shadow(0 0 26px rgba(60,150,255,0.35)) saturate(1.1) contrast(1.05)",
              }}
            />
          </div>
        </div>

        {/* corner HUD framing */}
        <div className="pointer-events-none absolute left-6 top-24 text-holo md:left-10 md:top-28">
          <HudFrame corner="tl" size={26} />
        </div>
        <div className="pointer-events-none absolute right-6 top-24 text-holo md:right-10 md:top-28">
          <HudFrame corner="tr" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 left-6 text-holo md:bottom-16 md:left-10">
          <HudFrame corner="bl" size={26} />
        </div>
        <div className="pointer-events-none absolute bottom-14 right-6 text-holo md:bottom-16 md:right-10">
          <HudFrame corner="br" size={26} />
        </div>

        {/* header */}
        <div className="pointer-events-none absolute inset-x-0 top-20 z-20 flex flex-col items-center gap-4 px-6 text-center md:top-24">
          <EyebrowBadge className="!text-holo !border-holo/30">
            CAPABILITY MATRIX // LIVE
          </EyebrowBadge>
          <h2 className="font-sans text-3xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-5xl">
            <DecryptText text="Skills, " />
            <span className="text-holo">
              <DecryptText text="deployed." delay={300} />
            </span>
          </h2>
          <p className="hidden max-w-[52ch] font-sans text-sm leading-relaxed text-zinc-400 md:block">
            Scroll to pan the interface — each module brings a layer of the stack
            online.
          </p>
        </div>

        {/* top-left status */}
        <div className="pointer-events-none absolute left-6 top-[4.2rem] z-10 hidden items-center gap-2 md:flex md:left-10">
          <div className="h-px w-8 bg-holo/60" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-400">
            J.A.R.V.I.S. // Mapping
          </span>
        </div>
        <div className="pointer-events-none absolute right-6 top-[4.2rem] z-10 hidden items-center gap-3 md:flex md:right-10">
          <span
            ref={seqReadoutRef}
            className="font-mono text-[10px] uppercase tracking-[0.28em] text-holo"
          >
            SYS 000 / 100
          </span>
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-holo shadow-[0_0_10px_rgba(96,178,255,0.85)]"
          />
        </div>

        {/* desktop skill panels docked around the figure */}
        <div className="absolute inset-0 z-20 hidden md:block">
          {SKILL_GROUPS.map((g) => {
            const isActive = active.has(g.id);
            const sideClass = g.side === "left" ? "left-8 lg:left-14" : "right-8 lg:right-14";
            const bandClass =
              g.band === "top"
                ? "top-[26%]"
                : g.band === "mid"
                ? "top-1/2 -translate-y-1/2"
                : "bottom-[16%]";
            const enter = g.side === "left" ? "-translate-x-6" : "translate-x-6";
            return (
              <div
                key={g.id}
                className={`pointer-events-none absolute ${sideClass} ${bandClass} w-[330px] max-w-[30vw]`}
              >
                <HoloPanel group={g} active={isActive} enter={enter} />
              </div>
            );
          })}
        </div>

        {/* mobile: figure stays centered, panels stack at the bottom sheet */}
        <div className="absolute inset-x-0 bottom-16 z-20 flex flex-col gap-3 px-5 md:hidden">
          {SKILL_GROUPS.filter((g) => active.has(g.id)).slice(0, 1).map((g) => (
            <HoloPanel key={g.id} group={g} active enter="translate-y-4" />
          ))}
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
          <div className="mx-6 mb-3 h-px bg-white/10 md:mx-10">
            <div
              ref={progressFillRef}
              className="h-full origin-left bg-holo"
              style={{ transform: "scaleX(0)", transition: "transform 80ms linear" }}
            />
          </div>
          <div className="mx-6 flex items-center justify-between pb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:mx-10">
            <span>SKILL MATRIX</span>
            <span className="hidden sm:inline">HOLO-RENDER // STABLE</span>
            <span>Scroll &darr;</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function HoloPanel({
  group,
  active,
  enter,
}: {
  group: (typeof SKILL_GROUPS)[number];
  active: boolean;
  enter: string;
}) {
  return (
    <figure
      className={`holo-panel pointer-events-auto p-5 transition-all duration-500 ease-out ${
        active ? "translate-x-0 translate-y-0 opacity-100" : `${enter} opacity-0`
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-holo">
          {group.index} — Module
        </span>
        <span
          aria-hidden
          className="inline-block h-1.5 w-1.5 rounded-full bg-holo shadow-[0_0_10px_rgba(96,178,255,0.85)]"
        />
      </div>
      <h3 className="mt-2 font-sans text-lg font-semibold leading-tight tracking-tight text-foreground">
        {group.title}
      </h3>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {group.skills.map((s) => (
          <li
            key={s}
            className="rounded-md border border-holo/25 bg-holo/[0.07] px-2.5 py-1 font-mono text-[11px] tracking-tight text-zinc-200"
          >
            {s}
          </li>
        ))}
      </ul>
    </figure>
  );
}
