// Single source of truth for Aryan Sethi's portfolio content.

export const profile = {
  name: "Aryan Sethi",
  role: "AI Engineer",
  location: "Noida, UP, India",
  email: "aryansethi243@gmail.com",
  phone: "+91 70821 17633",
  linkedin: { label: "aryan-sethi", url: "https://www.linkedin.com/in/aryan-sethi-8b03b827b/" },
  github: { label: "Aryan-stark", url: "https://github.com/Aryan-stark" },
  /** Public-asset path — render with asset() from "@/lib/basePath". */
  resume: "/Aryan_Sethi_Resume.pdf",
  tagline: "AI Engineer building scalable, real-time AI systems.",
  summary:
    "AI Engineer with hands-on experience building scalable, production-grade AI systems using Python, REST APIs, NestJS, and Generative AI (LLMs, RAG, VLMs). Skilled in designing agentic and multi-agent workflows and end-to-end ML pipelines, with a strong foundation in data structures, algorithms, multithreading, and system design. Proven ability to deliver full-stack AI products from model integration to containerized deployment.",
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
      "Built a full-stack real-time anomaly detection system using computer vision, RTSP stream ingestion, and domain-specific rule engines for temporal event analysis, integrating VLM/LLM verification pipelines with guardrails and multi-agent k-voting workflows to improve accuracy and reduce false positives.",
      "Containerized and deployed backend services using NestJS, Docker, and Kubernetes for scalable AI workflow orchestration.",
      "Developed scalable AI-powered RAG systems on Milvus using hybrid retrieval (dense + sparse/keyword) pipelines and analytics dashboards for enterprise knowledge querying and monitoring.",
      "Developed a local-first macOS desktop automation platform shipped as an Electron app backed by a cloud Express/MySQL API — with in-chat connectors (Gmail, Slack, Google Drive), a Model Hub to discover, download, and manage device-compatible LLMs, and an agent → SSE → MCP gateway (127.0.0.1) routing to Slack and a keyless local web-search daemon via a Bearer-token cloud API.",
    ],
    tags: ["Computer Vision", "RAG", "VLM/LLM", "Electron", "NestJS", "Docker", "Kubernetes"],
  },
];

export type Project = {
  name: string;
  blurb: string;
  period?: string;
  link?: { label: string; url: string };
  tech: string[];
  bullets: string[];
  /** Render full-width with an expanded layout (flagship work). */
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    name: "Klypup — AI-Powered Dynamic Pricing Intelligence Dashboard",
    blurb:
      "Multi-tenant SaaS pricing dashboard where a 5-agent AI pipeline analyzes competitor prices, demand elasticity, inventory pressure, and compliance rules to generate confidence-scored pricing recommendations with full per-agent reasoning transparency.",
    featured: true,
    link: { label: "GitHub", url: "https://github.com/Aryan-stark/Klypup" },
    tech: [
      "FastAPI",
      "React.js",
      "TypeScript",
      "MongoDB",
      "Groq API",
      "LLaMA 3.3-70B",
      "Tailwind CSS",
      "Docker",
      "JWT",
      "SSE",
      "Zustand",
      "React Query",
    ],
    bullets: [
      "Designed a sequential agentic workflow using the Template Method pattern, where each agent uses LLM tool-calling (ReAct loop) with defensive JSON parsing, nudge-retry, and context-window optimization to operate within 8K-token model limits.",
      "Engineered a human-in-the-loop approval workflow with deterministic confidence-based routing (auto-approve / pending / escalated), analyst override with price-bound validation, and an immutable audit trail for every price action.",
      "Implemented tenant-isolated multi-tenancy with org_id extracted exclusively from JWT claims, dual-token auth (15-min access + 7-day rotating refresh), role-based access control, and sliding-window rate limiting.",
      "Built real-time pipeline progress streaming via Server-Sent Events with asyncio queues, in-memory TTL caching, a multi-provider AI fallback chain (Cerebras → Gemini → Groq), and a responsive React frontend with code splitting and debounced search.",
    ],
  },
  {
    name: "Seva — AI-Powered Food Donation Platform",
    blurb:
      "Full-stack AI platform connecting hostels and NGOs to reduce food wastage through real-time donation workflows.",
    link: { label: "GitHub", url: "https://github.com/Aryan-stark/seva-py" },
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
    link: { label: "GitHub", url: "https://github.com/Aryan-stark/Smart_waste_route_optimizer" },
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
  detail: "CGPA 7.66 / 10 — I Division with Distinction",
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
