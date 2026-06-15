/**
 * Global site configuration — single source of truth for identity, SEO,
 * and social links. Update values here to propagate everywhere.
 */
export const siteConfig = {
  name: "Harsh Pariya",
  role: "AI / ML Engineer",
  shortRole: "AI Engineer",
  tagline: "Building Intelligent Systems with AI & Machine Learning",
  description:
    "Harsh Pariya — Aspiring AI/ML Engineer specializing in Machine Learning, Deep Learning, LLMs, Computer Vision, and Generative AI. B.Tech CSE @ Rai University. Open to AI/ML internships and research opportunities.",
  // Update this to your production domain before deploying.
  url: "https://harshpariya.vercel.app",
  ogImage: "/og",
  avatar: "/harsh-pariya.jpg",
  locale: "en_US",
  email: "harshpariya195@gmail.com",
  phone: "+91 96019 86209",
  location: "Ahmedabad, Gujarat, India",
  availability: "Open to AI/ML Internships",
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
    twitter: "https://x.com/",
    kaggle: "https://kaggle.com/",
    huggingface: "https://huggingface.co/",
    currentPortfolio: "https://folioharshdev.vercel.app/",
  },
  githubUsername: "HarshPariya",
} as const;

export type SiteConfig = typeof siteConfig;
