"use client";

import { useEffect, useRef, useState } from "react";
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
  // Track whether the overlay has mounted so CSS transition can fire
  const [mounted, setMounted] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const openMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
    // Defer visibility tick so the CSS transition gets a starting frame
    requestAnimationFrame(() => setMounted(true));
  };

  const closeMenu = () => {
    setMounted(false);
    // Wait for CSS transition to finish before unmounting
    closeTimerRef.current = setTimeout(() => setOpen(false), 250);
  };

  const toggle = () => (open ? closeMenu() : openMenu());

  // Cleanup timer on unmount
  useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
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

        {/* Mobile hamburger / close toggle - always above overlay */}
        <button
          type="button"
          onClick={toggle}
          className="relative z-[70] grid h-10 w-10 place-items-center rounded-full text-fg md:hidden"
          style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile full-screen menu — CSS transition only, no backdrop-blur (kills iOS Safari) */}
      {open && (
        <div
          className="fixed inset-0 z-[55] flex flex-col bg-bg px-6 pt-24 md:hidden"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 220ms ease",
            // DO NOT use backdrop-filter here — it freezes iOS Safari on large elements
          }}
          aria-hidden={!open}
        >
          <div className="flex flex-col gap-1">
            {navItems.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="block border-b border-white/5 py-4 text-2xl font-medium text-fg"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? "translateX(0)" : "translateX(-16px)",
                  transition: `opacity 200ms ease ${60 + i * 50}ms, transform 200ms ease ${60 + i * 50}ms`,
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3">
            <Button href={siteConfig.resumeUrl} external variant="outline" size="lg">
              <Download className="h-4 w-4" /> Download Resume
            </Button>
            <Button href="#contact" size="lg" onClick={closeMenu}>
              Let&apos;s talk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
