"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Aurora gradient blobs - slow, GPU-cheap, blurred color fields. Decorative.
 */
export function Aurora({ className }: { className?: string }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  if (isMobile) return null;

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -left-1/4 top-[-10%] h-[42rem] w-[42rem] rounded-full bg-brand/20 blur-[120px] animate-aurora" />
      <div className="absolute right-[-15%] top-[10%] h-[36rem] w-[36rem] rounded-full bg-brand-2/15 blur-[120px] animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-1/3 h-[40rem] w-[40rem] rounded-full bg-brand-3/15 blur-[130px] animate-aurora [animation-delay:-12s]" />
    </div>
  );
}

/** Static masked grid + dot field for section backgrounds. */
export function GridField({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 bg-grid bg-grid-fade opacity-60",
        className
      )}
    />
  );
}

/** Full ambient layer used behind the whole page. */
export function AmbientBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-bg" />
      <Aurora className="opacity-70" />
      <div className="absolute inset-0 bg-dots opacity-[0.35]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/40 to-bg" />
    </div>
  );
}
