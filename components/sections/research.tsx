import { FileText, Code2, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Badge } from "@/components/ui/badge";
import { research } from "@/lib/data";

const STATUS_STYLE: Record<string, string> = {
  "Technical Report": "border-violet-400/30 bg-violet-400/10 text-violet-200",
  Experiment: "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  "In Progress": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  Planned: "border-white/15 bg-white/5 text-muted",
};

export function Research() {
  return (
    <section id="research" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Research & Experiments"
          title="Asking questions the metrics can answer"
          description="Hands-on experiments and technical write-ups exploring what actually works in modern ML — honest, reproducible, and code-backed. (Formal publications will land here as they happen.)"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {research.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <SpotlightCard className="flex h-full flex-col p-6" tilt={false}>
                <div className="flex items-center justify-between">
                  <FileText className="h-5 w-5 text-brand-2" />
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] font-medium ${
                      STATUS_STYLE[item.status]
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-semibold leading-snug text-fg">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.abstract}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 border-t border-white/5 pt-4 text-sm">
                  {item.links.code && (
                    <a
                      href={item.links.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                    >
                      <Code2 className="h-4 w-4" /> Code
                    </a>
                  )}
                  {item.links.pdf && (
                    <a
                      href={item.links.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-muted transition-colors hover:text-fg"
                    >
                      <FileText className="h-4 w-4" /> PDF
                    </a>
                  )}
                  <span className="ml-auto inline-flex items-center gap-1 text-brand-2">
                    Read <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
