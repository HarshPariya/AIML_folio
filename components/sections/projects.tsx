import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Featured Projects"
          title="Projects I've built"
          description="A collection of what I've actually built — from AI assistants and full-stack apps to production portfolios. Each project links to a live demo and source code."
        />

        {/* featured grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} index={i} featured />
            </Reveal>
          ))}
        </div>

        {/* secondary grid */}
        {rest.length > 0 && (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((project, i) => (
              <Reveal key={project.slug} delay={i * 0.08}>
                <ProjectCard project={project} index={i + featured.length} />
              </Reveal>
            ))}
          </div>
        )}

        <Reveal className="mt-12 flex justify-center">
          <Button href="/projects" variant="outline" size="lg">
            View all projects <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
