import { cn } from "@/lib/utils";

/**
 * Generated abstract project poster - no image assets required. A gradient
 * wash, a circuit-grid, and a soft glow keep cards consistent and fast.
 */
export function ProjectPoster({
  gradient,
  category,
  className,
  seed = 0,
}: {
  gradient: string;
  category: string;
  className?: string;
  seed?: number;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-gradient-to-br",
        gradient,
        className
      )}
    >
      <div className="absolute inset-0 bg-bg/40" />
      {/* circuit grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-50"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id={`grid-${seed}`} width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${seed})`} />
      </svg>
      {/* animated nodes */}
      <svg className="absolute inset-0 h-full w-full" aria-hidden>
        {Array.from({ length: 6 }).map((_, i) => {
          const x = 12 + ((i * 73 + seed * 31) % 80);
          const y = 18 + ((i * 47 + seed * 19) % 64);
          return (
            <circle
              key={i}
              cx={`${x}%`}
              cy={`${y}%`}
              r={i % 2 ? 2.5 : 1.5}
              className="fill-white/60"
            />
          );
        })}
        <line x1="12%" y1="22%" x2="62%" y2="58%" stroke="rgba(255,255,255,0.18)" />
        <line x1="62%" y1="58%" x2="88%" y2="30%" stroke="rgba(255,255,255,0.18)" />
      </svg>
      <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-bg/50 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-fg backdrop-blur">
        {category}
      </span>
    </div>
  );
}
