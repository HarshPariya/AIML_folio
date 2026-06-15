import { Award, ShieldCheck, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { certifications } from "@/lib/data";

export function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Certifications"
          title="Always learning, always verifying"
          description="Workshops and specializations that sharpen my AI/ML and cloud foundations — each one verifiable."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.07}>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${cert.accent} p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20`}
              >
                <div className="absolute inset-0 bg-bg/50" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5">
                      <Award className="h-5 w-5 text-fg" />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-fg" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold leading-snug text-fg">{cert.title}</h3>
                  <p className="mt-1 text-xs text-muted">{cert.issuer}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-faint">{cert.year}</span>
                    <span className="inline-flex items-center gap-1 text-[0.65rem] text-emerald-300">
                      <ShieldCheck className="h-3.5 w-3.5" /> Verify
                    </span>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
