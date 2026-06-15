"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { modelShowcase } from "@/lib/data";

const METRICS = ["accuracy", "precision", "recall", "f1"] as const;

/** Stylized ROC curve whose shape tracks the selected model's accuracy. */
function RocCurve({ auc }: { auc: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const size = 220;
  // Bow the curve toward the top-left based on AUC.
  const k = (auc - 0.5) * 2; // 0..1
  const path = `M 20 ${size - 20} C ${20 + 40 * (1 - k)} ${size - 20 - 140 * k}, ${20 + 120 * k} 20, ${size - 20} 20`;

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} className="h-full w-full">
      <defs>
        <linearGradient id="rocStroke" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* axes */}
      <line x1="20" y1="20" x2="20" y2={size - 20} stroke="rgba(255,255,255,0.12)" />
      <line x1="20" y1={size - 20} x2={size - 20} y2={size - 20} stroke="rgba(255,255,255,0.12)" />
      {/* chance diagonal */}
      <line x1="20" y1={size - 20} x2={size - 20} y2="20" stroke="rgba(255,255,255,0.12)" strokeDasharray="4 4" />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#rocStroke)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: "easeInOut" }}
      />
      <text x={size - 24} y={size - 6} textAnchor="end" className="fill-[var(--color-faint)] text-[9px]">
        FPR
      </text>
      <text x="8" y="16" className="fill-[var(--color-faint)] text-[9px]">
        TPR
      </text>
    </svg>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-xs">
        <span className="capitalize text-muted">{label}</span>
        <span className="font-mono text-fg">{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  );
}

export function ModelShowcase() {
  const [active, setActive] = useState(0);
  const model = modelShowcase[active];

  return (
    <section id="models" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Model Showcase"
          title="The numbers behind the models"
          description="Every model is only as good as its evaluation. Here are the headline metrics for a few of my trained models — accuracy, precision, recall, F1, and the ROC profile."
        />

        <Reveal className="mt-14">
          <SpotlightCard className="grid gap-8 p-6 lg:grid-cols-[1fr_1.2fr] lg:p-8" tilt={false}>
            {/* selector + ROC */}
            <div>
              <div className="flex flex-wrap gap-2">
                {modelShowcase.map((m, i) => (
                  <button
                    key={m.model}
                    onClick={() => setActive(i)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      i === active
                        ? "border-brand/50 bg-brand/15 text-fg"
                        : "border-white/10 text-muted hover:text-fg"
                    }`}
                  >
                    {m.model}
                  </button>
                ))}
              </div>
              <div className="mt-6 aspect-square max-w-[260px]">
                <RocCurve auc={model.accuracy / 100} />
              </div>
              <p className="text-xs text-faint">
                ROC profile · approximate AUC {(model.accuracy / 100).toFixed(2)}
              </p>
            </div>

            {/* metrics */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-fg">{model.model}</h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {METRICS.map((metric) => (
                  <MetricBar key={metric} label={metric} value={model[metric]} />
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {METRICS.map((metric) => (
                  <div
                    key={metric}
                    className="rounded-lg border border-white/5 bg-white/[0.02] py-3 text-center"
                  >
                    <div className="text-base font-semibold text-gradient-brand">
                      {model[metric].toFixed(0)}
                    </div>
                    <div className="text-[0.6rem] uppercase text-faint">{metric}</div>
                  </div>
                ))}
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
