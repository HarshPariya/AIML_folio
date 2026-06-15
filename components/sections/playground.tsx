"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, Scan } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/* A tiny, transparent lexicon — runs entirely in the browser, no API. */
const POS = ["love", "great", "amazing", "excellent", "good", "happy", "best", "awesome", "fantastic", "incredible", "wonderful", "brilliant", "perfect", "enjoy", "impressive"];
const NEG = ["hate", "bad", "terrible", "awful", "worst", "sad", "poor", "boring", "broken", "useless", "disappointing", "horrible", "slow", "buggy", "confusing"];

function analyzeSentiment(text: string) {
  const tokens = text.toLowerCase().match(/[a-z']+/g) ?? [];
  let score = 0;
  let hits = 0;
  for (const t of tokens) {
    if (POS.includes(t)) { score += 1; hits++; }
    if (NEG.includes(t)) { score -= 1; hits++; }
  }
  const norm = tokens.length ? score / Math.sqrt(tokens.length) : 0;
  const prob = 1 / (1 + Math.exp(-norm * 1.6)); // sigmoid → P(positive)
  const label = prob > 0.58 ? "Positive" : prob < 0.42 ? "Negative" : "Neutral";
  const confidence = Math.round(Math.max(prob, 1 - prob) * 100);
  return { prob, label, confidence, hits, tokenCount: tokens.length };
}

const TABS = [
  { id: "sentiment", label: "Sentiment", icon: Sparkles },
  { id: "tokenizer", label: "Tokenizer", icon: Scan },
] as const;

export function Playground() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("sentiment");
  const [text, setText] = useState("This portfolio is absolutely amazing and the projects are impressive!");

  const sentiment = useMemo(() => analyzeSentiment(text), [text]);
  const tokens = useMemo(() => text.match(/[\w']+|[^\s\w]/g) ?? [], [text]);

  const barColor =
    sentiment.label === "Positive"
      ? "from-emerald-500 to-teal-400"
      : sentiment.label === "Negative"
        ? "from-rose-500 to-red-400"
        : "from-amber-500 to-yellow-400";

  return (
    <section id="playground" className="section-pad relative">
      <div className="absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-25" />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="AI Playground"
          title="Try it yourself"
          description="A live, in-browser demo — no servers, no API keys. Type anything and watch a lightweight model reason about it in real time."
        />

        <Reveal className="mt-12">
          <SpotlightCard className="p-2" tilt={false}>
            {/* tabs */}
            <div className="flex gap-1 rounded-xl bg-white/[0.02] p-1">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                    tab === t.id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {tab === t.id && (
                    <motion.span
                      layoutId="pg-tab"
                      className="absolute inset-0 rounded-lg border border-white/10 bg-white/[0.06]"
                      transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    />
                  )}
                  <t.icon className="relative h-4 w-4" />
                  <span className="relative">{t.label}</span>
                </button>
              ))}
            </div>

            <div className="grid gap-6 p-5 md:grid-cols-2">
              {/* input */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-faint">
                  <Cpu className="h-3.5 w-3.5" /> Input
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="w-full resize-none rounded-xl border border-white/10 bg-bg/60 p-4 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand/50"
                  placeholder="Type a sentence to analyze…"
                />
                <p className="mt-2 font-mono text-[0.7rem] text-faint">
                  {sentiment.tokenCount} tokens · runs locally in your browser
                </p>
              </div>

              {/* output */}
              <div className="rounded-xl border border-white/10 bg-bg/40 p-4">
                {tab === "sentiment" ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-faint">Prediction</span>
                      <span
                        className={`rounded-full bg-gradient-to-r px-2.5 py-1 text-xs font-semibold text-white ${barColor}`}
                      >
                        {sentiment.label}
                      </span>
                    </div>

                    <div className="mt-5 space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-xs text-muted">
                          <span>P(positive)</span>
                          <span className="font-mono">{(sentiment.prob * 100).toFixed(1)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
                            animate={{ width: `${sentiment.prob * 100}%` }}
                            transition={{ type: "spring", stiffness: 120, damping: 20 }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
                        <span className="text-muted">Confidence</span>
                        <span className="font-mono text-fg">{sentiment.confidence}%</span>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-sm">
                        <span className="text-muted">Signal words matched</span>
                        <span className="font-mono text-fg">{sentiment.hits}</span>
                      </div>
                    </div>
                    <p className="mt-4 text-[0.7rem] leading-relaxed text-faint">
                      A transparent lexicon + sigmoid baseline — the same kind of model I
                      benchmark transformers against in my NLP work.
                    </p>
                  </div>
                ) : (
                  <div>
                    <span className="text-xs uppercase tracking-wider text-faint">
                      {tokens.length} tokens
                    </span>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {tokens.map((tok, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.012 }}
                          className="rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-xs text-fg"
                          style={{
                            background: `color-mix(in oklab, hsl(${(i * 47) % 360} 70% 60%) 14%, transparent)`,
                          }}
                        >
                          {tok}
                        </motion.span>
                      ))}
                    </div>
                    <p className="mt-4 text-[0.7rem] leading-relaxed text-faint">
                      Tokenization is step zero of every NLP pipeline — how you split text
                      shapes everything downstream.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </section>
  );
}
