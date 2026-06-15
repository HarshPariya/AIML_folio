"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/lib/data";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback(
    (next: number) => {
      setDir(next > index || (index === testimonials.length - 1 && next === 0) ? 1 : -1);
      setIndex((next + testimonials.length) % testimonials.length);
    },
    [index]
  );

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-25" />
      <div className="mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What people say"
          description="Recommendations from mentors, teammates, and collaborators."
        />

        <Reveal className="mt-14">
          <div className="relative">
            <div className="glass-strong relative min-h-[260px] overflow-hidden rounded-3xl p-8 sm:p-12">
              <Quote className="absolute right-8 top-8 h-16 w-16 text-white/[0.04]" />
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={index}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -40 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-pretty text-lg font-medium leading-relaxed text-fg sm:text-xl">
                    "{t.quote}"
                  </p>
                  <div className="mt-8 flex items-center gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-3 text-sm font-semibold text-white">
                      {t.initials}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-fg">{t.name}</div>
                      <div className="text-xs text-muted">{t.title}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                onClick={() => go(index - 1)}
                aria-label="Previous testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:text-fg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === index ? "w-6 bg-brand" : "w-2 bg-white/15"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() => go(index + 1)}
                aria-label="Next testimonial"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-muted transition-colors hover:text-fg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
