import dynamic from "next/dynamic";
import { AmbientBackground } from "@/components/ui/backgrounds";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";

const Skills = dynamic(() => import("@/components/sections/skills").then(mod => mod.Skills));
const Projects = dynamic(() => import("@/components/sections/projects").then(mod => mod.Projects));
const TechGraph = dynamic(() => import("@/components/sections/tech-graph").then(mod => mod.TechGraph));
const Certifications = dynamic(() => import("@/components/sections/certifications").then(mod => mod.Certifications));
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
      <TechGraph />
      <Certifications />
      <OpenSource />
      <Testimonials />
      <Contact />
    </>
  );
}
