import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import ProjectsPageClient from "./projects-client";

export const metadata: Metadata = buildMetadata({
  title: "Projects",
  description:
    "Projects by Harsh Pariya - Resume Screening AI, Fake News Detection, California House Price Predictor, SquidAI, Campus Navigation, TravelGo, and more. Each with a live demo, GitHub source, and full case study.",
  alternates: { canonical: "/projects" },
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
