import Link from "next/link";
import { Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectPoster } from "@/components/projects/project-poster";
import { formatDate } from "@/lib/utils";
import { postReadingTime, type BlogPost } from "@/lib/blog";

const TAG_GRADIENT: Record<string, string> = {
  RAG: "from-sky-600/30 to-cyan-500/20",
  "Computer Vision": "from-emerald-600/30 to-teal-500/20",
  MLOps: "from-violet-600/30 to-fuchsia-600/20",
};

export function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  const gradient = TAG_GRADIENT[post.tags[0]] ?? "from-indigo-600/30 to-blue-500/20";
  return (
    <SpotlightCard className="flex h-full flex-col" tilt={false}>
      <Link href={`/blog/${post.slug}`}>
        <ProjectPoster gradient={gradient} category={post.tags[0]} seed={index + 3} className="h-40" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-3 text-xs text-faint">
          <span>{formatDate(post.date)}</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {postReadingTime(post)} min
          </span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="mt-3 text-base font-semibold leading-snug text-fg transition-colors hover:text-brand-2">
            {post.title}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {post.tags.slice(0, 3).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          <Link
            href={`/blog/${post.slug}`}
            className="ml-auto inline-flex items-center gap-1 text-sm text-brand-2 hover:text-fg"
          >
            Read <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </SpotlightCard>
  );
}
