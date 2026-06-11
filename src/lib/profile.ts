// Single source of truth for Aryan Sethi's portfolio content.

export const profile = {
  name: "Aryan Sethi",
  role: "AI Engineer",
  location: "Noida, UP, India",
  email: "aryansethi243@gmail.com",
  phone: "+91 70821 17633",
  linkedin: { label: "aryan-sethi", url: "https://www.linkedin.com/in/aryan-sethi" },
  github: { label: "GitHub", url: "https://github.com/" },
  tagline: "AI Engineer building scalable, real-time AI systems.",
  summary:
    "AI Engineer with hands-on experience building scalable AI-driven systems using Python, REST APIs, NestJS, and Generative AI (LLMs, RAG, VLMs). Strong foundation in data structures, algorithms, multithreading, and system design — experienced across end-to-end ML pipelines, prompt engineering, and full-stack integration.",
};

export type SummaryCard = {
  id: string;
  show: number;
  hide: number;
  label: string;
  quote: string;
  detail: string;
};

// Value-prop cards revealed across the hero scroll.
export const SUMMARY_CARDS: SummaryCard[] = [
  {
    id: "s1",
    show: 0.1,
    hide: 0.3,
    label: "01 — Generative AI",
    quote: "LLMs, RAG & VLMs in production.",
    detail: "LangChain · LangGraph · Milvus · multi-agent k-voting verification",
  },
  {
    id: "s2",
    show: 0.35,
    hide: 0.55,
    label: "02 — Real-time CV",
    quote: "Anomaly detection over live video.",
    detail: "RTSP ingestion · rule engines · temporal event analysis",
  },
  {
    id: "s3",
    show: 0.6,
    hide: 0.8,
    label: "03 — Full-stack",
    quote: "From ML pipeline to shipped product.",
    detail: "NestJS · FastAPI · React · Docker · Kubernetes",
  },
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  location?: string;
  bullets: string[];
  tags: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    role: "AI Intern",
    company: "Codeacious Technologies",
    period: "Dec 2025 — Present",
    bullets: [
      "Built a full-stack real-time anomaly detection system using computer vision, RTSP stream ingestion pipelines, and domain-specific rule engines for temporal event analysis across live video feeds.",
      "Integrated VLM/LLM-based verification pipelines with guardrails and multi-agent k-voting workflows to improve anomaly detection accuracy and reduce false positives.",
      "Developed scalable AI-powered RAG systems using Milvus, semantic retrieval pipelines, and analytics dashboards for enterprise knowledge querying and monitoring.",
      "Engineered local LLM-based workflow automation platforms with React, TypeScript, and connector integrations for Gmail, Slack, and OneDrive using secure OAuth flows and IPC handlers.",
      "Containerized and deployed backend services using NestJS, Docker, and Kubernetes for scalable AI workflow orchestration.",
    ],
    tags: ["Computer Vision", "RAG", "VLM/LLM", "NestJS", "Docker", "Kubernetes"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  period?: string;
  link?: { label: string; url: string };
  tech: string[];
  bullets: string[];
};

export const PROJECTS: Project[] = [
  {
    name: "Seva — AI-Powered Food Donation Platform",
    blurb:
      "Full-stack AI platform connecting hostels and NGOs to reduce food wastage through real-time donation workflows.",
    link: { label: "GitHub", url: "https://github.com/" },
    tech: [
      "FastAPI",
      "React.js",
      "MongoDB",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "MobileNetV2",
      "WebSockets",
    ],
    bullets: [
      "Designed a computer vision pipeline using YOLOv8 for food detection and transfer-learned MobileNetV2 for freshness estimation.",
      "Engineered a capacity-aware, distance-based NGO matching algorithm with live location tracking and rule-based freshness/expiry validation.",
      "Implemented real-time notifications and tracking using WebSockets, plus rating and verification workflows for trust and security.",
    ],
  },
  {
    name: "Smart Waste Route Optimizer",
    blurb:
      "Smart-city waste management system predicting bin overflows and optimizing garbage-truck routes.",
    period: "March 2025",
    link: { label: "GitHub", url: "https://github.com/" },
    tech: ["C++", "Machine Learning", "Random Forest", "Dijkstra"],
    bullets: [
      "Integrated Dijkstra's algorithm (C++) with real-time ML prediction for dynamic route optimization and live bin monitoring via an interactive dashboard.",
      "Achieved 98% prediction accuracy for bin overflow detection using a Random Forest classifier on real-world urban waste data.",
    ],
  },
];

export const EDUCATION = {
  degree: "B.Tech — Computer Science (AI & ML)",
  institution: "KCC Institute of Technology & Management",
  period: "2022 — 2026",
  detail: "CGPA 7.69 / 10 (through 7th semester)",
  extra: [
    "Class XII (CBSE) — 91% · Class X — 90%",
    "CBSE District Topper in Mathematics (Top 0.01%)",
  ],
};

export const ACHIEVEMENTS = [
  "HCL JWD AI Certification (2025)",
  "400+ problems solved on LeetCode",
  "CBSE Mathematics Merit Certificate (2020)",
];

export const SOFT_SKILLS = [
  "Problem Solving",
  "Analytical Thinking",
  "Communication",
  "Adaptability",
  "Collaboration",
  "Time Management",
];
