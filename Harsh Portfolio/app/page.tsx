import { AmbientBackground } from "@/components/ui/backgrounds";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { ModelShowcase } from "@/components/sections/model-showcase";
import { Playground } from "@/components/sections/playground";
import { TechGraph } from "@/components/sections/tech-graph";
import { Experience } from "@/components/sections/experience";
import { Research } from "@/components/sections/research";
import { Certifications } from "@/components/sections/certifications";
import { OpenSource } from "@/components/sections/opensource";
import { Testimonials } from "@/components/sections/testimonials";
import { BlogPreview } from "@/components/sections/blog-preview";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ModelShowcase />
      <Playground />
      <TechGraph />
      <Experience />
      <Research />
      <Certifications />
      <OpenSource />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  );
}
