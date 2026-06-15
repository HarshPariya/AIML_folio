import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { posts } from "@/lib/blog";

export function BlogPreview() {
  const latest = [...posts].sort((a, b) => +new Date(b.date) - +new Date(a.date)).slice(0, 3);

  return (
    <section id="blog" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Writing"
          title="Notes from the lab"
          description="Practical write-ups on LLM engineering, RAG systems, deep learning, and the lessons I learn shipping ML."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <BlogCard post={post} index={i} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="/blog" variant="outline" size="lg">
            Read the blog <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
