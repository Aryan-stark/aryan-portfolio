import { HudFrame } from "@/components/ui/HudFrame";

const AGENTS = ["Competitor", "Demand", "Inventory", "Compliance", "Pricing"];

// Decorative dashboard mock for the featured Klypup card — sells the 5-agent
// pipeline visually without screenshots. Pure CSS animation, server-safe.
export function KlypupPreview() {
  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-xl border border-white/10 bg-black/30 p-4"
    >
      <HudFrame
        corner="tl"
        size={14}
        className="absolute left-1 top-1 text-holo/50"
      />
      <HudFrame
        corner="br"
        size={14}
        className="absolute bottom-1 right-1 text-holo/50"
      />

      <div className="flex items-center gap-2">
        <span className="flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-red-400/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-green-400/60" />
        </span>
        <span className="ml-1 font-mono text-[9px] uppercase tracking-[0.24em] text-zinc-500">
          klypup.dashboard — live pipeline
        </span>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {AGENTS.map((a, i) => (
          <span key={a} className="flex items-center gap-1.5">
            <span
              className="pill-glow rounded border border-white/10 px-2 py-0.5 font-mono text-[9px]"
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              {a}
            </span>
            {i < AGENTS.length - 1 && (
              <span className="font-mono text-[9px] text-zinc-600">→</span>
            )}
          </span>
        ))}
      </div>

      <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">
        CONFIDENCE 0.91 &nbsp;/&nbsp; RECS 24 &nbsp;/&nbsp; AUTO-APPROVED 17
      </p>
    </div>
  );
}
