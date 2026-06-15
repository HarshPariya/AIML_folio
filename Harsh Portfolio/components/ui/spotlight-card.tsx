"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Glass card with a cursor-following radial spotlight and a subtle 3D tilt.
 * The spotlight is driven by CSS custom properties for cheap GPU compositing.
 */
export function SpotlightCard({
  children,
  className,
  tilt = true,
}: {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rx = tilt ? (py - 0.5) * -6 : 0;
    const ry = tilt ? (px - 0.5) * 6 : 0;
    setStyle({
      ["--mx" as string]: `${px * 100}%`,
      ["--my" as string]: `${py * 100}%`,
      transform: `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`,
    });
  };

  const reset = () =>
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={style}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-surface/60 backdrop-blur-xl transition-transform duration-200 will-change-transform",
        className
      )}
    >
      {/* spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), color-mix(in oklab, var(--color-brand) 18%, transparent), transparent 60%)",
        }}
      />
      {/* top highlight line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
