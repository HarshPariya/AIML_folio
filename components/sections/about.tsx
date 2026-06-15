"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GraduationCap, Target, Lightbulb, Rocket, MapPin } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { iconMap, aboutParagraphs, counters, journey } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const focusCards = [
  {
    icon: Lightbulb,
    title: "Why ML",
    body: "I'm drawn to the patterns machines can see that we can't — and the engineering it takes to make those patterns useful.",
  },
  {
    icon: Target,
    title: "Research interests",
    body: "LLMs, Retrieval-Augmented Generation, applied deep learning, and the gap between offline metrics and real impact.",
  },
  {
    icon: Rocket,
    title: "Career goal",
    body: "An AI/ML internship where I can contribute to production systems and learn from strong researchers and engineers.",
  },
];

export function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="About"
          title="From curiosity to intelligent systems"
          description="The story behind the work — how I got into AI, what drives me, and where I'm headed."
        />

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          {/* profile photo */}
          <Reveal className="lg:sticky lg:top-28">
            <div className="relative mx-auto max-w-sm">
              {/* ambient glow */}
              <div className="absolute -inset-4 -z-10 rounded-[2.25rem] bg-gradient-to-br from-brand/30 via-brand-3/20 to-brand-2/20 blur-2xl" />
              {/* gradient frame */}
              <div className="border-gradient relative overflow-hidden rounded-3xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-surface">
                  <Image
                    src={siteConfig.avatar}
                    alt={`${siteConfig.name} — ${siteConfig.role}`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 380px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/5 to-transparent" />
                  {/* name plate */}
                  <div className="glass-strong absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl px-4 py-3">
                    <div>
                      <div className="text-sm font-semibold text-fg">Harsh Pariya</div>
                      <div className="text-[0.7rem] text-muted">B.Tech CSE · Rai University</div>
                    </div>
                    <span className="flex items-center gap-1.5 text-[0.65rem] text-emerald-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      Available
                    </span>
                  </div>
                </div>
              </div>

              {/* floating chips */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -right-3 -top-3 rounded-full px-3 py-1.5 text-xs text-fg shadow-lg sm:-right-5"
              >
                <span className="font-semibold text-gradient-brand">AI / ML</span> Engineer
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="glass absolute -left-3 -top-3 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-muted shadow-lg sm:-left-5"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-2" /> Ahmedabad, India
              </motion.div>
            </div>
          </Reveal>

          {/* story */}
          <div className="space-y-5">
            {aboutParagraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <p className="text-pretty text-base leading-relaxed text-muted sm:text-[1.05rem]">
                  {p}
                </p>
              </Reveal>
            ))}

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              {focusCards.map((card, i) => (
                <Reveal key={card.title} delay={0.1 + i * 0.08}>
                  <SpotlightCard className="h-full p-5" tilt={false}>
                    <card.icon className="h-5 w-5 text-brand-2" />
                    <h3 className="mt-3 text-sm font-semibold text-fg">{card.title}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">{card.body}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* counters strip */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {counters.map((c, i) => {
            const Icon = iconMap[c.icon] ?? GraduationCap;
            return (
              <Reveal key={c.label} delay={i * 0.08}>
                <SpotlightCard className="p-5" tilt={false}>
                  <Icon className="h-5 w-5 text-brand" />
                  <div className="mt-4 text-3xl font-semibold tracking-tight">
                    <Counter value={c.value} suffix={c.suffix} />
                  </div>
                  <div className="mt-1 text-xs text-muted">{c.label}</div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        {/* journey timeline */}
        <div className="mt-20">
          <Reveal>
            <h3 className="mb-10 flex items-center gap-2 text-lg font-semibold">
              <GraduationCap className="h-5 w-5 text-brand-2" /> My journey into AI
            </h3>
          </Reveal>

          <div className="relative pl-6 sm:pl-0">
            {/* vertical line */}
            <div className="absolute left-[7px] top-2 h-full w-px bg-gradient-to-b from-brand/60 via-white/10 to-transparent sm:left-1/2" />

            <div className="space-y-10">
              {journey.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: 0.05 }}
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-10 ${
                    i % 2 === 0 ? "" : "sm:[direction:rtl]"
                  }`}
                >
                  <div
                    className={`sm:[direction:ltr] ${
                      i % 2 === 0 ? "sm:text-right sm:pr-10" : "sm:col-start-2 sm:pl-10"
                    }`}
                  >
                    {/* node */}
                    <span className="absolute left-[-21px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-brand shadow-[0_0_0_4px] shadow-brand/20 sm:left-1/2 sm:-translate-x-1/2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    <span className="font-mono text-xs text-brand-2">{item.year}</span>
                    <h4 className="mt-1 text-base font-semibold text-fg">{item.title}</h4>
                    <p className="text-xs text-faint">{item.org}</p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
