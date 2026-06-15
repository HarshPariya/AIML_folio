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
      "Received an internship offer to build AI/ML and full-stack projects independently — turning experiments into production systems.",
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

export interface Language {
  name: string;
  proficiency: string;
}

export const languages: Language[] = [
  { name: "English", proficiency: "Professional" },
  { name: "Hindi", proficiency: "Native" },
  { name: "Gujarati", proficiency: "Native" },
];

export interface SoftSkill {
  name: string;
}

export const softSkills: SoftSkill[] = [
  { name: "Problem Solving" },
  { name: "Analytical Thinking" },
  { name: "Continuous Learning" },
  { name: "Team Collaboration" },
  { name: "Project Ownership" },
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
    { id: "TensorFlow", group: "framework" },
    { id: "Scikit-Learn", group: "framework" },
    { id: "PyTorch", group: "framework" },
    { id: "NumPy", group: "framework" },
    { id: "Pandas", group: "framework" },
    { id: "ML APIs", group: "framework" },
    { id: "Model Integration", group: "framework" },
    { id: "Feature Engineering", group: "framework" },
    { id: "Data Preprocessing", group: "data" },
    { id: "Classification", group: "data" },
    { id: "Regression", group: "ai" },
    { id: "Ensemble Models", group: "ai" },
    { id: "Clustering", group: "data" },
    { id: "Neural Networks", group: "ai" },
    { id: "React", group: "product" },
    { id: "Next.js", group: "product" },
    { id: "TypeScript", group: "product" },
    { id: "Node.js", group: "product" },
    { id: "REST APIs", group: "product" },
    { id: "MongoDB", group: "data" },
    { id: "Git", group: "cloud" },
    { id: "Docker", group: "cloud" },
    { id: "AWS", group: "cloud" },
  ],
  links: [
    ["Python", "TensorFlow"],
    ["Python", "Scikit-Learn"],
    ["Python", "PyTorch"],
    ["Python", "NumPy"],
    ["Python", "Pandas"],
    ["NumPy", "Feature Engineering"],
    ["Pandas", "Data Preprocessing"],
    ["Data Preprocessing", "Classification"],
    ["Data Preprocessing", "Clustering"],
    ["PyTorch", "Neural Networks"],
    ["TensorFlow", "Neural Networks"],
    ["Scikit-Learn", "Classification"],
    ["Scikit-Learn", "Regression"],
    ["Scikit-Learn", "Ensemble Models"],
    ["ML APIs", "Model Integration"],
    ["Feature Engineering", "Classification"],
    ["Feature Engineering", "Regression"],
    ["Neural Networks", "Model Integration"],
    ["Model Integration", "REST APIs"],
    ["React", "Next.js"],
    ["React", "TypeScript"],
    ["Next.js", "Node.js"],
    ["Node.js", "REST APIs"],
    ["REST APIs", "MongoDB"],
    ["MongoDB", "React"],
    ["Docker", "AWS"],
    ["Docker", "Node.js"],
    ["Git", "Docker"],
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
  real?: boolean; // true = real project from résumé
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "squidai",
    title: "SquidAI",
    category: "Generative AI",
    tagline: "AI-powered technical assistant for code generation and debugging.",
    description:
      "SquidAI is an AI-powered technical assistant that helps developers generate, explain, and refactor code faster. It focuses on practical use-cases like debugging help and boilerplate generation.",
    image: "/projects/squidai.png",
    gradient: "from-violet-600/30 to-fuchsia-600/20",
    tech: ["AI", "Full Stack", "React", "Node"],
    links: {
      github: "https://github.com/HarshPariya/SquidAI",
      demo: "https://squid-ai-phi.vercel.app/",
    },
    metrics: [
      { label: "Stack", value: "Full Stack" },
      { label: "Focus", value: "AI Dev" },
      { label: "Year", value: "2026" },
    ],
    featured: true,
    real: true,
    caseStudy: {
      problem:
        "Developers spend significant time on boilerplate, debugging explanations, and repetitive coding tasks. SquidAI was built to provide a fast, practical AI assistant focused on real developer workflows.",
      dataset:
        "No custom training dataset — the app orchestrates AI APIs with structured prompts for code generation, explanation, and refactoring tasks.",
      architecture:
        "React front end with a Node.js backend, routing AI requests through a prompt layer that handles code context, streaming responses, and error states.",
      modelSelection:
        "Evaluated hosted AI models for code-quality output and response latency, optimizing prompts for debugging help and boilerplate generation.",
      training:
        "Iterative prompt-engineering: tested representative developer queries, refined system instructions, and tuned the UX for streaming responses.",
      evaluation: [
        { metric: "Use cases", value: "Debug + codegen" },
        { metric: "Stack", value: "React + Node" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "A live AI technical assistant deployed on Vercel with a polished interface for code generation, explanation, and refactoring.",
      learnings: [
        "AI developer tools need tight prompt scoping to stay useful.",
        "Streaming responses make AI assistants feel dramatically faster.",
        "Shipping a real product UI builds more credibility than a raw API demo.",
      ],
    },
  },
  {
    slug: "campus-navigation",
    title: "Campus Navigation System",
    category: "Full-Stack",
    tagline: "Interactive campus navigation for students and visitors.",
    description:
      "An interactive campus navigation system that lets students and visitors find buildings, routes, and key locations on campus using an intuitive web interface.",
    image: "/projects/campus-navigation.png",
    gradient: "from-sky-600/30 to-cyan-500/20",
    tech: ["React", "TypeScript", "Maps", "Tailwind CSS", "Backend"],
    links: {
      github: "https://github.com/HarshPariya/Campus_Navigation_Frontend",
      demo: "https://campus-navigation-sigma.vercel.app/",
    },
    metrics: [
      { label: "Maps", value: "Interactive" },
      { label: "Stack", value: "React" },
      { label: "Year", value: "2025" },
    ],
    featured: true,
    real: true,
    caseStudy: {
      problem:
        "New students and visitors struggle to find buildings and routes on campus. A web-based navigation tool was needed to make campus exploration intuitive without installing an app.",
      dataset:
        "Campus location data — building names, coordinates, and route points — structured for map rendering and search.",
      architecture:
        "React + TypeScript front end with map integration, search/filter UI, and a backend layer for location data and routing logic.",
      modelSelection:
        "Chose a map-first web architecture with React and TypeScript for type-safe UI components and responsive layout across devices.",
      training:
        "Built iteratively: mapped campus locations, wired search and route display, and refined the mobile-first navigation experience.",
      evaluation: [
        { metric: "Platform", value: "Web" },
        { metric: "UI", value: "Mobile-first" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "A deployed campus navigation app where users can find buildings, view routes, and explore key locations through a clean interface.",
      learnings: [
        "Map UX needs simple search and clear visual hierarchy.",
        "TypeScript catches routing and location-state bugs early.",
        "Campus tools must work well on phones — that's how students use them.",
      ],
    },
  },
  {
    slug: "travelgo",
    title: "TravelGo",
    category: "Frontend",
    tagline: "Responsive travel agency website with conversion-focused UI.",
    description:
      "TravelGo is a responsive travel agency website that showcases destinations, packages, and CTAs with a focus on clean layout and conversion-friendly UI.",
    image: "/projects/travelgo.png",
    gradient: "from-emerald-600/30 to-teal-500/20",
    tech: ["React", "Landing Page", "Tailwind CSS", "Frontend"],
    links: {
      github: "https://github.com/HarshPariya/Travel-GO-Frontend",
      demo: "https://travelgo-by-hp01.netlify.app/",
    },
    metrics: [
      { label: "Layout", value: "Responsive" },
      { label: "Stack", value: "React" },
      { label: "Year", value: "2025" },
    ],
    featured: true,
    real: true,
    caseStudy: {
      problem:
        "Travel agency sites often feel cluttered and fail to guide users toward booking. TravelGo needed a clean, modern landing experience that highlights destinations and drives action.",
      dataset:
        "Static travel content — destinations, packages, pricing highlights, and CTA copy — structured for modular page sections.",
      architecture:
        "Single-page React application with section-based layout, reusable card components, and Tailwind CSS for responsive styling.",
      modelSelection:
        "React + Tailwind for fast iteration on layout, typography, and responsive breakpoints without heavy CSS overhead.",
      training:
        "Designed section by section: hero, destinations, packages, and CTAs — refining visual hierarchy and mobile layout at each step.",
      evaluation: [
        { metric: "Responsive", value: "100%" },
        { metric: "Focus", value: "Conversion UI" },
        { metric: "Deployment", value: "Netlify" },
      ],
      results:
        "A polished travel agency website live on Netlify with destination showcases, package sections, and clear call-to-action flows.",
      learnings: [
        "Landing pages need one primary CTA per section.",
        "Tailwind speeds up responsive polish significantly.",
        "Visual hierarchy matters more than feature count on marketing sites.",
      ],
    },
  },
  {
    slug: "quiz-app",
    title: "Quiz App",
    category: "Full-Stack",
    tagline: "Interactive quiz app with scoring and mobile-first UI.",
    description:
      "A quiz application that lets users answer multiple choice questions with instant feedback, score tracking, and a clean mobile-first UI.",
    image: "/projects/quiz-app.png",
    gradient: "from-amber-600/30 to-yellow-500/20",
    tech: ["React", "JavaScript", "Frontend"],
    links: {
      github: "https://github.com/HarshPariya/Quiz-App-Frontend",
      demo: "https://quiz-app-by-harsh.netlify.app/",
    },
    metrics: [
      { label: "Feedback", value: "Instant" },
      { label: "UI", value: "Mobile" },
      { label: "Year", value: "2024" },
    ],
    featured: false,
    real: true,
    caseStudy: {
      problem:
        "Quiz apps need to feel engaging and responsive — instant feedback, clear scoring, and a UI that works on phones where most users play.",
      dataset:
        "Structured question bank with multiple-choice options, correct answers, and score metadata for each quiz session.",
      architecture:
        "React front end with component-based quiz flow: question display, answer selection, score tracking, and result summary.",
      modelSelection:
        "React with modular components to separate quiz logic, scoring, and presentation for easy extension.",
      training:
        "Built core quiz loop first, then added score tracking, instant feedback animations, and mobile layout refinements.",
      evaluation: [
        { metric: "Feedback", value: "Instant" },
        { metric: "Architecture", value: "Modular" },
        { metric: "Deployment", value: "Netlify" },
      ],
      results:
        "A live quiz app with multiple-choice questions, real-time scoring, and a clean mobile-first experience.",
      learnings: [
        "Separating quiz state from UI makes the app easier to extend.",
        "Instant feedback keeps users engaged through a quiz session.",
        "Mobile-first layout is essential for interactive apps.",
      ],
    },
  },
  {
    slug: "portfolio-nextjs",
    title: "Portfolio (Next.js)",
    category: "Frontend",
    tagline: "Modern responsive portfolio with animated hero and project showcase.",
    description:
      "A modern, responsive portfolio website built with Next.js featuring a dark-space themed design, animated hero section, interactive project showcases, and seamless navigation.",
    image: "/projects/portfolio-nextjs.png",
    gradient: "from-indigo-600/30 to-blue-500/20",
    tech: ["Next.js", "React", "Portfolio", "CSS"],
    links: {
      github: "https://github.com/HarshPariya/Portfolio_NextJs",
      demo: "https://portfolio-by-harshp.netlify.app/",
    },
    metrics: [
      { label: "Framework", value: "Next.js" },
      { label: "Theme", value: "Dark" },
      { label: "Year", value: "2025" },
    ],
    featured: false,
    real: true,
    caseStudy: {
      problem:
        "A developer portfolio needs to showcase projects clearly, load fast, and feel polished — not like a generic template.",
      dataset:
        "Project metadata, skills, and personal content structured as static data for fast page rendering.",
      architecture:
        "Next.js App Router with reusable section components, animated hero, project cards, and responsive navigation.",
      modelSelection:
        "Next.js for SEO-friendly routing, image optimization, and a component architecture that scales as projects grow.",
      training:
        "Designed the dark-space theme, built section by section, and iterated on animations and project showcase layout.",
      evaluation: [
        { metric: "Framework", value: "Next.js" },
        { metric: "Sections", value: "Multi-page" },
        { metric: "Deployment", value: "Netlify" },
      ],
      results:
        "A deployed portfolio with animated hero, project showcase, and responsive navigation — live on Netlify.",
      learnings: [
        "Portfolio structure should lead with your strongest projects.",
        "Consistent theming across sections makes the site feel premium.",
        "Next.js image and routing tools simplify portfolio maintenance.",
      ],
    },
  },
  {
    slug: "harsh-portfolio-v2",
    title: "Folio Harsh Dev (v2)",
    category: "Full-Stack",
    tagline: "Premium developer portfolio with animations and GitHub integration.",
    description:
      "A premium, fully custom developer portfolio built with Next.js 16, TypeScript, and Framer Motion — featuring scroll-triggered animations, a dynamic project showcase, GitHub stats integration, and a fully responsive layout.",
    image: "/projects/folio-harsh-dev.png",
    gradient: "from-rose-600/30 to-pink-500/20",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Vercel"],
    links: {
      github: "https://github.com/HarshPariya/harsh-portfolio",
      demo: "https://folioharshdev.vercel.app/",
    },
    metrics: [
      { label: "Sections", value: "10+" },
      { label: "Motion", value: "Framer" },
      { label: "Year", value: "2026" },
    ],
    featured: false,
    real: true,
    caseStudy: {
      problem:
        "A second portfolio iteration needed to feel premium — custom design, smooth animations, live GitHub stats, and a project showcase that reflects real work.",
      dataset:
        "Project case studies, experience timeline, GitHub/LeetCode profile data, and tech stack content managed as structured site data.",
      architecture:
        "Next.js 16 + TypeScript with Framer Motion animations, custom CSS design tokens, dynamic GitHub stats, and 10+ interactive sections.",
      modelSelection:
        "Next.js 16 for performance, TypeScript for maintainability, Framer Motion for scroll-triggered reveals, and Vercel for edge deployment.",
      training:
        "Four-phase build: design system → animations → content sections → performance/SEO optimization before Vercel deployment.",
      evaluation: [
        { metric: "Sections", value: "10+" },
        { metric: "Animation", value: "Framer Motion" },
        { metric: "Hosting", value: "Vercel" },
      ],
      results:
        "A premium portfolio live at folioharshdev.vercel.app with custom beige/dark aesthetic, animated sections, and integrated coding profiles.",
      learnings: [
        "A cohesive design system saves time across every section.",
        "Scroll animations should enhance content, not distract from it.",
        "Integrating live GitHub stats makes a portfolio feel current.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

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
    url: "https://www.linkedin.com/posts/harsh-pariya_learning-ai-professionalgrowth-activity-7408434618485366784-xMev",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    title: "Cloud DevOps Roadmap for 2026",
    issuer: "GUVI × HCL",
    year: "2025",
    url: "https://www.linkedin.com/posts/harsh-pariya_clouddevops-upskilling-careergrowth-activity-7413864822045466624-zOal",
    accent: "from-sky-500/20 to-cyan-500/10",
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
  { label: "X / Twitter", value: "harshpariya_01", href: "https://x.com/harshpariya_01", icon: "Twitter" },
  { label: "Instagram", value: "_harshpariya_01", href: "https://instagram.com/_harshpariya_01", icon: "Instagram" },
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
