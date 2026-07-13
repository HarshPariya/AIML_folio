"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  // Track whether we're on a touch device to skip expensive effects
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open — use touch-action instead of overflow
  // on iOS to avoid the expensive reflow that causes freezes
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // iOS Safari needs this to prevent scroll-through
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [open]);

  const close = () => setOpen(false);

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

        {/* Mobile hamburger / close toggle - always above overlay */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[60] grid h-10 w-10 place-items-center rounded-full text-fg touch-manipulation md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          // Use onTouchEnd for instant response on iOS (fires before onClick delay)
          onTouchEnd={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            // NO backdrop-blur on mobile — it's the primary cause of iOS Safari freezing
            // Use a solid/near-solid background instead for the same visual effect
            className="fixed inset-0 top-0 z-[55] flex flex-col bg-bg/98 px-6 pt-24 md:hidden"
            style={{ willChange: "opacity" }}
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18, delay: 0.04 * i }}
                  style={{ willChange: "opacity, transform" }}
                >
                  <a
                    href={item.href}
                    onClick={close}
                    onTouchEnd={(e) => {
                      e.preventDefault();
                      close();
                      window.location.href = item.href;
                    }}
                    className="block border-b border-white/5 py-4 text-2xl font-medium text-fg"
                  >
                    {item.label}
                  </a>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Button href={siteConfig.resumeUrl} external variant="outline" size="lg">
                <Download className="h-4 w-4" /> Download Resume
              </Button>
              <Button href="#contact" size="lg" onClick={close}>
                Let&apos;s talk
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
