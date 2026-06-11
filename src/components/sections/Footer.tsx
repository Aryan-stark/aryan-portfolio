import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { profile } from "@/lib/profile";

export function Footer() {
  const contacts: { label: string; value: string; href: string }[] = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { label: "LinkedIn", value: profile.linkedin.label, href: profile.linkedin.url },
    { label: "GitHub", value: profile.github.label, href: profile.github.url },
  ];

  return (
    <footer
      id="footer"
      className="relative border-t border-white/5 bg-background px-6 pb-14 pt-24 md:px-10 md:pb-16 md:pt-32"
    >
      <div className="mx-auto flex max-w-[1100px] flex-col gap-14">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(212,162,47,0.85)]"
            />
            J.A.R.V.I.S. // Standing by
          </span>
          <h2 className="max-w-[20ch] font-sans text-4xl font-semibold leading-[0.98] tracking-tighter text-foreground md:text-6xl">
            Let&apos;s build something <span className="text-accent">inevitable.</span>
          </h2>
          <p className="max-w-[52ch] font-sans text-base leading-relaxed text-zinc-400">
            Open to AI Engineering roles and collaborations. The arc reactor&apos;s
            online — reach out and let&apos;s talk.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] md:grid-cols-4">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="group flex flex-col gap-2 bg-background/40 p-5 transition-colors hover:bg-white/[0.04]"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500">
                {c.label}
              </span>
              <span className="flex items-center gap-1 font-sans text-sm font-medium text-foreground transition-colors group-hover:text-accent">
                <span className="truncate">{c.value}</span>
                <ArrowUpRight
                  size={12}
                  weight="bold"
                  className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-white/5 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <span>
            {profile.name} &nbsp;&middot;&nbsp; {profile.role} &nbsp;&middot;&nbsp;{" "}
            {profile.location}
          </span>
          <span>Mark LXXXV portfolio &mdash; built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
