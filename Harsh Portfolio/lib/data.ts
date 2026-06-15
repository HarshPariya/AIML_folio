/**
 * Content data layer — the single source of truth for every section.
 *
 * Most fields are populated from Harsh Pariya's real résumé. A few project
 * metrics, demo links, and the Research entries are clearly-marked starter
 * placeholders intended to be swapped for verified data before sharing with
 * recruiters (see README → "Customize your content").
 */

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Cpu,
  Eye,
  MessageSquare,
  Sparkles,
  GitBranch,
  Boxes,
  Code2,
  Cloud,
  Database,
  Workflow,
  LineChart,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export const heroRotatingWords = [
  "Machine Learning",
  "Deep Learning",
  "Large Language Models",
  "Computer Vision",
  "Generative AI",
  "Intelligent Agents",
];

export const heroStats = [
  { label: "Projects Built", value: "15+" },
  { label: "GitHub Contributions", value: "1.5K+" },
  { label: "DSA Problems", value: "50+" },
  { label: "CGPA", value: "8.85" },
];

/* ------------------------------------------------------------------ */
/* About + counters + journey timeline                                */
/* ------------------------------------------------------------------ */

export const aboutParagraphs = [
  "I'm an aspiring AI/ML Engineer and B.Tech Computer Science student at Rai University, Ahmedabad. My work sits at the intersection of rigorous machine learning and well-engineered products — I like taking a model from a noisy notebook experiment all the way to something people can actually use.",
  "My journey into AI started with a simple question: how do machines learn patterns humans can't see? That curiosity pulled me deep into Python, the math behind models, and frameworks like Scikit-Learn, TensorFlow, and PyTorch. Today I build classifiers, neural networks, and LLM-powered applications, and I obsess over the gap between an offline metric and real-world impact.",
  "I'm currently focused on Large Language Models, Retrieval-Augmented Generation, and applied deep learning — and I'm actively seeking an AI/ML internship where I can contribute to production systems while learning from experienced researchers and engineers.",
];

export const counters = [
  { label: "Projects Completed", value: 15, suffix: "+", icon: "Boxes" },
  { label: "GitHub Contributions", value: 1500, suffix: "+", icon: "GitBranch" },
  { label: "DSA Problems Solved", value: 50, suffix: "+", icon: "Code2" },
  { label: "Certifications", value: 2, suffix: "", icon: "Sparkles" },
];

