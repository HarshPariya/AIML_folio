"use client";

import { useState } from "react";
import { ArrowRight, Brain, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/lib/data";

type Tab = "aiml" | "dev";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  {
    id: "aiml",
    label: "AI / ML Projects",
    icon: <Brain className="h-4 w-4" />,
  },
  {
    id: "dev",
    label: "Development Projects",
    icon: <Code2 className="h-4 w-4" />,
  },
];

export function Projects() {
  const [activeTab, setActiveTab] = useState<Tab>("aiml");

  const aimlProjects = projects.filter((p) => p.type === "aiml");
  const devProjects = projects.filter((p) => p.type === "dev");
  const displayed = activeTab === "aiml" ? aimlProjects : devProjects;

  return (
    <section id="projects" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects I've built"
          description="Real projects - from AI classifiers and NLP models to full-stack web apps. Each ships with a live demo, source code, and a full case study."
        />

        {/* Category Tabs */}
        <div className="mt-12 flex justify-center">
          <div
            className="relative flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 gap-1"
            role="tablist"
            aria-label="Project categories"
          >
            {tabs.map((tab) => {
              const count =
                tab.id === "aiml" ? aimlProjects.length : devProjects.length;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "relative flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none",
                    isActive
                      ? "bg-gradient-to-r from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/20"
                      : "text-muted hover:text-fg hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">
                    {tab.id === "aiml" ? "AI/ML" : "Dev"}
                  </span>
                  {/* Count pill */}
                  <span
                    className={[
                      "ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6rem] font-bold transition-colors",
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white/10 text-muted",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab description */}
        <p className="mt-5 text-center text-sm text-muted">
          {activeTab === "aiml"
            ? "Machine learning models, NLP classifiers, and AI-powered applications - trained, evaluated, and deployed."
            : "Full-stack web apps, frontend projects, and interactive interfaces - live and open-source."}
        </p>

        {/* Project Grid */}
        <div
          key={activeTab}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayed.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.07}>
              <ProjectCard project={project} index={i} featured={i < 3} />
            </Reveal>
          ))}
        </div>

        {/* View All CTA */}
        <Reveal className="mt-12 flex justify-center">
          <Button href="/projects" variant="outline" size="lg">
            View all projects <ArrowRight className="h-4 w-4" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
