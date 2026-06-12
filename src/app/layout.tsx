import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { HudCursor } from "@/components/ui/HudCursor";
import { BootSequence } from "@/components/ui/BootSequence";
import { SpotlightEffect } from "@/components/ui/SpotlightEffect";
import { profile } from "@/lib/profile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Aryan Sethi — AI Engineer";
const DESCRIPTION =
  "AI Engineer building scalable, real-time AI systems — Generative AI (LLMs, RAG, VLMs), computer vision, and end-to-end ML pipelines.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL("https://aryan-stark.github.io/aryan-portfolio"),
  keywords: [
    "AI Engineer",
    "Generative AI",
    "LLM",
    "RAG",
    "Computer Vision",
    "Machine Learning",
    "Agentic AI",
    "Aryan Sethi",
  ],
  authors: [{ name: profile.name, url: profile.github.url }],
  creator: profile.name,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: TITLE,
    type: "website",
    locale: "en_US",
    // og:image is injected automatically by app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Person schema for rich search results.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: "https://aryan-stark.github.io/aryan-portfolio/",
  sameAs: [profile.github.url, profile.linkedin.url],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
  knowsAbout: [
    "Generative AI",
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Computer Vision",
    "Machine Learning",
    "Agentic AI",
    "Multi-Agent Systems",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <SmoothScrollProvider>
          {children}
          <SpotlightEffect />
          <CommandPalette />
          <HudCursor />
          <BootSequence />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
