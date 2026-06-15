import { AmbientBackground } from "@/components/ui/backgrounds";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { TechGraph } from "@/components/sections/tech-graph";
import { Certifications } from "@/components/sections/certifications";
import { OpenSource } from "@/components/sections/opensource";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";

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
