/**
 * Blog content. Posts are authored as structured content here for zero-config
 * portability. The architecture is MDX-ready: swap `content` for compiled MDX
 * (e.g. next-mdx-remote / @next/mdx) without changing the page components.
 */

import { readingTime } from "./utils";

export interface BlogBlock {
  type: "p" | "h2" | "code" | "list" | "quote";
  text?: string;
  lang?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string; // ISO
  tags: string[];
  cover: string;
  content: BlogBlock[];
}

export const posts: BlogPost[] = [
  {
    slug: "building-production-rag-systems",
    title: "Building Production RAG Systems That Don't Hallucinate",
    excerpt:
      "Retrieval-Augmented Generation is easy to demo and hard to ship. Here's what actually moves the needle on groundedness — chunking, reranking, and confidence gates.",
    date: "2026-05-20",
    tags: ["RAG", "LLM Engineering", "GenAI"],
    cover: "/blog/rag.svg",
    content: [
      {
        type: "p",
        text: "Everyone can wire an LLM to a vector store in an afternoon. The hard part is making it trustworthy. After building a RAG knowledge assistant over 1,000+ documents, the lessons that mattered weren't about the model — they were about retrieval.",
      },
      { type: "h2", text: "1. Chunking is the real model" },
      {
        type: "p",
        text: "Your retrieval quality is capped by how you split documents. Too-large chunks dilute relevance; too-small chunks lose context. ~800 tokens with overlap was the sweet spot for my corpus.",
      },
      {
        type: "code",
        lang: "python",
        text: "from langchain.text_splitter import RecursiveCharacterTextSplitter\n\nsplitter = RecursiveCharacterTextSplitter(\n    chunk_size=800,\n    chunk_overlap=120,\n    separators=[\"\\n\\n\", \"\\n\", \". \", \" \"],\n)\nchunks = splitter.split_documents(docs)",
      },
      { type: "h2", text: "2. Rerank the top-k" },
      {
        type: "p",
        text: "Pure vector similarity gets you in the neighborhood. A cross-encoder reranker on the top-20 → top-5 gave the single biggest groundedness boost for almost no latency cost.",
      },
      { type: "h2", text: "3. Add a confidence gate" },
      {
        type: "p",
        text: "If the top retrieval score is below a threshold, the system should say 'I don't have enough information' instead of guessing. A model that knows when to abstain is worth more than one that's confidently wrong.",
      },
      {
        type: "quote",
        text: "A RAG system's job isn't to always answer — it's to never lie.",
      },
    ],
  },
  {
    slug: "transfer-learning-small-data",
    title: "Transfer Learning When You Have Almost No Data",
    excerpt:
      "Pretrained backbones plus aggressive augmentation beat bigger models on small datasets. A practical guide to squeezing accuracy out of a few thousand images.",
    date: "2026-04-08",
    tags: ["Computer Vision", "Deep Learning", "TensorFlow"],
    cover: "/blog/cv.svg",
    content: [
      {
        type: "p",
        text: "Real projects rarely come with a million labeled examples. On a recent image-classifier build, transfer learning turned a small dataset into a 94%-accuracy model. Here's the playbook.",
      },
      { type: "h2", text: "Freeze, then fine-tune" },
      {
        type: "p",
        text: "Start with a pretrained backbone, freeze the early layers, and train only the classification head. Once that converges, unfreeze the top blocks and fine-tune at a 10x-lower learning rate.",
      },
      {
        type: "code",
        lang: "python",
        text: "base = tf.keras.applications.EfficientNetB0(include_top=False, weights='imagenet')\nbase.trainable = False  # phase 1: train the head\n# ...later, phase 2:\nbase.trainable = True\nmodel.compile(optimizer=tf.keras.optimizers.Adam(1e-5), ...)",
      },
      { type: "h2", text: "Augmentation is free data" },
      {
        type: "list",
        items: [
          "Random flips, rotation, and zoom",
          "Brightness / contrast jitter",
          "Cutout / random erasing for robustness",
        ],
      },
      {
        type: "p",
        text: "Augmentation expands your effective dataset and regularizes the model — often a bigger win than a deeper architecture.",
      },
    ],
  },
  {
    slug: "ship-baselines-first",
    title: "Always Ship a Baseline First",
    excerpt:
      "Before you fine-tune a transformer, build the dumb model. A simple baseline sets an honest bar and tells you whether the complexity is even worth it.",
    date: "2026-03-02",
    tags: ["MLOps", "Machine Learning", "Best Practices"],
    cover: "/blog/baseline.svg",
    content: [
      {
        type: "p",
        text: "It's tempting to reach for the fanciest model first. But a TF-IDF + logistic regression baseline takes ten minutes and tells you the honest difficulty of your problem.",
      },
      { type: "h2", text: "Why baselines matter" },
      {
        type: "list",
        items: [
          "They quantify how much your complex model actually adds",
          "They catch data leakage early (a 99% baseline is a red flag)",
          "They give you a fast, debuggable reference implementation",
        ],
      },
      {
        type: "p",
        text: "On a sentiment project, the transformer beat the baseline by +12% F1 — a real, measurable gain that justified the extra serving cost. Without the baseline, I'd have had no idea whether that was good.",
      },
      {
        type: "quote",
        text: "If you can't beat a linear model by a meaningful margin, the problem isn't the model.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function postReadingTime(post: BlogPost) {
  const text = post.content.map((b) => b.text ?? (b.items ?? []).join(" ")).join(" ");
  return readingTime(text);
}

export function relatedPosts(slug: string, limit = 2) {
  const current = getPost(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      shared: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, limit)
    .map((x) => x.post);
}
