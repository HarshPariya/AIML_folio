import Link from "next/link";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectPoster } from "./project-poster";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <SpotlightCard className="flex h-full flex-col" tilt={false}>
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectPoster
          gradient={project.gradient}
          category={project.category}
          seed={index + 1}
          className={featured ? "h-52 sm:h-60" : "h-44"}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-base font-semibold leading-snug text-fg transition-colors hover:text-brand-2">
              {project.title}
            </h3>
          </Link>
          {project.real && (
            <span className="shrink-0 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-wide text-emerald-300">
              Shipped
            </span>
          )}
        </div>

        <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>

        {/* metrics */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2 text-center"
            >
              <div className="text-sm font-semibold text-gradient-brand">{m.value}</div>
              <div className="mt-0.5 text-[0.6rem] leading-tight text-faint">{m.label}</div>
            </div>
          ))}
        </div>

        {/* tech */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        {/* links */}
        <div className="mt-5 flex items-center gap-3 border-t border-white/5 pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-2 transition-colors hover:text-fg"
          >
            Case study <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-fg"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:border-white/25 hover:text-fg"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
