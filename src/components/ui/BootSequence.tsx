"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const BOOT_LINES = [
  "ARC REACTOR ............... ONLINE",
  "NEURAL LATTICE ............ SYNCED",
  "VISION SUBSYSTEM .......... CALIBRATED",
  "AGENT SWARM ............... STANDING BY",
  "J.A.R.V.I.S. SYSTEM ONLINE",
];

const TRIGGER_WORD = "jarvis";
const LINE_INTERVAL = 380;
const HOLD_AFTER_DONE = 1100;

// One-time console greeting (module-level so strict-mode double mounts and
// remounts don't repeat it).
let greeted = false;

function greet() {
  if (greeted) return;
  greeted = true;
  console.log(
    `%c
      .--------.
     /  .----.  \\
    |  /  ()  \\  |     ARC REACTOR: ONLINE
    |  \\      /  |     J.A.R.V.I.S. STANDING BY
     \\  '----'  /
      '--------'
  Psst — type "jarvis" anywhere, or hit Ctrl+K.
`,
    "color:#d4a22f; font-family:monospace;",
  );
}

/**
 * Full-screen JARVIS boot overlay. Triggers: typing "jarvis" anywhere
 * (outside inputs), or the "jarvis:boot" event from the command palette.
 */
export function BootSequence() {
  const [active, setActive] = useState(false);
  const [lineCount, setLineCount] = useState(0);
  const reduced = useReducedMotion();
  const bufferRef = useRef("");

  useEffect(() => {
    greet();
  }, []);

  // Triggers. Resetting lineCount here (in event handlers, not effects)
  // keeps re-triggers starting from a blank readout.
  useEffect(() => {
    const trigger = () => {
      setLineCount(0);
      setActive(true);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable], [role='dialog']")) {
        bufferRef.current = "";
        return;
      }
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(
        -TRIGGER_WORD.length,
      );
      if (bufferRef.current === TRIGGER_WORD) {
        bufferRef.current = "";
        trigger();
      }
    };
    const onBoot = () => trigger();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("jarvis:boot", onBoot);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("jarvis:boot", onBoot);
    };
  }, []);

  // Sequence: reveal lines, hold, dismiss. All setState here happens inside
  // timer callbacks. Under reduced motion the render path shows every line
  // immediately, so only the dismiss timer is needed.
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      const t = window.setTimeout(() => setActive(false), 1200);
      return () => window.clearTimeout(t);
    }
    const interval = window.setInterval(() => {
      setLineCount((n) => {
        if (n + 1 >= BOOT_LINES.length) window.clearInterval(interval);
        return Math.min(n + 1, BOOT_LINES.length);
      });
    }, LINE_INTERVAL);
    const total = BOOT_LINES.length * LINE_INTERVAL + HOLD_AFTER_DONE;
    const dismiss = window.setTimeout(() => setActive(false), total);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(dismiss);
    };
  }, [active, reduced]);

  const shownCount = reduced ? BOOT_LINES.length : lineCount;
  const done = shownCount >= BOOT_LINES.length;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={() => setActive(false)}
          role="status"
          aria-label="JARVIS boot sequence"
          className="fixed inset-0 z-[110] flex items-center justify-center bg-background/92 backdrop-blur-md"
        >
          <div className="holo-grid pointer-events-none absolute inset-0 opacity-[0.14]" />
          <div className="relative flex w-[min(560px,90vw)] flex-col gap-2 px-8">
            <span className="mb-3 inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.32em] text-accent">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]"
              />
              Suit-Up Protocol // Initializing
            </span>
            {BOOT_LINES.slice(0, shownCount).map((line, i) => {
              const isFinal = i === BOOT_LINES.length - 1;
              return (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    isFinal
                      ? "mt-3 font-mono text-lg font-semibold uppercase tracking-[0.18em] text-accent md:text-2xl"
                      : "font-mono text-[12px] uppercase tracking-[0.18em] text-zinc-400 md:text-[13px]"
                  }
                >
                  {line}
                  {!isFinal && <span className="text-holo"> ✓</span>}
                </motion.p>
              );
            })}
            {!done && (
              <span
                aria-hidden
                className="mt-1 inline-block h-4 w-2 animate-pulse bg-accent/80"
              />
            )}
            {done && (
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-4 h-px origin-left bg-accent"
              />
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
