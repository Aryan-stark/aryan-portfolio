import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aryan Sethi — AI Engineer",
  description:
    "AI Engineer building scalable, real-time AI systems — Generative AI (LLMs, RAG, VLMs), computer vision, and end-to-end ML pipelines.",
  metadataBase: new URL("https://aryan-stark.github.io/aryan-portfolio"),
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
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
