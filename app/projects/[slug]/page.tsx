import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { CaseStudyClient } from "./case-study-client";

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

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);

  return <CaseStudyClient project={project} index={index} />;
}
