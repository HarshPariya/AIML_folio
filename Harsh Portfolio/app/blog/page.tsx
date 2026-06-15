import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { BlogList } from "@/components/blog/blog-list";
import { posts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Technical writing by Harsh Pariya on LLM engineering, RAG systems, deep learning, computer vision, and MLOps.",
  alternates: { canonical: "/blog" },
});

export default function BlogPage() {
  return (
    <>
      <AmbientBackground />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient">The Blog</span>
          </h1>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            Practical notes on building with AI — LLM engineering, RAG, deep learning, and the
            lessons that only show up when you ship.
          </p>
        </div>

        <div className="mt-12">
          <BlogList posts={posts} />
        </div>
      </div>
    </>
  );
}
