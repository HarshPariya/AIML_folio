import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { ProjectPoster } from "@/components/projects/project-poster";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { BlogCard } from "@/components/blog/blog-card";
import { Reveal } from "@/components/ui/reveal";
import { posts, getPost, postReadingTime, relatedPosts, type BlogBlock } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return buildMetadata({ title: "Post not found" });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  });
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-10 text-2xl font-semibold tracking-tight text-fg">{block.text}</h2>;
    case "p":
      return <p className="mt-4 text-pretty leading-relaxed text-muted">{block.text}</p>;
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-brand bg-white/[0.02] py-3 pl-5 pr-4 text-lg font-medium italic text-fg">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {block.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0b0d15]">
          <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            {block.lang && (
              <span className="ml-auto font-mono text-[0.65rem] uppercase text-faint">
                {block.lang}
              </span>
            )}
          </div>
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="font-mono text-[#cdd6f4]">{block.text}</code>
          </pre>
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = relatedPosts(slug);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <AmbientBackground />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>

        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>

        <div className="mt-5 flex items-center gap-5 text-sm text-faint">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {postReadingTime(post)} min read
          </span>
        </div>

        <ProjectPoster
          gradient="from-violet-600/30 to-cyan-500/20"
          category={post.tags[0]}
          className="mt-8 h-52 rounded-2xl border border-white/10 sm:h-64"
        />

        <div className="mt-8">
          {post.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* author */}
        <div className="mt-14 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">
          <Image
            src={siteConfig.avatar}
            alt={siteConfig.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="text-sm font-semibold text-fg">{siteConfig.name}</div>
            <div className="text-xs text-muted">
              {siteConfig.role} · writing about building with AI
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-24">
          <h2 className="mb-8 text-xl font-semibold text-fg">Related articles</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <BlogCard post={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
