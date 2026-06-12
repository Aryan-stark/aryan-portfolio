import { ImageResponse } from "next/og";
import { profile } from "@/lib/profile";

// Statically generated at build time, so this works with `output: "export"`
// and is served as a plain PNG on GitHub Pages.
export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aryan Sethi — AI Engineer";

const GOLD = "#d4a22f";
const HOLO = "#60b2ff";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 96px",
          backgroundColor: "#0a0a0b",
          backgroundImage:
            "radial-gradient(80% 80% at 70% 20%, rgba(96,178,255,0.10) 0%, rgba(10,10,11,0) 60%), radial-gradient(60% 60% at 20% 90%, rgba(212,162,47,0.10) 0%, rgba(10,10,11,0) 60%)",
          color: "#e4e4e7",
        }}
      >
        {/* HUD corner brackets */}
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 48,
            width: 36,
            height: 36,
            borderTop: `3px solid ${GOLD}`,
            borderLeft: `3px solid ${GOLD}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 48,
            right: 48,
            width: 36,
            height: 36,
            borderTop: `3px solid ${GOLD}`,
            borderRight: `3px solid ${GOLD}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 48,
            width: 36,
            height: 36,
            borderBottom: `3px solid ${GOLD}`,
            borderLeft: `3px solid ${GOLD}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 48,
            width: 36,
            height: 36,
            borderBottom: `3px solid ${GOLD}`,
            borderRight: `3px solid ${GOLD}`,
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 8,
            color: GOLD,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: GOLD,
              boxShadow: `0 0 18px ${GOLD}`,
            }}
          />
          AI ENGINEER // GENAI · CV · ML PIPELINES
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 110,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1,
            color: "#fafafa",
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.4,
            maxWidth: 880,
            color: "#a1a1aa",
          }}
        >
          {profile.tagline}
        </div>

        <div
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <div style={{ width: 72, height: 3, backgroundColor: GOLD }} />
          <div style={{ fontSize: 22, letterSpacing: 4, color: HOLO }}>
            LLMs · RAG · VLMs · AGENTIC AI · COMPUTER VISION
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
