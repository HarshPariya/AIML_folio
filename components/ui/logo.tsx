import { cn } from "@/lib/utils";

/**
 * Harsh Pariya brand mark — a geometric "HP" ligature where the H's right leg
 * doubles as the P's stem, set in a gradient squircle. Pure SVG paths so it
 * renders identically everywhere (navbar, footer, favicon, OG, avatars).
 */
export function LogoMark({
  size = 34,
  className,
  title = "Harsh Pariya",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="hpGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c5cff" />
          <stop offset="55%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient id="hpGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* badge */}
      <rect x="3" y="3" width="94" height="94" rx="26" fill="url(#hpGrad)" />
      <rect x="3" y="3" width="94" height="94" rx="26" fill="url(#hpGloss)" />
      <rect
        x="4.25"
        y="4.25"
        width="91.5"
        height="91.5"
        rx="24.75"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* HP monogram */}
      <g
        stroke="#ffffff"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M31 29 V73" />
        <path d="M53 29 V73" />
        <path d="M31 51 H53" />
        <path d="M53 29 C71 29, 71 48, 53 48" />
      </g>

      {/* AI accent node */}
      <circle cx="31" cy="29" r="4.5" fill="#22d3ee" />
    </svg>
  );
}

/** Full lockup: mark + wordmark. Use `wordmark={false}` for icon-only. */
export function Logo({
  className,
  wordmark = true,
  markSize = 34,
}: {
  className?: string;
  wordmark?: boolean;
  markSize?: number;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark size={markSize} />
      {wordmark && (
        <span className="text-[0.95rem] font-semibold leading-none tracking-tight text-fg">
          Harsh Pariya
          <span className="text-gradient-brand">.</span>
        </span>
      )}
    </span>
  );
}
