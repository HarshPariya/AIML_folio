"use client";

import { useMemo, useState } from "react";
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
                    className="inline-block h-2 w-2 rounded-full sm:h-2.5 sm:w-2.5"
                    style={{ backgroundColor: GROUP_COLOR[g] }}
                  />
                  {GROUP_LABEL[g]}
                </span>
              ))}
            </div>

            {/* Graph: SVG lines + HTML nodes overlay */}
            <div className="-mx-1 overflow-x-auto pb-2 sm:mx-0 sm:overflow-visible sm:pb-0">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  minWidth: 800,
                  aspectRatio: `${W} / ${H}`,
                }}
              >
                {/* SVG layer: only the connecting lines */}
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                      />
                    );
                  })}
                </svg>

                {/* HTML layer: nodes rendered as absolutely positioned divs */}
                {techGraph.nodes.map((n) => {
                  const p = positions[n.id];
                  const active = isActive(n.id);
                  const color = GROUP_COLOR[n.group];
                  // Convert from viewBox coords to percentages
                  const leftPct = (p.x / W) * 100;
                  const topPct = (p.y / H) * 100;

                  return (
                    <div
                      key={n.id}
                      onMouseEnter={() => setHover(n.id)}
                      onMouseLeave={() => setHover(null)}
                      onTouchStart={() => setHover(n.id)}
                      style={{
                        position: "absolute",
                        left: `${leftPct}%`,
                        top: `${topPct}%`,
                        transform: "translate(-50%, -50%)",
                        opacity: active ? 1 : 0.28,
                        cursor: "pointer",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        zIndex: hover === n.id ? 10 : 1,
                      }}
                    >
                      {/* Label */}
                      <span
                        style={{
                          color: "#e9ecf5",
                          fontSize: 11,
                          fontWeight: 500,
                          fontFamily: "Inter, system-ui, sans-serif",
                          whiteSpace: "nowrap",
                          marginBottom: 4,
                          textShadow: "0 1px 4px rgba(0,0,0,0.7)",
                        }}
                      >
                        {n.id}
                      </span>
                      {/* Glow ring */}
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -20%)",
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          backgroundColor: color,
                          opacity: 0.15,
                        }}
                      />
                      {/* Dot */}
                      <div
                        style={{
                          width: hover === n.id ? 16 : 12,
                          height: hover === n.id ? 16 : 12,
                          borderRadius: "50%",
                          backgroundColor: color,
                          boxShadow: `0 0 8px ${color}`,
                          position: "relative",
                          zIndex: 2,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
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
