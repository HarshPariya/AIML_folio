"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { skillCategories, radarSkills } from "@/lib/data";

/* --- Radar chart (pure SVG) --- */
function RadarChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const size = 280;
  const c = size / 2;
  const maxR = c - 36;
  const axes = radarSkills.length;

  const point = (i: number, value: number) => {
    const angle = (Math.PI * 2 * i) / axes - Math.PI / 2;
    const r = (value / 100) * maxR;
    return [c + r * Math.cos(angle), c + r * Math.sin(angle)] as const;
  };

  const polygon = radarSkills.map((s, i) => point(i, s.value).join(",")).join(" ");
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124,92,255,0.45)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.15)" />
        </radialGradient>
      </defs>

      {rings.map((r) => (
        <polygon
          key={r}
          points={radarSkills
            .map((_, i) => point(i, r * 100).join(","))
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={1}
        />
      ))}

      {radarSkills.map((s, i) => {
        const [x, y] = point(i, 100);
        const [lx, ly] = point(i, 122);
        return (
          <g key={s.axis}>
            <line x1={c} y1={c} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" />
            <text
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-[var(--color-muted)] text-[9px] font-medium"
            >
              {s.axis}
            </text>
          </g>
        );
      })}

      <motion.polygon
        points={polygon}
        fill="url(#radarFill)"
        stroke="rgba(124,92,255,0.9)"
        strokeWidth={1.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
        style={{ transformOrigin: "center" }}
      />
      {radarSkills.map((s, i) => {
        const [x, y] = point(i, s.value);
        return <circle key={s.axis} cx={x} cy={y} r={3} className="fill-[var(--color-brand-2)]" />;
      })}
    </svg>
  );
}

/* --- Animated skill bar --- */
function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref}>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-fg">{name}</span>
        <span className="font-mono text-faint">{level}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Skills"
          title="An ML toolkit, end to end"
          description="From the math and the models to the frameworks and the deployment — the stack I use to take ideas from notebook to production."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* radar */}
          <Reveal>
            <SpotlightCard className="flex flex-col items-center p-6" tilt={false}>
              <h3 className="self-start text-sm font-semibold text-fg">Capability profile</h3>
              <div className="mt-2 aspect-square w-full max-w-[320px]">
                <RadarChart />
              </div>
              <p className="text-center text-xs text-faint">
                Relative strength across core AI/ML competencies
              </p>
            </SpotlightCard>
          </Reveal>

          {/* category cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            {skillCategories.map((cat, i) => (
              <Reveal key={cat.title} delay={i * 0.06}>
                <SpotlightCard className="h-full p-6" tilt={false}>
                  <div className="flex items-center gap-3">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-lg`}
                    >
                      <cat.icon className="h-5 w-5" />
                    </span>
                    <h3 className="text-sm font-semibold text-fg">{cat.title}</h3>
                  </div>
                  <div className="mt-5 space-y-3.5">
                    {cat.skills.map((s, j) => (
                      <SkillBar key={s.name} name={s.name} level={s.level} delay={j * 0.05} />
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Languages and Soft Skills */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Languages */}
          <Reveal>
            <SpotlightCard className="p-6" tilt={false}>
              <h3 className="text-sm font-semibold text-fg">Languages</h3>
              <div className="mt-4 space-y-3">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-fg">{lang.name}</span>
                    <span className="font-mono text-faint">— {lang.proficiency}</span>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Soft Skills */}
          <Reveal delay={0.06}>
            <SpotlightCard className="p-6" tilt={false}>
              <h3 className="text-sm font-semibold text-fg">Soft Skills</h3>
              <div className="mt-4 space-y-2">
                {softSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex items-center gap-2 text-xs text-fg"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2" />
                    {skill.name}
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
