import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Projects by Harsh Pariya — SquidAI, Campus Navigation, TravelGo, Quiz App, and more. Each with a live demo, GitHub source, and full case study.",
  alternates: { canonical: "/projects" },
});

export default function ProjectsPage() {
  return (
    <>
      <AmbientBackground />
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient">All Projects</span>
          </h1>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            A complete look at what I&apos;ve built — from AI assistants and full-stack apps to
            production portfolios. Every project includes a live demo, source code, and case study.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={0.02 * i}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
