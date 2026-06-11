// Scroll-driven "skill matrix" hologram config.
// Each group reveals within its [show, hide] scroll-progress window while the
// figure slides across the viewport — mimicking a HUD operator panning a
// holographic interface.

import { asset } from "./basePath";

export const SKILL_FIGURE = asset("/skills-figure.jpg");

export type SkillGroup = {
  id: string;
  /** scroll progress (0-1) at which the panel becomes active */
  show: number;
  /** scroll progress (0-1) at which the panel deactivates */
  hide: number;
  index: string;
  title: string;
  /** which edge the panel docks to on desktop */
  side: "left" | "right";
  /** vertical anchor on desktop */
  band: "top" | "mid" | "bottom";
  skills: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "languages",
    show: 0.04,
    hide: 0.26,
    index: "01",
    title: "Languages",
    side: "left",
    band: "top",
    skills: ["Python", "C++", "Java", "JavaScript", "TypeScript", "SQL"],
  },
  {
    id: "libraries",
    show: 0.18,
    hide: 0.42,
    index: "02",
    title: "ML Libraries",
    side: "right",
    band: "top",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "OpenCV",
      "Matplotlib",
    ],
  },
  {
    id: "genai",
    show: 0.34,
    hide: 0.58,
    index: "03",
    title: "Generative AI & LLMs",
    side: "left",
    band: "mid",
    skills: ["LangChain", "LangGraph", "Hugging Face", "RAG", "LLMs", "VLMs"],
  },
  {
    id: "frameworks",
    show: 0.5,
    hide: 0.74,
    index: "04",
    title: "Frameworks & Databases",
    side: "right",
    band: "mid",
    skills: [
      "Node.js",
      "NestJS",
      "FastAPI",
      "React.js",
      "REST APIs",
      "WebSockets",
      "MongoDB",
      "Milvus",
      "ChromaDB",
    ],
  },
  {
    id: "devops",
    show: 0.66,
    hide: 0.9,
    index: "05",
    title: "DevOps & Tools",
    side: "left",
    band: "bottom",
    skills: ["Docker", "Kubernetes", "Git", "GitHub", "CI/CD", "JWT Auth"],
  },
  {
    id: "core",
    show: 0.8,
    hide: 1.01,
    index: "06",
    title: "Core Concepts",
    side: "right",
    band: "bottom",
    skills: [
      "Data Structures & Algorithms",
      "Machine Learning",
      "Deep Learning",
      "OOP",
      "Multithreading",
    ],
  },
];
