"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowSquareOut,
  CaretRight,
  DownloadSimple,
  EnvelopeSimple,
  Lightning,
  NavigationArrow,
} from "@phosphor-icons/react";
import { getLenis } from "@/components/providers/SmoothScrollProvider";
import { NAV_LINKS } from "@/lib/nav";
import { asset } from "@/lib/basePath";
import { profile } from "@/lib/profile";

type Command = {
  id: string;
  label: string;
  hint: string;
  keywords?: string;
  icon: "nav" | "link" | "mail" | "download" | "boot";
  perform: () => void;
};

function scrollToHash(hash: string) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(hash, { offset: -70 });
    return;
  }
  document
    .querySelector(hash)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Substring match, falling back to in-order subsequence ("fuzzy-ish"). */
function matches(query: string, haystack: string): boolean {
  const q = query.toLowerCase().trim();
  if (!q) return true;
  const h = haystack.toLowerCase();
  if (h.includes(q)) return true;
  let i = 0;
  for (const ch of h) {
    if (ch === q[i]) i++;
    if (i === q.length) return true;
  }
  return false;
}

const ICONS = {
  nav: NavigationArrow,
  link: ArrowSquareOut,
  mail: EnvelopeSimple,
  download: DownloadSimple,
  boot: Lightning,
} as const;

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const close = useCallback(() => setOpen(false), []);

  const openPalette = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }, []);

  const commands = useMemo<Command[]>(
    () => [
      ...NAV_LINKS.map(
        ({ label, href }): Command => ({
          id: `nav-${href}`,
          label: `Go to ${label}`,
          hint: "Section",
          keywords: `jump scroll navigate ${label}`,
          icon: "nav",
          perform: () => scrollToHash(href),
        }),
      ),
      {
        id: "nav-contact",
        label: "Go to Contact",
        hint: "Section",
        keywords: "jump scroll navigate footer email reach",
        icon: "nav",
        perform: () => scrollToHash("#footer"),
      },
      {
        id: "resume",
        label: "Download Resume",
        hint: "PDF",
        keywords: "cv curriculum vitae pdf",
        icon: "download",
        perform: () => {
          const a = document.createElement("a");
          a.href = asset(profile.resume);
          a.download = "";
          a.click();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        hint: "External",
        keywords: "code repos projects aryan-stark",
        icon: "link",
        perform: () => window.open(profile.github.url, "_blank", "noopener"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        hint: "External",
        keywords: "profile network hire",
        icon: "link",
        perform: () => window.open(profile.linkedin.url, "_blank", "noopener"),
      },
      {
        id: "email",
        label: "Send Email",
        hint: profile.email,
        keywords: "mail contact reach out",
        icon: "mail",
        perform: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "boot",
        label: "Run Boot Sequence",
        hint: "Easter egg",
        keywords: "jarvis system online arc reactor easter egg",
        icon: "boot",
        perform: () => window.dispatchEvent(new Event("jarvis:boot")),
      },
    ],
    [],
  );

  const filtered = useMemo(
    () => commands.filter((c) => matches(query, `${c.label} ${c.keywords ?? ""}`)),
    [commands, query],
  );

  // Global open/close keybinding + navbar trigger event.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else openPalette();
      }
    };
    const onOpenEvent = () => openPalette();
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("jarvis:palette", onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("jarvis:palette", onOpenEvent);
    };
  }, [open, close, openPalette]);

  // Scroll-lock while open. Lenis keeps animating under a body overflow
  // lock, so stop it explicitly.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    // Focus after the dialog paints.
    const t = window.setTimeout(() => inputRef.current?.focus(), 10);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  const run = useCallback(
    (cmd: Command | undefined) => {
      if (!cmd) return;
      close();
      // Let the overlay unmount (and Lenis restart) before scrolling.
      window.setTimeout(() => cmd.perform(), 30);
    },
    [close],
  );

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) =>
        filtered.length ? (i - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[Math.min(activeIndex, filtered.length - 1)]);
    } else if (e.key === "Tab") {
      // Minimal focus trap — keep focus on the input.
      e.preventDefault();
    }
  };

  if (!open) return null;

  const active = Math.min(activeIndex, Math.max(0, filtered.length - 1));

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[18vh]"
      role="dialog"
      aria-modal="true"
      aria-label="JARVIS command interface"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden
      />
      <div className="card-surface relative w-full max-w-[560px] overflow-hidden !rounded-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]"
            />
            J.A.R.V.I.S. // Command Interface
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
            esc
          </span>
        </div>

        <div className="flex items-center gap-2.5 border-b border-white/8 px-5 py-3.5">
          <CaretRight size={14} weight="bold" className="shrink-0 text-accent" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="jarvis-commands"
            aria-activedescendant={
              filtered[active] ? `cmd-${filtered[active].id}` : undefined
            }
            className="w-full bg-transparent font-mono text-sm text-foreground placeholder:text-zinc-600 focus:outline-none"
          />
        </div>

        <ul
          id="jarvis-commands"
          role="listbox"
          aria-label="Commands"
          className="max-h-[320px] overflow-y-auto py-2"
        >
          {filtered.length === 0 && (
            <li className="px-5 py-6 text-center font-mono text-[12px] uppercase tracking-[0.2em] text-zinc-500">
              No protocols found
            </li>
          )}
          {filtered.map((cmd, i) => {
            const Icon = ICONS[cmd.icon];
            const isActive = i === active;
            return (
              <li
                key={cmd.id}
                id={`cmd-${cmd.id}`}
                role="option"
                aria-selected={isActive}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => run(cmd)}
                className={`flex cursor-pointer items-center gap-3 px-5 py-3 transition-colors ${
                  isActive ? "bg-accent/[0.09]" : ""
                }`}
              >
                <Icon
                  size={15}
                  weight="bold"
                  className={isActive ? "text-accent" : "text-zinc-500"}
                />
                <span
                  className={`flex-1 font-sans text-sm ${
                    isActive ? "text-foreground" : "text-zinc-300"
                  }`}
                >
                  {cmd.label}
                </span>
                <span className="max-w-[180px] truncate font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">
                  {cmd.hint}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center justify-between border-t border-white/8 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
}
