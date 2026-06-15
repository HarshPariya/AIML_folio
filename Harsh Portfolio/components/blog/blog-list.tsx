"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "@/lib/blog";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState<string | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.tags))).sort(),
    [posts]
  );

  const filtered = useMemo(() => {
    return posts
      .filter((p) => (tag ? p.tags.includes(tag) : true))
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [posts, query, tag]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            className="w-full rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand/50"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTag(null)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              tag === null
                ? "border-brand/50 bg-brand/15 text-fg"
                : "border-white/10 text-muted hover:text-fg"
            }`}
          >
            All
          </button>
          {allTags.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                tag === t
                  ? "border-brand/50 bg-brand/15 text-fg"
                  : "border-white/10 text-muted hover:text-fg"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <p className="mt-16 text-center text-muted">No articles match your search.</p>
      )}
    </div>
  );
}
