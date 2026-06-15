"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import { heroRotatingWords, heroStats } from "@/lib/data";
import { siteConfig } from "@/lib/site";

// 3D globe is heavy — load it only on the client, after the hero paints.
const ParticleGlobe = dynamic(() => import("@/components/visuals/particle-globe"), {
  ssr: false,
  loading: () => null,
});

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[index % words.length];
    const speed = deleting ? 40 : 85;
    const timeout = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDeleting(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const typed = useTypewriter(heroRotatingWords);
  const [loadGlobe, setLoadGlobe] = useState(false);

  useEffect(() => {
    // Defer loading heavy 3D assets to keep initial page load blazing fast
    const timer = setTimeout(() => setLoadGlobe(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-20 sm:gap-12 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pb-10">
        {/* left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.65rem] text-muted backdrop-blur sm:px-3.5 sm:text-xs"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            {siteConfig.availability}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="mt-5 text-balance text-3xl font-semibold leading-[1.08] tracking-tight sm:mt-6 sm:text-4xl md:text-5xl lg:text-6xl"
          >
            Building <span className="text-gradient-brand">Intelligent Systems</span> with AI &amp;
            Machine Learning
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16 }}
            className="mt-4 flex flex-wrap items-center gap-1.5 font-mono text-xs text-muted sm:mt-5 sm:gap-2 sm:text-sm md:text-base"
          >
            <Sparkles className="h-3.5 w-3.5 text-brand-2 sm:h-4 sm:w-4" />
            <span>I work on</span>
            <span className="text-fg">{typed}</span>
            <span className="inline-block h-4 w-[2px] animate-pulse bg-brand-2 sm:h-5" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-muted sm:mt-5 sm:text-base md:text-lg"
          >
            AI Engineer focused on Machine Learning, Deep Learning, LLMs, Computer Vision,
            Generative AI, and scalable AI products — turning research into systems people use.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8 sm:gap-3"
          >
            <Magnetic>
              <Button href="#projects" size="lg">
                View Projects <ArrowRight className="h-4 w-4" />
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href={siteConfig.resumeUrl} external variant="outline" size="lg" data-resume>
                <Download className="h-4 w-4" /> Download Resume
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="#contact" variant="ghost" size="lg">
                <Mail className="h-4 w-4" /> Contact Me
              </Button>
            </Magnetic>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex items-center gap-2 text-xs text-faint sm:mt-10 sm:text-sm"
          >
            <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {siteConfig.location}
          </motion.div>
        </div>

        {/* right: 3D globe + stats — now visible on mobile, scaled to fit */}
        <div className="relative mt-6 flex justify-center lg:mt-0 lg:block">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[360px] lg:max-w-md"
          >
            <div className="absolute inset-0 rounded-full bg-brand/10 blur-3xl" />
            {loadGlobe && <ParticleGlobe />}
            {/* orbiting labels */}
            <div className="absolute inset-0 scale-[0.7] sm:scale-[0.85] lg:scale-100">
              {["LLMs", "PyTorch", "RAG", "Vision"].map((label, i) => (
                <motion.span
                  key={label}
                  className="absolute left-1/2 top-1/2 rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-xs text-muted backdrop-blur"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 22 + i * 4, repeat: Infinity, ease: "linear" }}
                  style={{
                    transformOrigin: `0px ${120 + i * 18}px`,
                    marginLeft: -24,
                    marginTop: -(120 + i * 18),
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats grid — shown on all breakpoints */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-3 gap-2.5 sm:gap-3 lg:col-span-2 lg:mx-auto lg:mt-4 lg:max-w-2xl"
        >
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl px-2.5 py-3 text-center sm:px-3"
            >
              <div className="text-lg font-semibold text-gradient-brand sm:text-xl md:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 text-[0.6rem] uppercase tracking-wide text-faint sm:text-[0.65rem]">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-faint md:flex"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-brand-2"
          />
        </span>
      </motion.div>
    </section>
  );
}
