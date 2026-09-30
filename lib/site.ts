/**
 * Global site configuration - single source of truth for identity, SEO,
 * and social links. Update values here to propagate everywhere.
 */
export const siteConfig = {
  name: "Harsh Pariya",
  role: "Agentic AI & Generative AI Engineer",
  shortRole: "Agentic AI Engineer",
  tagline: "Building Autonomous Multi-Agent Systems & Production AI",
  description:
    "Harsh Pariya - Agentic AI & Generative AI Engineer specializing in Autonomous Multi-Agent Systems, LangGraph, Model Context Protocol (MCP), LLMs, and Production RAG pipelines.",
  // Update this to your production domain before deploying.
  url: "https://www.harshpariya.dev",
  ogImage: "/og",
  avatar: "/harsh-pariya.jpg",
  locale: "en_US",
  email: "harshpariya195@gmail.com",
  phone: "+91 96019 86209",
  location: "Ahmedabad, Gujarat, India",
  availability: "Open to Agentic AI & ML Roles",
  resumeUrl: "/Harsh-Pariya-Resume.pdf",
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Deep Learning Engineer",
    "Generative AI Engineer",
    "LLM Engineer",
    "Data Scientist",
    "AI Researcher",
    "Harsh Pariya",
    "Python",
    "PyTorch",
    "TensorFlow",
    "Computer Vision",
    "NLP",
    "RAG",
  ],
  links: {
    github: "https://github.com/HarshPariya",
    linkedin: "https://linkedin.com/in/harsh-pariya",
    twitter: "https://x.com/harshpariya_01",
    instagram: "https://instagram.com/_harshpariya_01",
    currentPortfolio: "https://folioharshdev.vercel.app/",
  },
  githubUsername: "HarshPariya",
} as const;

export type SiteConfig = typeof siteConfig;
