"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered smooth scrolling. Respects prefers-reduced-motion by skipping
 * the smoothing entirely so the OS-native scroll is used.
 *
 * On touch devices (iOS/Android), Lenis is disabled — they have excellent
 * native momentum scrolling. We add a lightweight anchor-click handler so
 * that #hash links still scroll smoothly using the native scrollIntoView API.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (reduce || isTouch) {
      // Mobile fallback: smooth scrollIntoView for anchor links
      // (Lenis is off, but we still want smooth in-page navigation)
      const onMobileClick = (e: MouseEvent) => {
        const target = (e.target as HTMLElement).closest('a[href^="#"]');
        if (!target) return;
        const id = target.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      document.addEventListener("click", onMobileClick);
      return () => document.removeEventListener("click", onMobileClick);
    }

    // Desktop: full Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Smooth-scroll for in-page anchor links on desktop
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
