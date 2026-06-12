import { SKILL_GROUPS } from "@/lib/skills";

// Flatten + dedupe every skill into one ordered list, then split into two
// counter-scrolling rows. Pure CSS animation — stays a server component.
const ALL_SKILLS = [...new Set(SKILL_GROUPS.flatMap((g) => g.skills))];
const MID = Math.ceil(ALL_SKILLS.length / 2);
const ROWS: { items: string[]; reverse: boolean }[] = [
  { items: ALL_SKILLS.slice(0, MID), reverse: false },
  { items: ALL_SKILLS.slice(MID), reverse: true },
];

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  // The track renders the list twice so translateX(-50%) loops seamlessly.
  const copies: { hidden: boolean }[] = [{ hidden: false }, { hidden: true }];
  return (
    <div className="marquee marquee-mask overflow-hidden">
      <div
        className={`marquee-track flex w-max items-center ${
          reverse ? "marquee-track--reverse" : ""
        }`}
      >
        {copies.map((copy, c) => (
          <div
            key={c}
            aria-hidden={copy.hidden || undefined}
            className="flex w-max items-center"
          >
            {items.map((s) => (
              <span
                key={s}
                className="flex items-center gap-6 whitespace-nowrap pr-6 font-mono text-[13px] uppercase tracking-[0.22em] text-zinc-500 transition-colors hover:text-accent"
              >
                {s}
                <span
                  aria-hidden
                  className="inline-block h-1 w-1 rounded-full bg-accent/50"
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technology stack"
      className="relative overflow-hidden border-t border-white/5 bg-background py-10 md:py-14"
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-center gap-3 px-6">
          <span className="h-px w-10 bg-accent/40" />
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-zinc-500">
            Systems Inventory // Full Stack
          </span>
          <span className="h-px w-10 bg-accent/40" />
        </div>
        {ROWS.map((row, i) => (
          <MarqueeRow key={i} items={row.items} reverse={row.reverse} />
        ))}
      </div>
    </section>
  );
}
