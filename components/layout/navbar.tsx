"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import Link from "next/link";
import { navItems } from "@/lib/data";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll on menu open — use documentElement to avoid iOS reflow quirk
  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.style.overflow = "hidden";
      // Notify background canvas to pause RAF while menu is open
      window.dispatchEvent(new CustomEvent("menuopen"));
    } else {
      html.style.overflow = "";
      window.dispatchEvent(new CustomEvent("menuclose"));
    }
    return () => {
      html.style.overflow = "";
    };
  }, [open]);

  // Close menu on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    // Small rAF delay so the menu starts closing before scroll begins
    requestAnimationFrame(() => {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className={cn(
          "relative z-[60] flex w-full max-w-5xl items-center justify-between rounded-full px-3 py-1.5 transition-all duration-300",
          scrolled
            ? "glass-strong shadow-[0_8px_40px_-12px_rgba(0,0,0,0.7)]"
            : "border border-transparent bg-transparent"
        )}
      >
        <Link href="/" className="pl-1.5" aria-label="Harsh Pariya - home">
          <Logo markSize={28} />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-fg"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Button href={siteConfig.resumeUrl} external variant="outline" size="sm" data-resume>
            <Download className="h-4 w-4" />
            Resume
          </Button>
          <Button href="#contact" size="sm">
            Let&apos;s talk
          </Button>
        </div>

        {/* Mobile hamburger — touch-action:manipulation removes iOS 300ms delay */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mobile-menu-btn relative z-[60] grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
          style={{ touchAction: "manipulation" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {/* Use CSS opacity swap instead of conditional rendering — avoids React reconcile */}
          <Menu
            className="h-5 w-5 absolute transition-all duration-200"
            style={{ opacity: open ? 0 : 1, transform: open ? "rotate(90deg) scale(0.7)" : "rotate(0deg) scale(1)" }}
            aria-hidden
          />
          <X
            className="h-5 w-5 absolute transition-all duration-200"
            style={{ opacity: open ? 1 : 0, transform: open ? "rotate(0deg) scale(1)" : "rotate(-90deg) scale(0.7)" }}
            aria-hidden
          />
        </button>
      </motion.nav>

      {/*
        Mobile menu overlay — pure CSS transitions, no Framer Motion.
        backdrop-blur only applied after open (avoids iOS initial composite cost).
        GPU-only properties: opacity + transform, no layout-triggering changes.
      */}
      <div
        id="mobile-menu"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className="fixed inset-0 z-[55] flex flex-col px-6 pt-24 md:hidden"
        style={{
          background: "rgba(3, 5, 13, 0.96)",
          // Use transform + opacity for GPU-composited transitions (no layout thrash)
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity 0.22s ease, transform 0.22s ease",
          // Prevent interaction when hidden
          pointerEvents: open ? "auto" : "none",
          // backdrop-blur as CSS var so it only costs GPU when visible
          WebkitBackdropFilter: open ? "blur(16px)" : "none",
          backdropFilter: open ? "blur(16px)" : "none",
          willChange: "opacity, transform",
        }}
      >
        <nav className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="block border-b border-white/5 py-4 text-2xl font-medium text-fg"
              style={{
                // CSS stagger via transition-delay — zero JS overhead
                opacity: open ? 1 : 0,
                transform: open ? "translateX(0)" : "translateX(-16px)",
                transition: `opacity 0.2s ease ${0.04 + i * 0.05}s, transform 0.2s ease ${0.04 + i * 0.05}s`,
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div
          className="mt-8 flex flex-col gap-3"
          style={{
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.2s ease 0.25s, transform 0.2s ease 0.25s",
          }}
        >
          <Button href={siteConfig.resumeUrl} external variant="outline" size="lg">
            <Download className="h-4 w-4" /> Download Resume
          </Button>
          <Button
            href="#contact"
            size="lg"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              handleNavClick("#contact");
            }}
          >
            Let&apos;s talk
          </Button>
        </div>
      </div>
    </header>
  );
}
