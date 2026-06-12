"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, DownloadSimple, List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/nav";
import { asset } from "@/lib/basePath";
import { profile } from "@/lib/profile";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-black/60 backdrop-blur-2xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.32em] text-foreground"
        >
          <span
            aria-hidden
            className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,162,47,0.9)]"
          />
          Aryan / Sethi
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a
            href={asset(profile.resume)}
            download
            className="group inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/[0.08] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent backdrop-blur-md transition-all duration-200 hover:bg-accent/[0.16] active:translate-y-[1px]"
          >
            Resume
            <DownloadSimple
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-y-0.5"
            />
          </a>
          <a
            href="#footer"
            className="group inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.05] px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground backdrop-blur-md transition-all duration-200 hover:bg-white/[0.1] active:translate-y-[1px]"
          >
            Contact
            <ArrowUpRight
              size={14}
              weight="bold"
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* mobile menu toggle */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] p-2.5 text-foreground transition-colors hover:bg-white/[0.1] md:hidden"
        >
          {menuOpen ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
        </button>
      </div>

      {/* mobile menu panel */}
      <div
        className={`overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-2xl transition-[max-height,opacity] duration-300 ease-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 font-mono text-[12px] uppercase tracking-[0.24em] text-zinc-300 transition-colors hover:bg-white/[0.05] hover:text-foreground"
            >
              {label}
            </a>
          ))}
          <a
            href={asset(profile.resume)}
            download
            onClick={() => setMenuOpen(false)}
            className="mt-2 inline-flex items-center justify-between rounded-lg border border-accent/40 bg-accent/[0.08] px-3 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-accent transition-colors hover:bg-accent/[0.16]"
          >
            Resume
            <DownloadSimple size={14} weight="bold" />
          </a>
          <a
            href="#footer"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-between rounded-lg border border-white/15 bg-white/[0.05] px-3 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors hover:bg-white/[0.1]"
          >
            Contact
            <ArrowUpRight size={14} weight="bold" />
          </a>
        </nav>
      </div>
    </header>
  );
}
