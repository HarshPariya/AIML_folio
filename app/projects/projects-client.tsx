"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Brain, Code2 } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";

type Tab = "aiml" | "dev";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "aiml", label: "AI / ML Projects", icon: <Brain className="h-4 w-4" /> },
  { id: "dev", label: "Development Projects", icon: <Code2 className="h-4 w-4" /> },
];

export default function ProjectsPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("aiml");

  const aimlProjects = projects.filter((p) => p.type === "aiml");
  const devProjects = projects.filter((p) => p.type === "dev");
  const displayed = activeTab === "aiml" ? aimlProjects : devProjects;

  return (
    <>
      <AmbientBackground />
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-32">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>

        {/* Header */}
        <div className="mt-8 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="text-gradient">All Projects</span>
          </h1>
          <p className="mt-4 text-pretty text-muted sm:text-lg">
            Every project I&apos;ve shipped — AI models, NLP classifiers, full-stack apps, and
            polished frontends. Each comes with a live demo, source code, and a full case study.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-10 flex">
          <div
            className="flex rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 gap-1"
            role="tablist"
          >
            {tabs.map((tab) => {
              const count = tab.id === "aiml" ? aimlProjects.length : devProjects.length;
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
                  <span className="sm:hidden">{tab.id === "aiml" ? "AI/ML" : "Dev"}</span>
                  <span
                    className={[
                      "ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.6rem] font-bold transition-colors",
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-muted",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Tab subtitle ── */}
        <p className="mt-4 text-sm text-muted">
          {activeTab === "aiml"
            ? "Machine learning models, NLP classifiers, and AI-powered apps — trained, evaluated, and deployed."
            : "Full-stack web apps, frontend projects, and interactive interfaces — live and open-source."}
        </p>

        {/* ── Grid ── */}
        <div
          key={activeTab}
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {displayed.map((project, i) => (
            <Reveal key={project.slug} delay={0.04 * i}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>

      </div>
    </>
  );
}