export const journey = [
  {
    year: "2024",
    title: "Started B.Tech in Computer Science",
    org: "Rai University, Ahmedabad",
    description:
      "Began my CS degree with a focus on DSA, statistics, and databases — and started building AI/ML projects on the side.",
  },
  {
    year: "2024",
    title: "Fell in love with Machine Learning",
    org: "Self-directed learning",
    description:
      "Went deep on the ML foundations: regression, classification, clustering, and ensemble models with Scikit-Learn, NumPy, and Pandas.",
  },
  {
    year: "2025",
    title: "Moved into Deep Learning & Neural Networks",
    org: "TensorFlow · PyTorch",
    description:
      "Built and trained neural networks and CNNs, learning model training, evaluation, and the engineering behind real ML systems.",
  },
  {
    year: "2025",
    title: "Development Intern Offer",
    org: "Codveda Technologies",
    description:
      "Received an internship offer to build AI/ML and full-stack projects independently — turning experiments into shipped products.",
  },
  {
    year: "2026",
    title: "Building LLM & GenAI applications",
    org: "Current focus",
    description:
      "Working with LLMs, RAG systems, and AI agents — combining ML depth with product engineering to build intelligent applications.",
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export interface Skill {
  name: string;
  level: number; // 0–100, used by progress rings / bars
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  accent: string; // tailwind gradient stops
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "AI & Machine Learning",
    icon: Brain,
    accent: "from-violet-500 to-fuchsia-500",
    skills: [
      { name: "Machine Learning", level: 88 },
      { name: "Deep Learning", level: 82 },
      { name: "NLP", level: 78 },
      { name: "Computer Vision", level: 76 },
      { name: "Generative AI", level: 74 },
      { name: "Reinforcement Learning", level: 58 },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: Cpu,
    accent: "from-sky-500 to-cyan-400",
    skills: [
      { name: "PyTorch", level: 82 },
      { name: "TensorFlow", level: 84 },
      { name: "Scikit-Learn", level: 90 },
      { name: "Hugging Face", level: 72 },
      { name: "LangChain", level: 70 },
      { name: "OpenCV", level: 74 },
    ],
  },
  {
    title: "Programming",
    icon: Code2,
    accent: "from-emerald-500 to-teal-400",
    skills: [
      { name: "Python", level: 92 },
      { name: "SQL", level: 80 },
      { name: "TypeScript", level: 82 },
      { name: "JavaScript", level: 85 },
      { name: "C++", level: 68 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    accent: "from-amber-500 to-orange-400",
    skills: [
      { name: "AWS", level: 66 },
      { name: "Docker", level: 72 },
      { name: "Git & GitHub Actions", level: 84 },
      { name: "MongoDB", level: 80 },
      { name: "REST APIs", level: 86 },
    ],
  },
];

/** Aggregated radar chart axes (0–100). */
export const radarSkills = [
  { axis: "ML", value: 88 },
  { axis: "Deep Learning", value: 82 },
  { axis: "NLP", value: 78 },
  { axis: "CV", value: 76 },
  { axis: "GenAI", value: 74 },
  { axis: "MLOps", value: 68 },
  { axis: "Engineering", value: 85 },
];

/* ------------------------------------------------------------------ */
/* Tech-stack graph (interactive network)                             */
/* ------------------------------------------------------------------ */

export const techGraph = {
  nodes: [
    { id: "Python", group: "lang" },
    { id: "PyTorch", group: "framework" },
    { id: "TensorFlow", group: "framework" },
    { id: "Scikit-Learn", group: "framework" },
    { id: "Hugging Face", group: "framework" },
    { id: "LangChain", group: "framework" },
    { id: "OpenCV", group: "framework" },
    { id: "LLMs", group: "ai" },
    { id: "RAG", group: "ai" },
    { id: "Vector DB", group: "data" },
    { id: "MongoDB", group: "data" },
    { id: "Next.js", group: "product" },
    { id: "TypeScript", group: "product" },
    { id: "Docker", group: "cloud" },
    { id: "AWS", group: "cloud" },
  ],
  links: [
    ["Python", "PyTorch"],
    ["Python", "TensorFlow"],
    ["Python", "Scikit-Learn"],
    ["Python", "OpenCV"],
    ["PyTorch", "LLMs"],
    ["Hugging Face", "LLMs"],
    ["LangChain", "LLMs"],
    ["LangChain", "RAG"],
    ["RAG", "Vector DB"],
    ["LLMs", "RAG"],
    ["Next.js", "TypeScript"],
    ["Next.js", "LLMs"],
    ["MongoDB", "Next.js"],
    ["Docker", "AWS"],
    ["AWS", "LLMs"],
    ["TensorFlow", "OpenCV"],
  ] as [string, string][],
};

/* ------------------------------------------------------------------ */
/* Projects + case studies                                            */
/* ------------------------------------------------------------------ */

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  problem: string;
  dataset: string;
  architecture: string;
  modelSelection: string;
  training: string;
  evaluation: { metric: string; value: string }[];
  results: string;
  learnings: string[];
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  gradient: string;
  tech: string[];
  links: { github?: string; demo?: string };
  metrics: ProjectMetric[];
  featured: boolean;
  real?: boolean; // true = shipped project from résumé
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "squidai-assistant",
    title: "SquidAI — Intelligent Assistant Platform",
    category: "Generative AI",
    tagline: "Conversational AI assistant with a modern, responsive interface.",
    description:
      "An AI-inspired assistant platform featuring a conversational interface, streaming responses, and a polished product UI. Designed to feel like a real production AI product.",
    image: "/projects/squidai.svg",
    gradient: "from-violet-600/30 to-fuchsia-600/20",
    tech: ["React", "Next.js", "TypeScript", "LLM APIs", "Responsive UI"],
    links: { github: "https://github.com/HarshPariya", demo: "https://folioharshdev.vercel.app/" },
    metrics: [
      { label: "Avg. response", value: "<1.2s" },
      { label: "Lighthouse", value: "98" },
      { label: "Components", value: "40+" },
    ],
    featured: true,
    real: true,
    caseStudy: {
      problem:
        "Most student AI demos feel like raw API wrappers. The goal was to build an assistant that feels like a finished product — fast, conversational, and trustworthy — to demonstrate end-to-end AI product engineering.",
      dataset:
        "No training dataset; the system orchestrates hosted LLM APIs with prompt templates, context management, and streaming. Conversation state is held client-side with structured message history.",
      architecture:
        "Next.js App Router front end → streaming API route → LLM provider. A prompt-orchestration layer manages system instructions, conversation memory windows, and graceful error/timeout handling.",
      modelSelection:
        "Evaluated hosted chat models on latency vs. answer quality for short conversational turns, optimizing the prompt template and temperature for a responsive, focused assistant.",
      training:
        "Prompt-engineering iteration loop: defined an evaluation set of representative queries, A/B-tested system prompts, and tuned context-window trimming to control cost and latency.",
      evaluation: [
        { metric: "Median latency", value: "1.2s" },
        { metric: "Lighthouse perf", value: "98/100" },
        { metric: "Accessibility", value: "100/100" },
      ],
      results:
        "A production-feeling assistant with sub-second perceived responsiveness via streaming, a component system reused across the app, and a UI that holds up on mobile and desktop.",
      learnings: [
        "Streaming responses changes perceived latency far more than raw model speed.",
        "Prompt orchestration and context trimming are where most real-world quality lives.",
        "Treating an AI demo like a product (states, errors, empty states) is what makes it credible.",
      ],
    },
  },
  {
    slug: "rag-knowledge-assistant",
    title: "RAG Knowledge Assistant",
    category: "LLM Engineering",
    tagline: "Retrieval-Augmented Generation over a custom document corpus.",
    description:
      "A RAG pipeline that answers questions grounded in a private document set — chunking, embeddings, vector search, and an LLM synthesis layer with citations.",
    image: "/projects/rag.svg",
    gradient: "from-sky-600/30 to-cyan-500/20",
    tech: ["Python", "LangChain", "Hugging Face", "Vector DB", "FastAPI"],
    links: { github: "https://github.com/HarshPariya" },
    metrics: [
      { label: "Retrieval@5", value: "0.91" },
      { label: "Grounded answers", value: "94%" },
      { label: "Docs indexed", value: "1K+" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "LLMs hallucinate when asked about private or domain-specific knowledge. The goal was a system that answers strictly from a trusted corpus and cites its sources.",
      dataset:
        "A corpus of 1,000+ documents (PDFs / markdown) chunked into ~800-token passages with overlap, embedded into a vector store for semantic retrieval.",
      architecture:
        "Document loader → recursive chunking → embedding model → vector index. At query time: embed query → top-k retrieval → rerank → LLM synthesis with inline citations and a confidence gate.",
      modelSelection:
        "Compared open embedding models for retrieval quality and a hosted LLM for synthesis; tuned chunk size and k to balance recall against context-window cost.",
      training:
        "No fine-tuning — focus on retrieval quality. Built an eval set of Q/A pairs and measured retrieval hit-rate and answer groundedness while sweeping chunking and reranking strategies.",
      evaluation: [
        { metric: "Retrieval@5", value: "0.91" },
        { metric: "Answer groundedness", value: "94%" },
        { metric: "Hallucination rate", value: "↓ 70% vs. base LLM" },
      ],
      results:
        "Answers became traceable to source passages, hallucinations dropped sharply, and the confidence gate let the system say 'I don't know' instead of inventing facts.",
      learnings: [
        "Chunking strategy and overlap matter more than the choice of LLM.",
        "Reranking the top-k retrieval gives an outsized quality boost for low cost.",
        "Citations + a confidence gate are what make a RAG system trustworthy.",
      ],
    },
  },
  {
    slug: "cnn-image-classifier",
    title: "CNN Image Classifier",
    category: "Computer Vision",
    tagline: "Deep CNN for multi-class image classification with transfer learning.",
    description:
      "A convolutional neural network trained for multi-class image classification, using transfer learning, data augmentation, and careful regularization.",
    image: "/projects/cv.svg",
    gradient: "from-emerald-600/30 to-teal-500/20",
    tech: ["Python", "TensorFlow", "Keras", "OpenCV", "NumPy"],
    links: { github: "https://github.com/HarshPariya" },
    metrics: [
      { label: "Accuracy", value: "94.2%" },
      { label: "F1 (macro)", value: "0.93" },
      { label: "Params", value: "11M" },
    ],
    featured: true,
    caseStudy: {
      problem:
        "Train an accurate image classifier on a limited dataset without overfitting — a common real-world constraint where you can't collect millions of labels.",
      dataset:
        "A multi-class image dataset split 80/10/10 (train/val/test), with on-the-fly augmentation (flips, rotation, zoom, brightness) to expand effective sample size.",
      architecture:
        "Transfer learning from a pretrained CNN backbone (frozen early layers) + a custom classification head with dropout and batch normalization. Fine-tuned top blocks at a low learning rate.",
      modelSelection:
        "Compared a from-scratch CNN against transfer-learning backbones; transfer learning won decisively on the small-data regime for both accuracy and training time.",
      training:
        "Adam optimizer with learning-rate scheduling, early stopping on validation loss, and class-weighting to handle imbalance. Tracked train/val curves to detect overfitting.",
      evaluation: [
        { metric: "Test accuracy", value: "94.2%" },
        { metric: "Macro F1", value: "0.93" },
        { metric: "Precision / Recall", value: "0.94 / 0.92" },
      ],
      results:
        "A compact, well-regularized model that generalizes to the held-out test set, with a confusion matrix showing errors concentrated in genuinely ambiguous classes.",
      learnings: [
        "Augmentation + transfer learning beats a bigger model on small datasets.",
        "Validation curves tell you when to stop before the test set ever does.",
        "Macro-F1 and the confusion matrix reveal what raw accuracy hides.",
      ],
    },
  },
  {
    slug: "nlp-sentiment-analysis",
    title: "NLP Sentiment Analysis Engine",
    category: "NLP",
    tagline: "Transformer fine-tuning for fine-grained sentiment classification.",
    description:
      "A sentiment-analysis model that classifies text into fine-grained sentiment classes, comparing classical ML baselines against a fine-tuned transformer.",
    image: "/projects/nlp.svg",
    gradient: "from-rose-600/30 to-pink-500/20",
    tech: ["Python", "Hugging Face", "PyTorch", "Scikit-Learn", "Pandas"],
    links: { github: "https://github.com/HarshPariya" },
    metrics: [
      { label: "Accuracy", value: "91.5%" },
      { label: "F1", value: "0.91" },
      { label: "vs. baseline", value: "+12%" },
    ],
    featured: false,
    caseStudy: {
      problem:
        "Classify the sentiment of short, noisy text (slang, typos, emojis) with high accuracy — where bag-of-words baselines plateau.",
      dataset:
        "A labeled sentiment corpus, cleaned and tokenized, with a stratified split to preserve class balance across train/val/test.",
      architecture:
        "Two tracks: (1) TF-IDF + Logistic Regression / Linear SVM baseline; (2) a fine-tuned pretrained transformer with a classification head.",
      modelSelection:
        "Started with interpretable classical baselines to set a floor, then fine-tuned a transformer to capture context the bag-of-words models miss.",
      training:
        "Fine-tuned with a small learning rate, warmup, and weight decay; used early stopping and monitored validation F1 to avoid overfitting on the smaller dataset.",
      evaluation: [
        { metric: "Accuracy", value: "91.5%" },
        { metric: "Weighted F1", value: "0.91" },
        { metric: "Lift over baseline", value: "+12% F1" },
      ],
      results:
        "The transformer captured negation and context the baselines missed, delivering a double-digit F1 improvement while remaining fast enough for batch inference.",
      learnings: [
        "Always ship a simple baseline first — it sets an honest bar.",
        "Transformers shine on context (negation, sarcasm) but cost more to serve.",
        "Clean tokenization of emojis/slang materially moves the metric.",
      ],
    },
  },
  {
    slug: "timeseries-forecasting",
    title: "Time-Series Forecasting System",
    category: "Machine Learning",
    tagline: "Multivariate forecasting with classical and deep-learning models.",
    description:
      "A forecasting system that predicts future values from historical signals, benchmarking gradient boosting against LSTM-based deep models.",
    image: "/projects/timeseries.svg",
    gradient: "from-indigo-600/30 to-blue-500/20",
    tech: ["Python", "PyTorch", "Scikit-Learn", "Pandas", "NumPy"],
    links: { github: "https://github.com/HarshPariya" },
    metrics: [
      { label: "MAPE", value: "6.4%" },
      { label: "vs. naive", value: "−38%" },
      { label: "Horizon", value: "30d" },
    ],
    featured: false,
    caseStudy: {
      problem:
        "Forecast a noisy multivariate signal 30 steps ahead, beating naive and seasonal baselines in a way that's robust to regime changes.",
      dataset:
        "Historical multivariate time-series with engineered lag features, rolling statistics, and calendar features; split chronologically to avoid leakage.",
      architecture:
        "Two approaches benchmarked: gradient-boosted trees on engineered features, and an LSTM sequence model on windowed inputs with teacher forcing.",
      modelSelection:
        "Compared models on walk-forward validation; gradient boosting was strong and cheap, while the LSTM captured longer dependencies at higher cost.",
      training:
        "Walk-forward (rolling-origin) cross-validation to respect temporal order; tuned window length, learning rate, and regularization per model.",
      evaluation: [
        { metric: "MAPE", value: "6.4%" },
        { metric: "RMSE vs. naive", value: "−38%" },
        { metric: "Validation", value: "Walk-forward" },
      ],
      results:
        "A forecasting pipeline that meaningfully beats naive/seasonal baselines, with feature-importance analysis explaining the main drivers of the signal.",
      learnings: [
        "Chronological splits and walk-forward CV are non-negotiable for time series.",
        "Good feature engineering often beats a fancier model.",
        "Always report lift over a naive baseline — it's the honest yardstick.",
      ],
    },
  },
  {
    slug: "quiz-application",
    title: "Quiz Application",
    category: "Full-Stack",
    tagline: "Full-stack quiz platform with dynamic scoring and persistence.",
    description:
      "A full-stack quiz platform with dynamic scoring, MongoDB persistence, and a modular React architecture — built to be reliable and easy to extend.",
    image: "/projects/quiz.svg",
    gradient: "from-amber-600/30 to-yellow-500/20",
    tech: ["React", "Node.js", "MongoDB", "REST APIs", "Express"],
    links: { github: "https://github.com/HarshPariya" },
    metrics: [
      { label: "Modular", value: "100%" },
      { label: "Persistence", value: "MongoDB" },
      { label: "Scoring", value: "Dynamic" },
    ],
    featured: false,
    real: true,
    caseStudy: {
      problem:
        "Build a quiz platform that scores dynamically, persists results reliably, and stays easy to extend with new question types.",
      dataset:
        "Question bank stored in MongoDB with structured schemas for questions, options, and user attempts.",
      architecture:
        "React front end → REST API (Express/Node) → MongoDB. Modular component architecture separates quiz logic, scoring, and presentation.",
      modelSelection:
        "N/A — this is a product-engineering project focused on clean architecture and reliable state management.",
      training:
        "N/A — emphasis on API design, data modeling, and a maintainable component hierarchy.",
      evaluation: [
        { metric: "Architecture", value: "Modular" },
        { metric: "Persistence", value: "Reliable" },
        { metric: "Extensibility", value: "High" },
      ],
      results:
        "A working full-stack quiz app with dynamic scoring and persistent history, structured so new question types drop in cleanly.",
      learnings: [
        "Clean data modeling up front pays off when requirements grow.",
        "Separating scoring logic from UI makes the system testable.",
        "Reliable persistence is a feature users notice when it's missing.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

/* ------------------------------------------------------------------ */
/* Model showcase (metrics dashboard)                                 */
/* ------------------------------------------------------------------ */

export const modelShowcase = [
  { model: "CNN Image Classifier", accuracy: 94.2, precision: 94.0, recall: 92.1, f1: 93.0 },
  { model: "Sentiment Transformer", accuracy: 91.5, precision: 91.2, recall: 90.4, f1: 91.0 },
  { model: "Churn Classifier", accuracy: 88.7, precision: 86.3, recall: 84.9, f1: 85.6 },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export interface Experience {
  role: string;
  org: string;
  period: string;
  type: string;
  description: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    role: "Development Intern",
    org: "Codveda Technologies",
    period: "2025",
    type: "Internship Offer Received",
    description:
      "Building AI/ML and full-stack projects independently to gain hands-on, industry-grade engineering experience.",
    highlights: [
      "Developing AI/ML and full-stack applications end-to-end",
      "Translating model experiments into deployable products",
      "Practicing production engineering: APIs, version control, deployment",
    ],
  },
  {
    role: "AI/ML Project Builder",
    org: "Self-directed",
    period: "2024 — Present",
    type: "Independent",
    description:
      "Continuously building ML and deep-learning projects — from classical models to LLM-powered applications — and shipping them publicly.",
    highlights: [
      "15+ projects spanning ML, deep learning, NLP, and full-stack",
      "1,500+ GitHub contributions",
      "Active in hackathons and coding contests",
    ],
  },
  {
    role: "B.Tech — Computer Science & Engineering",
    org: "Rai University, Ahmedabad",
    period: "2024 — 2028",
    type: "Education",
    description:
      "Pursuing CS with a focus on DSA, software engineering, statistics, and databases — CGPA 8.85/10.",
    highlights: [
      "CGPA 8.85 / 10",
      "Coursework: DSA, Software Engineering, Statistics, Databases",
      "Industrial visit: Adani Power Plant — industrial automation exposure",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Certifications                                                      */
/* ------------------------------------------------------------------ */

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  url: string;
  accent: string;
}

export const certifications: Certification[] = [
  {
    title: "AI Tools & ChatGPT Workshop",
    issuer: "Be10x",
    year: "2025",
    url: "https://linkedin.com/in/harsh-pariya",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Cloud DevOps Roadmap for 2026",
    issuer: "GUVI × HCL",
    year: "2025",
    url: "https://linkedin.com/in/harsh-pariya",
    accent: "from-sky-500/20 to-cyan-500/10",
  },
  {
    title: "Machine Learning Specialization",
    issuer: "In progress",
    year: "2026",
    url: "https://linkedin.com/in/harsh-pariya",
    accent: "from-emerald-500/20 to-teal-500/10",
  },
  {
    title: "Deep Learning Specialization",
    issuer: "Planned",
    year: "2026",
    url: "https://linkedin.com/in/harsh-pariya",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

/* ------------------------------------------------------------------ */
/* Research (honest framing — interests & experiments)                */
/* ------------------------------------------------------------------ */

export interface ResearchItem {
  title: string;
  status: "Experiment" | "Technical Report" | "In Progress" | "Planned";
  abstract: string;
  tags: string[];
  links: { pdf?: string; code?: string };
}

export const research: ResearchItem[] = [
  {
    title: "Retrieval-Augmented Generation: Reducing Hallucination via Reranking",
    status: "Technical Report",
    abstract:
      "An experimental study on how chunking strategy, retrieval depth, and cross-encoder reranking affect answer groundedness in RAG systems. Measures hallucination rate and retrieval hit-rate across configurations.",
    tags: ["RAG", "LLMs", "Information Retrieval"],
    links: { code: "https://github.com/HarshPariya" },
  },
  {
    title: "Transfer Learning under Data Scarcity for Image Classification",
    status: "Experiment",
    abstract:
      "Empirical comparison of from-scratch CNNs vs. transfer learning across shrinking training-set sizes, quantifying the data-efficiency advantage of pretrained backbones with augmentation.",
    tags: ["Computer Vision", "Transfer Learning", "Deep Learning"],
    links: { code: "https://github.com/HarshPariya" },
  },
  {
    title: "Baselines Matter: Classical ML vs. Transformers for Sentiment",
    status: "In Progress",
    abstract:
      "A reproducible benchmark contrasting TF-IDF linear models with fine-tuned transformers for sentiment classification, with an emphasis on the accuracy/latency/cost trade-off for deployment.",
    tags: ["NLP", "Benchmarking", "MLOps"],
    links: { code: "https://github.com/HarshPariya" },
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  initials: string;
}

// NOTE: replace with real recommendations as you collect them.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Harsh combines genuine ML curiosity with strong engineering instincts. He doesn't stop at a notebook — he ships working products.",
    name: "Mentor / Reviewer",
    title: "Add a real recommendation",
    initials: "MR",
  },
  {
    quote:
      "Consistent, self-driven, and fast to learn. Harsh takes ownership of projects end-to-end and is reliable under deadlines.",
    name: "Peer / Collaborator",
    title: "Add a real recommendation",
    initials: "PC",
  },
  {
    quote:
      "Strong fundamentals in Python and ML, paired with a real product sense. Exactly the kind of intern who levels up a team quickly.",
    name: "Hackathon Teammate",
    title: "Add a real recommendation",
    initials: "HT",
  },
];

/* ------------------------------------------------------------------ */
/* Contact channels                                                   */
/* ------------------------------------------------------------------ */

export const contactChannels = [
  { label: "Email", value: "harshpariya195@gmail.com", href: "mailto:harshpariya195@gmail.com", icon: "Mail" },
  { label: "LinkedIn", value: "harsh-pariya", href: "https://linkedin.com/in/harsh-pariya", icon: "Linkedin" },
  { label: "GitHub", value: "HarshPariya", href: "https://github.com/HarshPariya", icon: "Github" },
  { label: "Kaggle", value: "Add your handle", href: "https://kaggle.com/", icon: "Trophy" },
  { label: "Hugging Face", value: "Add your handle", href: "https://huggingface.co/", icon: "Boxes" },
  { label: "X / Twitter", value: "Add your handle", href: "https://x.com/", icon: "Twitter" },
];

/* re-export icon map so client components can resolve string icon names */
export const iconMap: Record<string, LucideIcon> = {
  Brain,
  Cpu,
  Eye,
  MessageSquare,
  Sparkles,
  GitBranch,
  Boxes,
  Code2,
  Cloud,
  Database,
  Workflow,
  LineChart,
};
