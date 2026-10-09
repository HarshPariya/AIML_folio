"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Bot, Brain, Code2 } from "lucide-react";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { ProjectCard } from "@/components/projects/project-card";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/lib/data";

type Tab = "agentic" | "ml" | "dev";

const tabs: {
  id: Tab;
  label: string;
  shortLabel: string;
  icon: React.ReactNode;
  description: string;
}[] = [
    {
      id: "agentic",
      label: "Agentic AI & GenAI",
      shortLabel: "Agentic AI",
      icon: <Bot className="h-4 w-4" />,
      description:
        "Autonomous multi-agent execution graphs, LangGraph state machines, MCP tool execution, and code intelligence platforms.",
    },
    {
      id: "ml",
      label: "Machine Learning & DL",
      shortLabel: "ML & DL",
      icon: <Brain className="h-4 w-4" />,
      description:
        "Predictive ML pipelines, deep neural networks (CNN/LSTM), game-theoretic explainability (SHAP), and NLP classifiers.",
    },
    {
      id: "dev",
      label: "Development Projects",
      shortLabel: "Development",
      icon: <Code2 className="h-4 w-4" />,
      description:
        "Full-stack web applications, interactive developer platforms, and responsive production architectures.",
    },
  ];

export default function ProjectsPageClient() {
  const [activeTab, setActiveTab] = useState<Tab>("agentic");

  const counts: Record<Tab, number> = {
    agentic: projects.filter((p) => p.type === "agentic").length,
    ml: projects.filter((p) => p.type === "ml").length,
    dev: projects.filter((p) => p.type === "dev").length,
  };

  const displayed = projects.filter((p) => p.type === activeTab);
  const currentTab = tabs.find((t) => t.id === activeTab);

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
            Every project I&apos;ve shipped - autonomous multi-agent systems, ML models, NLP classifiers,
            and full-stack platforms. Each comes with a live demo, source code, and a full case study.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex">
          <div
            className="flex flex-wrap items-center rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 gap-1.5 backdrop-blur-xl"
            role="tablist"
            aria-label="Project categories"
          >
            {tabs.map((tab) => {
              const count = counts[tab.id];
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    "relative flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:px-5 sm:text-sm font-medium transition-all duration-300 focus:outline-none",
                    isActive
                      ? "bg-gradient-to-r from-brand-1 to-brand-2 text-white shadow-lg shadow-brand-1/25 ring-1 ring-white/20"
                      : "text-muted hover:text-fg hover:bg-white/[0.05]",
                  ].join(" ")}
                >
                  {tab.icon}
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span
                    className={[
                      "ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[0.65rem] font-bold transition-colors",
                      isActive ? "bg-white/25 text-white" : "bg-white/10 text-muted",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab subtitle */}
        <p className="mt-4 text-sm text-muted">
          {currentTab?.description}
        </p>

        {/* Grid */}
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
