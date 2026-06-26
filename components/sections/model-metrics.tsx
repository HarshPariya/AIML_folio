"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/* ─────────────────────────────────────────────────────────── */
/* Data                                                         */
/* ─────────────────────────────────────────────────────────── */

const METRIC_MODELS = [
  {
    id: "brain-tumor",
    label: "Brain Tumor CNN",
    subtitle: "Deep Learning · 4 classes · TensorFlow",
    auc: 0.94,
    accuracy: 86.25,
    precision: 87.4,
    recall: 85.9,
    f1: 86.6,
    rocPoints: [
      [0, 0], [0.04, 0.32], [0.08, 0.55], [0.14, 0.70],
      [0.22, 0.80], [0.32, 0.87], [0.44, 0.92], [0.60, 0.95],
      [0.78, 0.97], [1.0, 1.0],
    ] as [number, number][],
  },
  {
    id: "fake-news",
    label: "Fake News SVM",
    subtitle: "NLP · Binary · 44,898 articles",
    auc: 0.998,
    accuracy: 99.29,
    precision: 99.3,
    recall: 99.2,
    f1: 99.25,
    rocPoints: [
      [0, 0], [0.008, 0.65], [0.02, 0.88], [0.04, 0.95],
      [0.08, 0.98], [0.15, 0.993], [0.30, 0.997], [0.60, 0.999], [1.0, 1.0],
    ] as [number, number][],
  },
  {
    id: "resume",
    label: "Resume XGBoost",
    subtitle: "Multi-class NLP · 22+ categories",
    auc: 0.92,
    accuracy: 80.9,
    precision: 82.1,
    recall: 80.1,
    f1: 81.0,
    rocPoints: [
      [0, 0], [0.05, 0.28], [0.10, 0.50], [0.18, 0.65],
      [0.28, 0.76], [0.40, 0.84], [0.55, 0.90], [0.72, 0.94],
      [0.88, 0.97], [1.0, 1.0],
    ] as [number, number][],
  },
];

/* ─────────────────────────────────────────────────────────── */
/* SVG layout                                                  */
/* ─────────────────────────────────────────────────────────── */

const W = 320, H = 200;
const PAD = { top: 14, right: 14, bottom: 30, left: 34 };
const PW = W - PAD.left - PAD.right;
const PH = H - PAD.top - PAD.bottom;

function toPath(pts: [number, number][]): string {
  return pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${(PAD.left + x * PW).toFixed(1)},${(PAD.top + (1 - y) * PH).toFixed(1)}`)
    .join(" ");
}

/* ─────────────────────────────────────────────────────────── */
/* ROC Curve                                                   */
/* ─────────────────────────────────────────────────────────── */

function RocCurve({ model }: { model: (typeof METRIC_MODELS)[0] }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const curvePath = toPath(model.rocPoints);
  const areaPath = `${curvePath} L${PAD.left + PW},${PAD.top + PH} L${PAD.left},${PAD.top + PH} Z`;

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label={`ROC for ${model.label}`}>
      <defs>
        <linearGradient id={`ag-${model.id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(124,92,255,0.45)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0.03)" />
        </linearGradient>
        <linearGradient id="lg-roc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
        <clipPath id={`cp-${model.id}`}>
          <motion.rect
            x={PAD.left} y={PAD.top} height={PH}
            initial={{ width: 0 }}
            animate={{ width: inView ? PW : 0 }}
            transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
        </clipPath>
      </defs>

      {/* Grid */}
      {[0.25, 0.5, 0.75].map((t) => (
        <g key={t}>
          <line x1={PAD.left + t * PW} y1={PAD.top} x2={PAD.left + t * PW} y2={PAD.top + PH} stroke="rgba(255,255,255,0.05)" strokeDasharray="3,4" />
          <line x1={PAD.left} y1={PAD.top + (1 - t) * PH} x2={PAD.left + PW} y2={PAD.top + (1 - t) * PH} stroke="rgba(255,255,255,0.05)" strokeDasharray="3,4" />
        </g>
      ))}

      {/* Axes */}
      <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PH} stroke="rgba(255,255,255,0.14)" />
      <line x1={PAD.left} y1={PAD.top + PH} x2={PAD.left + PW} y2={PAD.top + PH} stroke="rgba(255,255,255,0.14)" />
      <text x={PAD.left - 5} y={PAD.top + PH / 2} textAnchor="middle" dominantBaseline="middle"
        transform={`rotate(-90,${PAD.left - 5},${PAD.top + PH / 2})`} fill="var(--color-faint)" fontSize={8}>TPR</text>
      <text x={PAD.left + PW / 2} y={PAD.top + PH + 20} textAnchor="middle" fill="var(--color-faint)" fontSize={8}>FPR</text>

      {/* Diagonal baseline */}
      <path d={`M${PAD.left},${PAD.top + PH} L${PAD.left + PW},${PAD.top}`} stroke="rgba(255,255,255,0.10)" strokeDasharray="4,4" fill="none" />

      {/* Clipped area + curve */}
      <g clipPath={`url(#cp-${model.id})`}>
        <path d={areaPath} fill={`url(#ag-${model.id})`} />
        <path d={curvePath} fill="none" stroke="url(#lg-roc)" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Metric bar                                                  */
