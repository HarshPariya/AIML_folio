import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Target,
  Database,
  Network,
  Cpu,
  Dumbbell,
  BarChart3,
  Trophy,
  GraduationCap,
} from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { ProjectPoster } from "@/components/projects/project-poster";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return buildMetadata({ title: "Project not found" });
  return buildMetadata({
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  });
}

const SECTIONS = [
  { key: "problem", title: "Problem Statement", icon: Target },
  { key: "dataset", title: "Dataset", icon: Database },
  { key: "architecture", title: "Architecture", icon: Network },
  { key: "modelSelection", title: "Model Selection", icon: Cpu },
  { key: "training", title: "Training Process", icon: Dumbbell },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const cs = project.caseStudy;
  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <>
      <AmbientBackground />
      <article className="mx-auto max-w-4xl px-6 pb-24 pt-32">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> All projects
        </Link>

        {/* header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-xs font-medium text-brand-2">
              {project.category}
            </span>

          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.links.github && (
              <Button href={project.links.github} external variant="outline" size="sm">
                <Github className="h-4 w-4" /> Source code
              </Button>
            )}
            {project.links.demo && (
              <Button href={project.links.demo} external size="sm">
                <ExternalLink className="h-4 w-4" /> Live demo
              </Button>
            )}
          </div>
        </header>

        <div className="relative mt-8 h-56 overflow-hidden rounded-2xl border border-white/10 sm:h-72">
          {/\.(png|jpe?g|webp|avif)$/i.test(project.image) ? (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
              priority
            />
          ) : (
            <ProjectPoster
              gradient={project.gradient}
              category={project.category}
              seed={index + 1}
              className="h-full"
            />
          )}
        </div>

        {/* tech + headline metrics */}
        <div className="mt-8 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">Tech stack</h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge key={t}>{t}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-faint">Impact</h2>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-white/5 bg-white/[0.02] p-2 text-center"
                >
                  <div className="text-sm font-semibold text-gradient-brand">{m.value}</div>
                  <div className="text-[0.6rem] text-faint">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* narrative sections */}
        <div className="mt-14 space-y-12">
          {SECTIONS.map((s) => (
            <Reveal key={s.key}>
              <section>
                <h2 className="flex items-center gap-2.5 text-xl font-semibold text-fg">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/10 text-brand-2">
                    <s.icon className="h-[18px] w-[18px]" />
                  </span>
                  {s.title}
                </h2>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{cs[s.key]}</p>
              </section>
            </Reveal>
          ))}

          {/* evaluation */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold text-fg">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/10 text-brand-2">
                  <BarChart3 className="h-[18px] w-[18px]" />
                </span>
                Evaluation Metrics
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {cs.evaluation.map((e) => (
                  <div
                    key={e.metric}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4"
                  >
                    <div className="text-2xl font-semibold text-gradient-brand">{e.value}</div>
                    <div className="mt-1 text-xs text-muted">{e.metric}</div>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* results */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold text-fg">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/10 text-brand-2">
                  <Trophy className="h-[18px] w-[18px]" />
                </span>
                Results
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-muted">{cs.results}</p>
            </section>
          </Reveal>

          {/* learnings */}
          <Reveal>
            <section>
              <h2 className="flex items-center gap-2.5 text-xl font-semibold text-fg">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand/25 to-brand-2/10 text-brand-2">
                  <GraduationCap className="h-[18px] w-[18px]" />
                </span>
                Key Learnings
              </h2>
              <ul className="mt-4 space-y-3">
                {cs.learnings.map((l, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-xs font-semibold text-brand-2">
                      {i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{l}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>
        </div>

        {/* footer cta */}
        <div className="mt-16 flex flex-col items-center gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-8 text-center">
          <h3 className="text-xl font-semibold text-fg">Want to dig deeper?</h3>
          <p className="max-w-md text-sm text-muted">
            Explore the code, or get in touch if you'd like to talk through the approach.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button href="/#contact" size="md">
              Get in touch
            </Button>
            <Button href="/projects" variant="outline" size="md">
              More projects
            </Button>
          </div>
        </div>
      </article>
    </>
  );
}
