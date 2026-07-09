/**
 * Content data layer - the single source of truth for every section.
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
  { label: "Projects Built", value: "10+" },
  { label: "GitHub Contributions", value: "1.9K+" },
  { label: "CGPA", value: "8.98" },
];

/* ------------------------------------------------------------------ */
/* About + counters + journey timeline                                */
/* ------------------------------------------------------------------ */

export const aboutParagraphs = [
  "I'm a B.Tech Computer Science student at Rai University, Ahmedabad, with a focus on AI and machine learning. I spend most of my time building projects that actually run in production, not just notebooks.",
  "My interest in ML started when I wanted to understand how machines pick up on patterns that humans miss. That pulled me into Python, linear algebra, and frameworks like Scikit-Learn, TensorFlow, and PyTorch. I've since built classifiers, neural networks, and LLM-powered apps, and I care deeply about whether a model works in the real world, not just on a test set.",
  "Right now I'm focused on LLMs, Retrieval-Augmented Generation, and applied deep learning. I'm looking for an AI/ML internship where I can work on real production systems alongside people who care about the craft.",
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
      "Began CS degree with a focus on DSA, statistics, and databases. Started building small AI/ML projects on the side to understand how the math actually works in code.",
  },
  {
    year: "2025",
    title: "Development Intern Offer",
    org: "Codveda Technologies",
    description:
      "Received an internship offer to build AI/ML and full-stack projects. Learned what it takes to turn an experiment into something that actually ships.",
  },
  {
    year: "2026",
    title: "Fell in love with Machine Learning",
    org: "Self-directed learning",
    description:
      "Dove into ML fundamentals: regression, classification, clustering, and ensemble models using Scikit-Learn, NumPy, and Pandas. Built several projects end-to-end and started caring a lot about evaluation, not just accuracy.",
  },
  {
    year: "2026",
    title: "Deep Learning clicked",
    org: "TensorFlow and PyTorch",
    description:
      "Trained CNNs for the first time and got hooked. Worked through the engineering side of model training, debugging loss curves, and actual deployment. Built a brain tumor detection app on real MRI data.",
  },
  {
    year: "2026",
    title: "Building LLM and GenAI applications",
    org: "Current focus",
    description:
      "Working with LLMs, RAG systems, and AI agents. Trying to combine solid ML foundations with real product engineering - building things people can actually use.",
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
    accent: "from-blue-600 to-sky-400",
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
    accent: "from-blue-500 to-indigo-400",
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
    accent: "from-indigo-500 to-blue-400",
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
  { name: "Fast Learner" },
  { name: "Detail-Oriented" },
  { name: "Self-Driven" },
  { name: "Good Communicator" },
  { name: "Ownership Mindset" },
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
  type: "aiml" | "dev"; // project category for tab filtering
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  // AI/ML Projects
  {
    slug: "ai-assistant-platform",
    title: "AI Assistant Platform",
    category: "Generative AI · Full-Stack AI",
    tagline: "A comprehensive AI workspace featuring 6+ specialized modules powered by Groq.",
    description:
      "An advanced AI platform offering a suite of tools including General AI Chat, Resume Reviewer, Interview Assistant, PDF Chatbot, and Image Q&A. Built for career and research tasks with ultra-fast Groq inference.",
    image: "/projects/ai-assistant.png",
    gradient: "from-blue-700/30 to-sky-500/20",
    tech: ["Next.js", "Groq", "AI", "Full Stack", "TypeScript"],
    links: {
      github: "https://github.com/HarshPariya/AI-Assistant-Frontend",
      demo: "https://ai-assistant-gamma-sable.vercel.app/",
    },
    metrics: [
      { label: "Models", value: "6+" },
      { label: "Engine", value: "Groq" },
      { label: "Speed", value: "~2s" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Professionals and students often need multiple specialized AI tools - for resumes, interviews, research, and general chat - which are typically scattered across different platforms.",
      dataset:
        "Utilizes multi-modal capabilities to process text, PDFs (for resume and research), and images (Vision AI) without requiring a custom fine-tuned dataset.",
      architecture:
        "Full-stack architecture featuring a separate frontend and backend repository. Integrates the blazing-fast Groq API to serve 6+ AI models with minimal latency.",
      modelSelection:
        "Leverages Groq's LPU inference engine to run powerful open-source models with ~2s response times, significantly enhancing user experience for real-time chat and analysis.",
      training:
        "Focused on prompt engineering and specialized module orchestration (e.g., ATS scoring constraints, mock interview personas) rather than foundational model training.",
      evaluation: [
        { metric: "Inference Speed", value: "~2s" },
        { metric: "Modules", value: "6+" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "A unified AI workspace deployed on Vercel, providing users with a seamless, high-speed interface for complex tasks like multi-PDF analysis and mock interviews.",
      learnings: [
        "Specialized AI modules provide more value than a single generic chatbot.",
        "Groq's inference speed fundamentally changes the feel of full-stack AI apps.",
        "Managing separate frontend and backend repositories allows for cleaner separation of concerns in complex AI platforms.",
      ],
    },
  },
  {
    slug: "brain-tumor-detection",
    title: "Brain Tumor Detection CNN",
    category: "Deep Learning · CNN",
    tagline: "AI-Powered Brain Tumor Detection System using a custom Convolutional Neural Network.",
    description:
      "A deep learning application that analyzes MRI scans to instantly detect and classify brain tumors (Glioma, Meningioma, Pituitary Tumor, or No Tumor) with 86.25% test accuracy.",
    image: "/projects/brain-tumor-detection.png",
    gradient: "from-blue-600/30 to-indigo-600/20",
    tech: ["Python", "TensorFlow", "CNN", "Next.js", "Vercel"],
    links: {
      github: "https://github.com/HarshPariya/Brain-tumor-detection-cnn",
      demo: "https://brain-tumor-detection-cnn.vercel.app/",
    },
    metrics: [
      { label: "Accuracy", value: "86.25%" },
      { label: "MRI Images", value: "7,200" },
      { label: "Classes", value: "4" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Brain tumor diagnosis requires careful analysis of MRI scans by radiologists. The goal was to build an automated, accessible tool to assist in detecting and classifying tumor types quickly and accurately.",
      dataset:
        "A comprehensive dataset of 7,200 MRI images categorized into four classes: Glioma, Meningioma, Pituitary Tumor, and No Tumor.",
      architecture:
        "A custom Convolutional Neural Network (CNN) built with TensorFlow/Keras, featuring multiple convolutional layers for feature extraction, followed by dense layers for classification. The frontend provides a seamless upload and prediction experience.",
      modelSelection:
        "A CNN architecture was chosen due to its superior performance in image recognition tasks, specifically in identifying spatial hierarchies and patterns in medical imaging compared to traditional ML models.",
      training:
        "Trained on 7,200 MRI images using data augmentation techniques to prevent overfitting. The model was optimized using categorical crossentropy and the Adam optimizer.",
      evaluation: [
        { metric: "Test Accuracy", value: "86.25%" },
        { metric: "Training Images", value: "7,200" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "A live web application that allows users to upload MRI scans and receive instant predictions across four categories with high confidence.",
      learnings: [
        "Data augmentation is crucial for medical imaging datasets to improve model generalization.",
        "A clean, intuitive UI is essential for medical AI tools to be accessible to end-users.",
        "Bridging a deep learning model with a modern web frontend creates a powerful, deployable product.",
      ],
    },
  },
  {
    slug: "squidai",
    title: "SquidAI",
    category: "Generative AI",
    tagline: "AI-powered technical assistant for code generation and debugging.",
    description:
      "SquidAI is an AI-powered technical assistant that helps developers generate, explain, and refactor code faster. It focuses on practical use-cases like debugging help and boilerplate generation.",
    image: "/projects/squidai.png",
    gradient: "from-sky-600/30 to-blue-600/20",
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
    featured: false,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Developers spend significant time on boilerplate, debugging explanations, and repetitive coding tasks. SquidAI was built to provide a fast, practical AI assistant focused on real developer workflows.",
      dataset:
        "No custom training dataset - the app orchestrates AI APIs with structured prompts for code generation, explanation, and refactoring tasks.",
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
    slug: "resume-screening-ai",
    title: "Resume Screening AI",
    category: "NLP · Machine Learning",
    tagline: "AI-powered resume analyser using XGBoost + TF-IDF to classify job categories instantly.",
    description:
      "ResumeAI analyses uploaded PDF resumes using a TF-IDF vectoriser and XGBoost classifier to predict job categories with 80.9% accuracy across 22+ roles - with results delivered in under 1 second.",
    image: "/projects/resume-screening-ai.png",
    gradient: "from-violet-600/30 to-fuchsia-600/20",
    tech: ["Python", "XGBoost", "TF-IDF", "NLP", "Streamlit"],
    links: {
      github: "https://github.com/HarshPariya/Resume_Screening_AI",
      demo: "https://resume-screening-ai-01.streamlit.app/",
    },
    metrics: [
      { label: "Accuracy", value: "80.9%" },
      { label: "Job Categories", value: "22+" },
      { label: "Analysis Time", value: "< 1s" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Recruiters manually screen hundreds of resumes per role, leading to unconscious bias and massive time costs. The goal was an automated NLP system to predict a candidate's job category from raw resume text - instantly and accurately.",
      dataset:
        "2,484 labelled resume PDFs spanning 22+ job categories including Data Science, HR, Engineering, Finance, and more. PDFs were parsed with PyPDF2 and cleaned with regex before feature extraction.",
      architecture:
        "Two-stage pipeline: (1) TF-IDF vectorisation to convert resume text into weighted term features; (2) XGBoost multi-class classifier for category prediction. A Streamlit front end handles PDF upload, text extraction, prediction, and confidence-score display.",
      modelSelection:
        "XGBoost was chosen over Logistic Regression and Random Forest for its superior gradient boosting on sparse TF-IDF vectors and fast inference. TF-IDF outperformed Word2Vec for short-document classification.",
      training:
        "Trained with 80/20 stratified split, label encoding, and hyperparameter tuning via GridSearchCV on learning rate, max depth, and estimators. Model serialised with joblib for sub-second Streamlit inference.",
      evaluation: [
        { metric: "Test Accuracy", value: "80.9%" },
        { metric: "Categories", value: "22+" },
        { metric: "Inference", value: "< 1s" },
      ],
      results:
        "Live Streamlit app at resume-screening-ai-01.streamlit.app - upload any PDF resume and get instant job-category predictions with confidence scores across 22 roles.",
      learnings: [
        "TF-IDF + XGBoost is a powerful, fast baseline for short-document NLP tasks.",
        "Resume text quality varies wildly - robust PDF parsing is as important as the model.",
        "Confidence scores add recruiter trust that raw predictions alone don't provide.",
      ],
    },
  },
  {
    slug: "fake-news-detection",
    title: "Fake News Detection",
    category: "NLP · Classification",
    tagline: "99.29% accurate fake news classifier using Linear SVM on 44K articles.",
    description:
      "TruthLens detects fake news with 99.29% accuracy by analysing linguistic patterns in news articles using a Linear SVM trained on 44,898 real and fake articles, delivering results in ~0.1 seconds.",
    image: "/projects/fake-news-detection.png",
    gradient: "from-indigo-600/30 to-blue-600/20",
    tech: ["Python", "SVM", "TF-IDF", "NLP", "Streamlit"],
    links: {
      github: "https://github.com/HarshPariya/fake-news-detection-nlp",
      demo: "https://fake-news-detection-nlp-01.streamlit.app/",
    },
    metrics: [
      { label: "Accuracy", value: "99.29%" },
      { label: "F1 Score", value: "0.99" },
      { label: "Articles Trained", value: "44.8K" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Misinformation spreads faster than corrections. The goal was a real-time NLP classifier that could distinguish fake from real news with high precision - usable by anyone without ML knowledge via a simple paste-and-check interface.",
      dataset:
        "44,898 articles from the ISOT Fake News Dataset: 23,481 real Reuters articles and 21,417 fake articles from PolitiFact/unreliable sources. Text was lowercased, punctuation stripped, stop-words removed, and lemmatised before vectorisation.",
      architecture:
        "TF-IDF vectoriser (max 10K features, 1–2 n-grams) feeding a Linear SVM classifier. Streamlit front end accepts raw article text, runs the pipeline in memory, and returns a REAL/FAKE verdict with probability score.",
      modelSelection:
        "Linear SVM was benchmarked against Multinomial Naïve Bayes and Logistic Regression. SVM achieved the best accuracy (99.29%) and F1 (0.99) on the held-out test set and is fastest at inference - ideal for Streamlit deployment.",
      training:
        "Trained on an 80/20 stratified split. Hyperparameter tuning explored regularisation parameter C (0.1–10) with cross-validation. Final model and vectoriser saved with joblib for instant loading on Streamlit cold start.",
      evaluation: [
        { metric: "Test Accuracy", value: "99.29%" },
        { metric: "F1 Score", value: "0.99" },
        { metric: "Inference", value: "~0.1s" },
      ],
      results:
        "Live at fake-news-detection-nlp-01.streamlit.app - paste any news article and get an instant real/fake verdict backed by SVM confidence scores.",
      learnings: [
        "Linear SVM is remarkably effective for high-dimensional TF-IDF spaces.",
        "n-gram features (bigrams) significantly improve fake-news pattern detection.",
        "Deployment via Streamlit makes ML demos instantly accessible without a backend.",
      ],
    },
  },
  {
    slug: "california-house-price",
    title: "CA House Price Predictor",
    category: "Regression · ML",
    tagline: "XGBoost regression model predicting California house prices via a real-time Next.js UI.",
    description:
      "A full-stack ML application where users enter block-group features (income, age, rooms, location) and get instant XGBoost price predictions with a Feature Comparison vs CA Average chart - deployed on Vercel.",
    image: "/projects/california-house-price.png",
    gradient: "from-sky-600/30 to-cyan-500/20",
    tech: ["XGBoost", "Next.js", "Python", "FastAPI", "Vercel"],
    links: {
      github: "https://github.com/HarshPariya/California-House-Price-Prediction",
      demo: "https://california-house-price-prediction-xi.vercel.app/",
    },
    metrics: [
      { label: "Model", value: "XGBoost" },
      { label: "Dataset", value: "20K rows" },
      { label: "Stack", value: "Full Stack" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "House price estimation is a classic regression problem, but the challenge here was bridging the gap between a trained ML model and a polished, real-time web UI - making predictions accessible to non-technical users with live feature comparison.",
      dataset:
        "California Housing Dataset (20,640 block-group observations from the 1990 census): median income, house age, average rooms/bedrooms, population, average occupancy, and lat/lon coordinates.",
      architecture:
        "XGBoost regressor trained in Python, serialised, and served via a FastAPI backend. Next.js front end renders a two-panel layout - a form for feature inputs and a live bar chart comparing user inputs vs California averages via Recharts.",
      modelSelection:
        "XGBoost outperformed Linear Regression, Ridge, and Random Forest on RMSE and R². It handles the non-linear interaction between income, location, and occupancy density far better than linear baselines.",
      training:
        "Feature engineering: log-transform of income; geographical clustering of lat/lon. Hyperparameter tuning via RandomizedSearchCV on n_estimators, max_depth, learning_rate, and subsample. Final model exported with joblib.",
      evaluation: [
        { metric: "Model", value: "XGBoost" },
        { metric: "Dataset", value: "20,640 rows" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "Live at california-house-price-prediction-xi.vercel.app - enter any block-group features and get an instant predicted median house value with a dynamic feature comparison chart.",
      learnings: [
        "Bridging a Python ML model to a Next.js UI requires a clean API layer.",
        "Visual feature comparison (user vs average) significantly improves prediction interpretability.",
        "XGBoost's feature importance makes the model explainable to non-technical stakeholders.",
      ],
    },
  },
   {
    slug: "image-caption-generator",
    title: "Image Caption Generator",
    category: "ANN · CNN · RNN",
    tagline: "AI-powered application that generates descriptive captions for uploaded images.",
    description:
      "VisionCaption AI is a deep-learning application that combines InceptionV3 (CNN) for image feature extraction and an LSTM (RNN) decoder within an overall ANN architecture to instantly generate accurate descriptions for any uploaded photo.",
    image: "/projects/image-caption-generator.png",
    gradient: "from-blue-600/30 to-purple-600/20",
    tech: ["Python", "TensorFlow", "ANN", "CNN", "RNN", "Streamlit"],
    links: {
      github: "https://github.com/HarshPariya/Image_Caption_Generator.git",
      demo: "https://image-caption-generator-01.streamlit.app/",
    },
    metrics: [
      { label: "Model", value: "CNN+RNN (LSTM)" },
      { label: "Vocabulary", value: "~8.8K" },
      { label: "Feature Dim", value: "2048" },
    ],
    featured: true,
    real: true,
    type: "aiml",
    caseStudy: {
      problem:
        "Creating meaningful descriptions for images is a complex task requiring both computer vision to understand the image content and sequence modeling to articulate it. The goal was to build an accessible web app utilizing ANN, CNN, and RNN architectures to bridge this gap.",
      dataset:
        "Trained on the Flickr8k dataset, comprising 8,000 images each paired with five different human-annotated captions to teach the model varied descriptive language.",
      architecture:
        "A hybrid neural network architecture where a pre-trained CNN (InceptionV3) extracts a 2048-dimensional feature vector from the image, which is then passed into an RNN (LSTM network) that generates the caption word by word.",
      modelSelection:
        "CNN (InceptionV3) was chosen for its excellent feature extraction capabilities on images, and RNN (LSTM) for its ability to remember sequence context, making the combined ANN ideal for text generation from images.",
      training:
        "The model was trained using categorical crossentropy loss to predict the next word in the sequence. A custom tokenizer with an 8.8K vocabulary was built to map words to integer sequences.",
      evaluation: [
        { metric: "Vocabulary Size", value: "~8.8K" },
        { metric: "Feature Dim", value: "2048" },
        { metric: "Deployment", value: "Streamlit" },
      ],
      results:
        "A live Streamlit application (VisionCaption AI) where users can upload any JPG or PNG image and receive an instantly generated, deep-learning powered description of the scene.",
      learnings: [
        "Combining CNNs and RNNs (LSTMs) is highly effective for multimodal tasks like image captioning.",
        "Pre-trained models like InceptionV3 significantly reduce training time and improve feature quality.",
        "Streamlit provides an excellent, rapid way to deploy complex deep learning models into interactive web apps.",
      ],
    },
  },
  // Development Projects
  {
    slug: "aiml-folio",
    title: "AIML Folio",
    category: "Portfolio · Next.js",
    tagline: "Premium AI/ML portfolio built with Next.js - dark-space design, animated hero, and interactive tech graph.",
    description:
      "A fully custom AI/ML-focused portfolio built with Next.js, TypeScript, and Framer Motion - featuring a live tech-stack graph, animated hero section, tabbed project showcase with case studies, and full responsive layout. Deployed on Vercel.",
    image: "/projects/aiml-folio.png",
    gradient: "from-blue-600/30 to-indigo-700/20",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS", "Vercel"],
    links: {
      github: "https://github.com/HarshPariya/AIML_folio",
      demo: "https://aiml-folio-alpha.vercel.app/",
    },
    metrics: [
      { label: "Sections", value: "10+" },
      { label: "Theme", value: "Dark AI" },
      { label: "Year", value: "2026" },
    ],
    featured: false,
    real: true,
    type: "dev",
    caseStudy: {
      problem:
        "Generic portfolio templates fail to communicate an AI/ML engineer's depth. The goal was a fully custom, premium portfolio that feels native to the AI world - dark aesthetic, interactive visualisations, and deep project case studies that go beyond a link and a screenshot.",
      dataset:
        "Personal project data, skill metrics, GitHub contributions, certifications, and experience timeline - all structured as a typed data layer in TypeScript for type-safe rendering across every section.",
      architecture:
        "Next.js 15 App Router with dynamic project routes, Framer Motion scroll-triggered animations, an interactive D3 force-graph for the tech stack, radar chart for skill distribution, and a tabbed AI/ML vs Dev project split.",
      modelSelection:
        "Next.js for SSR/SEO and image optimisation; TypeScript for maintainability; Framer Motion for declarative animations; Tailwind CSS for the design system; Vercel for edge deployment with zero-config CI.",
      training:
        "Iterative design: established the dark-space colour palette and CSS tokens first, then built section by section - hero, skills, tech graph, projects, timeline, certifications, contact - polishing animations and responsive breakpoints at each step.",
      evaluation: [
        { metric: "Lighthouse", value: "95+" },
        { metric: "Sections", value: "10+" },
        { metric: "Deployment", value: "Vercel" },
      ],
      results:
        "Live at aiml-folio-alpha.vercel.app - a production-grade AI/ML portfolio with animated hero, interactive tech graph, tabbed project showcase with full case studies, and responsive layout across all devices.",
      learnings: [
        "A typed data layer makes it trivial to add new projects and sections without breaking anything.",
        "Interactive visualisations (force graph, radar chart) communicate technical depth far better than bullet lists.",
        "Dark-space aesthetics with purple/cyan gradients immediately signal an AI-native engineer.",
      ],
    },
  },

  // SquidAI - AI-powered dev tool
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
    featured: false,
    real: true,
    type: "dev",
    caseStudy: {
      problem:
        "New students and visitors struggle to find buildings and routes on campus. A web-based navigation tool was needed to make campus exploration intuitive without installing an app.",
      dataset:
        "Campus location data - building names, coordinates, and route points - structured for map rendering and search.",
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
        "Campus tools must work well on phones - that's how students use them.",
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
    featured: false,
    real: true,
    type: "dev",
    caseStudy: {
      problem:
        "Travel agency sites often feel cluttered and fail to guide users toward booking. TravelGo needed a clean, modern landing experience that highlights destinations and drives action.",
      dataset:
        "Static travel content - destinations, packages, pricing highlights, and CTA copy - structured for modular page sections.",
      architecture:
        "Single-page React application with section-based layout, reusable card components, and Tailwind CSS for responsive styling.",
      modelSelection:
        "React + Tailwind for fast iteration on layout, typography, and responsive breakpoints without heavy CSS overhead.",
      training:
        "Designed section by section: hero, destinations, packages, and CTAs - refining visual hierarchy and mobile layout at each step.",
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
    type: "dev",
    caseStudy: {
      problem:
        "Quiz apps need to feel engaging and responsive - instant feedback, clear scoring, and a UI that works on phones where most users play.",
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
    gradient: "from-sky-600/30 to-blue-500/20",
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
    type: "dev",
    caseStudy: {
      problem:
        "A developer portfolio needs to showcase projects clearly, load fast, and feel polished - not like a generic template.",
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
        "A deployed portfolio with animated hero, project showcase, and responsive navigation - live on Netlify.",
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
      "A premium, fully custom developer portfolio built with Next.js 16, TypeScript, and Framer Motion - featuring scroll-triggered animations, a dynamic project showcase, GitHub stats integration, and a fully responsive layout.",
    image: "/projects/folio-harsh-dev.png",
    gradient: "from-blue-600/30 to-sky-600/20",
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
    type: "dev",
    caseStudy: {
      problem:
        "A second portfolio iteration needed to feel premium - custom design, smooth animations, live GitHub stats, and a project showcase that reflects real work.",
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
      "Got an internship offer to build AI/ML and full-stack apps. Treated every task like a real product - not just something to submit and forget.",
    highlights: [
      "Built AI/ML and full-stack apps from scratch, solo",
      "Learned what it takes to go from a working notebook to a deployed app",
      "Got hands-on with APIs, version control, and cloud deployment",
    ],
  },
  {
    role: "AI/ML Project Builder",
    org: "Self-directed",
    period: "2024 - Present",
    type: "Independent",
    description:
      "Continuously building ML and deep-learning projects - from classical models to LLM-powered applications - and shipping them publicly.",
    highlights: [
      "15+ projects spanning ML, deep learning, NLP, and full-stack",
      "1,500+ GitHub contributions",
      "Active in hackathons and coding contests",
    ],
  },
  {
    role: "B.Tech - Computer Science & Engineering",
    org: "Rai University, Ahmedabad",
    period: "2024 - 2028",
    type: "Education",
    description:
      "Pursuing CS with a focus on DSA, software engineering, statistics, and databases - CGPA 8.98/10.",
    highlights: [
      "CGPA 8.98 / 10",
      "Coursework: DSA, Software Engineering, Statistics, Databases",
      "Industrial visit: Adani Power Plant - industrial automation exposure",
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
    accent: "from-blue-600/20 to-sky-500/10",
  },
  {
    title: "Cloud DevOps Roadmap for 2026",
    issuer: "GUVI × HCL",
    year: "2025",
    url: "https://www.linkedin.com/posts/harsh-pariya_clouddevops-upskilling-careergrowth-activity-7413864822045466624-zOal",
    accent: "from-sky-500/20 to-blue-400/10",
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
      "Harsh builds things end to end. He doesn't just run experiments in notebooks - he gets the model into a UI and deploys it. That kind of follow-through is rare at this stage.",
    name: "Dr. Pawan Shah",
    title: "Faculty Mentor",
    initials: "PS",
  },
  {
    quote:
      "Solid Python and ML chops, and he actually reads the papers before building. We worked together on a hackathon project and he was the one keeping things grounded when we started over-engineering everything.",
    name: "Anmol Sinha",
    title: "Hackathon Teammate",
    initials: "AS",
  },
];

/* ------------------------------------------------------------------ */
/* Contact channels                                                   */
/* ------------------------------------------------------------------ */

export const contactChannels = [
  { label: "Email", value: "harshpariya195@gmail.com", href: "mailto:harshpariya195@gmail.com", icon: "Mail" },
  { label: "LinkedIn", value: "harsh-pariya", href: "https://linkedin.com/in/harsh-pariya", icon: "Linkedin" },
  { label: "GitHub", value: "HarshPariya", href: "https://github.com/HarshPariya", icon: "Github" },
  { label: "Kaggle", value: "harshpariya", href: "https://www.kaggle.com/", icon: "Trophy" },
  { label: "Hugging Face", value: "HarshPariya", href: "https://huggingface.co/", icon: "Boxes" },
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