/* ─────────────────────────────────────────────────────────── */

function MetricBar({ label, value, delay, flip }: { label: string; value: number; delay: number; flip?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-muted">{label}</span>
        <span className="font-mono font-semibold text-fg">{value.toFixed(1)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={flip ? "h-full rounded-full bg-gradient-to-r from-brand-2 to-brand" : "h-full rounded-full bg-gradient-to-r from-brand to-brand-2"}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.0, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Section                                                     */
/* ─────────────────────────────────────────────────────────── */

export function ModelMetrics() {
  const [activeId, setActiveId] = useState(METRIC_MODELS[0].id);
  const model = METRIC_MODELS.find((m) => m.id === activeId) ?? METRIC_MODELS[0];

  return (
    <section id="model-metrics" className="section-pad relative">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="Model Showcase"
          title="Evaluation metrics, end to end"
          description="Every model is only as good as its evaluation. Here are the headline metrics for my trained models — accuracy, precision, recall, F1, and the ROC profile."
        />

        <Reveal className="mt-12">
          <SpotlightCard className="p-5 sm:p-8" tilt={false}>
            {/* Tabs */}
            <div className="mb-7 flex flex-wrap gap-2">
              {METRIC_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={[
                    "rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 focus:outline-none",
                    activeId === m.id
                      ? "bg-gradient-to-r from-brand to-brand-2 text-white shadow-md shadow-brand/20"
                      : "border border-white/10 bg-white/[0.03] text-muted hover:border-white/20 hover:text-fg",
                  ].join(" ")}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid gap-6 md:grid-cols-[1.1fr_1fr]"
            >
              {/* ROC */}
              <div>
                <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-black/30 p-3">
                  <RocCurve model={model} />
                </div>
                <p className="mt-2 text-[0.66rem] text-faint">
                  ROC profile · AUC{" "}
                  <span className="font-semibold text-muted">{model.auc.toFixed(3)}</span>
                </p>
                <p className="mt-1 text-sm font-semibold text-fg">{model.label}</p>
                <p className="text-[0.66rem] text-faint">{model.subtitle}</p>
              </div>

              {/* Metrics */}
              <div className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-x-5 gap-y-3.5">
                  <MetricBar label="Accuracy"  value={model.accuracy}  delay={0}    />
                  <MetricBar label="Precision" value={model.precision} delay={0.07} flip />
                  <MetricBar label="Recall"    value={model.recall}    delay={0.14} />
                  <MetricBar label="F1 Score"  value={model.f1}        delay={0.21} flip />
                </div>

                {/* Stat pills */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { v: model.accuracy,  l: "Accuracy" },
                    { v: model.precision, l: "Precision" },
                    { v: model.recall,    l: "Recall" },
                    { v: model.f1,        l: "F1" },
                  ].map(({ v, l }) => (
                    <div key={l} className="flex flex-col items-center rounded-xl border border-white/[0.07] bg-white/[0.03] px-2 py-3">
                      <span className="text-gradient-brand text-lg font-bold leading-none">{Math.round(v)}</span>
                      <span className="mt-1 text-[0.57rem] font-medium uppercase tracking-widest text-faint">{l}</span>
                    </div>
                  ))}
                </div>

                {/* AUC bar */}
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3">
                  <p className="text-[0.6rem] font-semibold uppercase tracking-widest text-faint">Area Under ROC</p>
                  <p className="mt-1 text-2xl font-bold text-gradient">{model.auc.toFixed(3)}</p>
                  <p className="text-[0.62rem] text-faint">
                    {model.auc >= 0.97 ? "Near-perfect discrimination" : model.auc >= 0.90 ? "Excellent discrimination" : "Good discrimination"}
                  </p>
                </div>
              </div>
            </motion.div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
