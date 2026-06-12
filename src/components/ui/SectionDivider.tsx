import { HudFrame } from "@/components/ui/HudFrame";

type Props = {
  /** Section index chip, e.g. "04". */
  index: string;
  label?: string;
};

// Animated HUD seam between content sections: a hairline with a traveling
// gold pulse and a center index chip. Pure CSS animation, decorative only.
export function SectionDivider({ index, label }: Props) {
  return (
    <div
      aria-hidden
      className="relative flex h-12 items-center bg-background px-6 md:px-10"
    >
      <div className="divider-line flex-1" />
      <span className="relative mx-4 flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.3em] text-zinc-500">
        <HudFrame
          corner="tl"
          size={10}
          className="absolute -left-px -top-px text-accent/60"
        />
        <HudFrame
          corner="br"
          size={10}
          className="absolute -bottom-px -right-px text-accent/60"
        />
        SEC.{index}
        {label ? ` // ${label}` : ""}
      </span>
      <div className="divider-line flex-1" />
    </div>
  );
}
