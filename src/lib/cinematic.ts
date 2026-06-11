import { asset } from "./basePath";

export const CINE_FRAME_COUNT = 169;

export const cineFramePath = (n: number) =>
  asset(`/frames2/frame_${String(n).padStart(4, "0")}.jpg`);

export type Beat = {
  id: string;
  show: number;
  hide: number;
  label: string;
  quote: string;
  speaker: string;
  film: string;
};

export const BEATS: Beat[] = [
  {
    id: "b1",
    show: 0.1,
    hide: 0.3,
    label: "01 — Ship",
    quote: "From model to product — I build the whole pipeline, not just the notebook.",
    speaker: "End-to-end ML",
    film: "PYTHON · FASTAPI · NESTJS",
  },
  {
    id: "b2",
    show: 0.35,
    hide: 0.55,
    label: "02 — Reason",
    quote: "Guardrails and multi-agent k-voting keep LLM systems honest in production.",
    speaker: "Applied GenAI",
    film: "LANGCHAIN · RAG · VLMS",
  },
  {
    id: "b3",
    show: 0.6,
    hide: 0.8,
    label: "03 — Scale",
    quote: "Real-time pipelines, containerized and orchestrated to run anywhere.",
    speaker: "Systems & DevOps",
    film: "DOCKER · KUBERNETES · CI/CD",
  },
];

export const CINE_INTRO_FADE_END = 0.08;
