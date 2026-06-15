"use client";

import { motion } from "framer-motion";
import { Briefcase, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { experiences } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-25" />
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Experience"
          title="Where I've been building"
          description="Internships, independent project work, and education — the path that's shaping me into an AI/ML engineer."
        />

        <div className="relative mt-14">
          <div className="absolute left-[18px] top-2 h-full w-px bg-gradient-to-b from-brand/50 via-white/10 to-transparent md:left-1/2" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className={`relative pl-12 md:grid md:grid-cols-2 md:gap-12 md:pl-0 ${
                  i % 2 === 0 ? "md:[direction:rtl]" : ""
                }`}
              >
                <span className="absolute left-[10px] top-3 grid h-4 w-4 place-items-center rounded-full bg-brand shadow-[0_0_0_5px] shadow-brand/15 md:left-1/2 md:-translate-x-1/2">
                  <Briefcase className="h-2 w-2 text-white" />
                </span>

                <div className={`md:[direction:ltr] ${i % 2 === 0 ? "md:col-start-2" : ""}`}>
                  <SpotlightCard className="p-5" tilt={false}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[0.65rem] uppercase tracking-wide text-brand-2">
                        {exp.type}
                      </span>
                      <span className="font-mono text-xs text-faint">{exp.period}</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-fg">{exp.role}</h3>
                    <p className="text-sm text-muted">{exp.org}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{exp.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {exp.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-xs text-muted">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </SpotlightCard>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
