"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { techGraph } from "@/lib/data";

const GROUP_COLOR: Record<string, string> = {
  lang: "#f472b6",
  framework: "#7c5cff",
  ai: "#22d3ee",
  data: "#34d399",
  product: "#fbbf24",
  cloud: "#60a5fa",
};

const GROUP_LABEL: Record<string, string> = {
  lang: "Language",
  framework: "Frameworks",
  ai: "AI / LLMs",
  data: "Data & Stores",
  product: "Product",
  cloud: "Cloud",
};

export function TechGraph() {
  const W = 1000;
  const H = 600;
  const [hover, setHover] = useState<string | null>(null);

  // Deterministic radial layout grouped by category.
  const positions = useMemo(() => {
    const groups = Array.from(new Set(techGraph.nodes.map((n) => n.group)));
    const map: Record<string, { x: number; y: number }> = {};
    groups.forEach((g, gi) => {
      const members = techGraph.nodes.filter((n) => n.group === g);
      const gAngle = (Math.PI * 2 * gi) / groups.length;
      const gx = W / 2 + Math.cos(gAngle) * 250;
      const gy = H / 2 + Math.sin(gAngle) * 180;
      members.forEach((m, mi) => {
        const a = (Math.PI * 2 * mi) / members.length;
        const spread = members.length > 1 ? 85 : 0;
        // Round to whole pixels so SSR and client serialize identical strings
        // (avoids a floating-point hydration mismatch).
        map[m.id] = {
          x: Math.round(gx + Math.cos(a) * spread),
          y: Math.round(gy + Math.sin(a) * spread),
        };
      });
    });
    return map;
  }, []);

  const isActive = (id: string) =>
    !hover ||
    hover === id ||
    techGraph.links.some(
      ([a, b]) => (a === hover && b === id) || (b === hover && a === id)
    );

  const groups = Array.from(new Set(techGraph.nodes.map((n) => n.group)));

  return (
    <section id="tech" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <SectionHeading
          eyebrow="Tech Stack Graph"
          title="How my stack connects"
          description="An interactive map of the tools I work with and how they relate — from Python and PyTorch to LLMs, vector stores, and cloud. Hover a node to trace its connections."
        />

        <Reveal className="mt-10 sm:mt-14">
          <SpotlightCard className="p-3 sm:p-4 md:p-6" tilt={false}>
            {/* legend */}
            <div className="mb-3 flex flex-wrap gap-2 sm:mb-4 sm:gap-3">
              {groups.map((g) => (
                <span key={g} className="flex items-center gap-1 text-[0.65rem] text-muted sm:gap-1.5 sm:text-xs">
                  <span
                    className="h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
                    style={{ background: GROUP_COLOR[g] }}
                  />
                  {GROUP_LABEL[g]}
                </span>
              ))}
            </div>

            {/* Scrollable on mobile, full width on desktop */}
            <div className="-mx-1 overflow-x-auto pb-2 sm:mx-0 sm:overflow-visible sm:pb-0">
              <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full min-w-[800px] lg:min-w-0">
                {/* links */}
                {techGraph.links.map(([a, b], i) => {
                  const pa = positions[a];
                  const pb = positions[b];
                  if (!pa || !pb) return null;
                  const active = !hover || hover === a || hover === b;
                  return (
                    <line
                      key={i}
                      x1={pa.x}
                      y1={pa.y}
                      x2={pb.x}
                      y2={pb.y}
                      stroke={active ? "rgba(124,92,255,0.45)" : "rgba(255,255,255,0.06)"}
                      strokeWidth={active ? 1.4 : 0.8}
                      className="transition-all duration-300"
                    />
                  );
                })}

                {/* nodes */}
                {techGraph.nodes.map((n, i) => {
                  const p = positions[n.id];
                  const active = isActive(n.id);
                  const color = GROUP_COLOR[n.group];
                  return (
                    <g
                      key={n.id}
                      onMouseEnter={() => setHover(n.id)}
                      onMouseLeave={() => setHover(null)}
                      className="cursor-pointer transition-opacity duration-300"
                      opacity={active ? 1 : 0.28}
                    >
                      <circle cx={p.x} cy={p.y} r={hover === n.id ? 9 : 6} fill={color} className="transition-all duration-300" />
                      <circle cx={p.x} cy={p.y} r={14} fill={color} opacity={0.12} />
                      <text
                        x={p.x}
                        y={p.y - 16}
                        textAnchor="middle"
                        fill="#e9ecf5"
                        className="text-[10px] font-medium sm:text-[11px]"
                        pointerEvents="none"
                      >
                        {n.id}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Mobile scroll hint */}
            <p className="mt-2 text-center text-[0.6rem] text-faint sm:hidden">
              ← Scroll to explore the full graph →
            </p>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
