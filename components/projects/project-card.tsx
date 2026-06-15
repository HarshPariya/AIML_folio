import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ProjectPoster } from "./project-poster";
import type { Project } from "@/lib/data";

function ProjectCover({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const className = featured ? "h-52 sm:h-60" : "h-44";

  if (project.image && /\.(png|jpe?g|webp|avif)$/i.test(project.image)) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          priority={index < 4 || featured}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-bg/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-bg/50 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-fg backdrop-blur">
          {project.category}
        </span>
      </div>
    );
  }

  return (
    <ProjectPoster
      gradient={project.gradient}
      category={project.category}
      seed={index + 1}
      className={className}
    />
  );
}

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
    <SpotlightCard className="group flex h-full flex-col" tilt={false}>
      <Link href={`/projects/${project.slug}`} className="block">
        <ProjectCover project={project} index={index} featured={featured} />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <Link href={`/projects/${project.slug}`}>
            <h3 className="text-base font-semibold leading-snug text-fg transition-colors hover:text-brand-2">
              {project.title}
            </h3>
          </Link>

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
