import dynamic from "next/dynamic";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

const Skills = dynamic(() => import("@/components/sections/skills").then(mod => mod.Skills));
const Projects = dynamic(() => import("@/components/sections/projects").then(mod => mod.Projects));
const ModelMetrics = dynamic(() => import("@/components/sections/model-metrics").then(mod => mod.ModelMetrics));
const ModelShowcase = dynamic(() => import("@/components/sections/model-showcase").then(mod => mod.ModelShowcase));
const TechGraph = dynamic(() => import("@/components/sections/tech-graph").then(mod => mod.TechGraph));
const Certifications = dynamic(() => import("@/components/sections/certifications").then(mod => mod.Certifications));
const OfferLetters = dynamic(() => import("@/components/sections/offer-letters").then(mod => mod.OfferLetters));
const OpenSource = dynamic(() => import("@/components/sections/opensource").then(mod => mod.OpenSource));
const Testimonials = dynamic(() => import("@/components/sections/testimonials").then(mod => mod.Testimonials));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ModelMetrics />
      <ModelShowcase />
      <TechGraph />
      <Certifications />
      <OfferLetters />
      <OpenSource />
      <Testimonials />
      <Contact />
    </>
  );
}
