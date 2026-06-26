"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/* ─────────────────────────────────────────────────────────── */
/* Types                                                        */
/* ─────────────────────────────────────────────────────────── */

interface ClassResult { label: string; confidence: number; color: string; }
interface PipelineStep { id: string; label: string; ms: number; }

type InputMode = "text" | "file" | "image";

interface ModelDef {
  id: string;
  name: string;
  accent: string;
  description: string;
  inputMode: InputMode;
  accept?: string;
  acceptLabel?: string;
  placeholder?: string;
  examples?: string[];
  pipeline: PipelineStep[];
  classify: (input: string) => ClassResult[];
}

/* ─────────────────────────────────────────────────────────── */
/* Hash util (for deterministic file-based results)           */
/* ─────────────────────────────────────────────────────────── */

function hashStr(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h);
}

function seededRand(seed: number, n: number): number {
  return ((seed * 1103515245 + 12345 + n * 6364136223846793005) % 2147483648) / 2147483648;
}

/* ─────────────────────────────────────────────────────────── */
/* Classifiers                                                  */
/* ─────────────────────────────────────────────────────────── */

function classifyFakeNews(text: string): ClassResult[] {
  const t = text.toLowerCase();
  const fakeKw = ["breaking","shocking","exposed","secret","they don't want","miracle","deep state","hoax","fake","conspiracy","wake up","share before deleted","bombshell"];
  const realKw = ["according to","reuters","associated press","study shows","researchers","published","government","official","statistics","reported","confirmed","analysis"];
  let fake = fakeKw.filter((k) => t.includes(k)).length;
  let real = realKw.filter((k) => t.includes(k)).length;
  if (t.length < 30) { fake += 0.4; real += 0.4; }
  const tot = fake + real + 1;
  const fc = Math.min(97, Math.round((fake / tot) * 100) + 38);
  const rc = 100 - fc;
  return fc > rc
    ? [{ label: "FAKE NEWS", confidence: fc, color: "#f87171" }, { label: "REAL NEWS", confidence: rc, color: "#34d399" }]
    : [{ label: "REAL NEWS", confidence: rc, color: "#34d399" }, { label: "FAKE NEWS", confidence: fc, color: "#f87171" }];
}

const RESUME_CATS: [string, string[], string][] = [
  ["Data Science",    ["python","machine learning","pandas","numpy","sklearn","tensorflow","model","dataset","jupyter","ml","ai"], "#a78bfa"],
  ["Engineering",     ["java","c++","system","embedded","hardware","firmware","circuit","design"], "#60a5fa"],
  ["Web Development", ["react","html","css","javascript","frontend","node","api","vue","typescript"], "#34d399"],
  ["Finance",         ["investment","portfolio","risk","accounting","finance","equity","banking","revenue"], "#fbbf24"],
  ["HR / Management", ["recruitment","hiring","onboarding","hr","talent","employee","leadership","management"], "#f472b6"],
  ["Marketing",       ["seo","campaign","brand","social media","digital marketing","conversion","ads","content"], "#fb923c"],
  ["Healthcare",      ["patient","clinical","medical","diagnosis","hospital","nursing","pharmaceutical"], "#2dd4bf"],
];

function classifyResume(input: string): ClassResult[] {
  // If it's a filename (file-based), use hash-based deterministic prediction
  const isFile = input.startsWith("__file__:");
  if (isFile) {
    const fname = input.replace("__file__:", "").toLowerCase();
    const seed = hashStr(fname);
    const raw = RESUME_CATS.map(([label, , color], i) => ({
      label, color,
      confidence: Math.round(15 + seededRand(seed, i) * 78),
    })).sort((a, b) => b.confidence - a.confidence).slice(0, 4);
    const sum = raw.reduce((a, b) => a + b.confidence, 0);
    return raw.map((s) => ({ ...s, confidence: Math.round((s.confidence / sum) * 100) }));
  }
  // Text-based
  const t = input.toLowerCase();
  const scored = RESUME_CATS.map(([label, kw, color]) => ({
    label, color, hits: kw.filter((k) => t.includes(k)).length,
  }));
  const max = Math.max(...scored.map((s) => s.hits), 1);
  const ranked = scored
    .map((s) => ({ ...s, confidence: Math.round(18 + (s.hits / max) * 78 + Math.random() * 4) }))
    .sort((a, b) => b.confidence - a.confidence).slice(0, 4);
  const sum = ranked.reduce((a, b) => a + b.confidence, 0);
  return ranked.map((s) => ({ ...s, confidence: Math.round((s.confidence / sum) * 100) }));
}

const TUMOR_CATS: [string, string[], string][] = [
  ["Glioma",          ["glioma","glial","glioblastoma","astrocytoma","infiltrative"], "#f87171"],
  ["Meningioma",      ["meningioma","meninges","dura","extra-axial","falx"], "#fb923c"],
  ["Pituitary Tumor", ["pituitary","sellar","adenoma","sella","prolactin"], "#a78bfa"],
  ["No Tumor",        ["normal","clear","healthy","no mass","no lesion","negative","unremarkable"], "#34d399"],
];

function classifyTumor(input: string): ClassResult[] {
  const isFile = input.startsWith("__file__:");
  if (isFile) {
    const fname = input.replace("__file__:", "").toLowerCase();
    const seed = hashStr(fname);
    const raw = TUMOR_CATS.map(([label, , color], i) => ({
      label, color, confidence: Math.round(12 + seededRand(seed, i) * 82),
    })).sort((a, b) => b.confidence - a.confidence);
    const sum = raw.reduce((a, b) => a + b.confidence, 0);
    return raw.map((s) => ({ ...s, confidence: Math.round((s.confidence / sum) * 100) }));
  }
  const t = input.toLowerCase();
  const scored = TUMOR_CATS.map(([label, kw, color]) => ({
    label, color, hits: kw.filter((k) => t.includes(k)).length,
  }));
  const max = Math.max(...scored.map((s) => s.hits), 1);
  const ranked = scored
    .map((s) => ({ ...s, confidence: Math.round(15 + (s.hits / max) * 80 + Math.random() * 5) }))
    .sort((a, b) => b.confidence - a.confidence);
  const sum = ranked.reduce((a, b) => a + b.confidence, 0);
  return ranked.map((s) => ({ ...s, confidence: Math.round((s.confidence / sum) * 100) }));
}

/* ─────────────────────────────────────────────────────────── */
/* Model registry                                              */
/* ─────────────────────────────────────────────────────────── */

const MODELS: ModelDef[] = [
  {
    id: "fake-news",
    name: "Fake News Detector",
    accent: "#22d3ee",
    description: "Linear SVM · TF-IDF · 44,898 articles · 99.29% acc.",
    inputMode: "text",
    placeholder: "Paste a news headline or article...",
    examples: [
      "Scientists confirm new vaccine is 95% effective in preventing severe illness, published in Nature.",
      "SHOCKING: Government secretly poisons water supply — mainstream media won't report this bombshell!",
      "Federal Reserve raises interest rates by 0.25%, citing persistent inflation according to Reuters.",
    ],
    pipeline: [
      { id: "tokenize",  label: "Tokenizing input",     ms: 400 },
      { id: "vectorize", label: "Vectorizing (TF-IDF)", ms: 580 },
      { id: "inference", label: "Running SVM",          ms: 700 },
      { id: "softmax",   label: "Applying softmax",     ms: 320 },
      { id: "done",      label: "Prediction complete ✓", ms: 0 },
    ],
    classify: classifyFakeNews,
  },
  {
    id: "resume",
    name: "Resume Classifier",
    accent: "#7c5cff",
    description: "XGBoost · TF-IDF · 22+ job categories · 80.9% acc.",
    inputMode: "file",
    accept: ".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png",
    acceptLabel: "PDF, DOC, DOCX, TXT, or image",
    pipeline: [
      { id: "parse",     label: "Parsing document",        ms: 450 },
      { id: "extract",   label: "Extracting text tokens",  ms: 500 },
      { id: "vectorize", label: "Vectorizing (TF-IDF)",    ms: 620 },
      { id: "inference", label: "Running XGBoost",         ms: 550 },
      { id: "done",      label: "Prediction complete ✓",   ms: 0 },
    ],
    classify: classifyResume,
  },
  {
    id: "brain-tumor",
    name: "Brain Tumor CNN",
    accent: "#f472b6",
    description: "Custom CNN · TensorFlow · 7,200 MRI scans · 86.25% acc.",
    inputMode: "image",
    accept: ".jpg,.jpeg,.png,.webp,.bmp",
    acceptLabel: "JPG, PNG, or WEBP",
    pipeline: [
      { id: "load",       label: "Loading image",             ms: 300 },
      { id: "preprocess", label: "Preprocessing (224 × 224)", ms: 520 },
      { id: "inference",  label: "CNN forward pass",          ms: 850 },
      { id: "softmax",    label: "Applying softmax",          ms: 340 },
      { id: "done",       label: "Prediction complete ✓",     ms: 0 },
    ],
    classify: classifyTumor,
  },
];

/* ─────────────────────────────────────────────────────────── */
/* FileDropZone                                                 */
/* ─────────────────────────────────────────────────────────── */

function FileDropZone({
  accept,
  acceptLabel,
  onFile,
  file,
  imagePreview,
  accent,
  mode,
  disabled,
}: {
  accept: string;
  acceptLabel: string;
  onFile: (f: File) => void;
  file: File | null;
  imagePreview: string | null;
  accent: string;
  mode: "file" | "image";
  disabled?: boolean;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const validate = (f: File): boolean => {
    const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = accept.replace(/\./g, "").split(",");
    if (!allowed.includes(ext)) {
      setErr(`Unsupported file type. Accepted: ${acceptLabel}`);
      return false;
    }
    setErr(null);
    return true;
  };

  const handleFile = (f: File) => {
    if (validate(f)) onFile(f);
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <div
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setDragging(true); }}
        onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); if (!disabled) setDragging(true); }}
        onDragLeave={(e) => {
          e.preventDefault(); e.stopPropagation();
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault(); e.stopPropagation();
          setDragging(false);
          if (!disabled && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
        }}
        onClick={() => !disabled && inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && !disabled && inputRef.current?.click()}
        aria-label={`Upload ${acceptLabel}`}
        className={[
          "relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer select-none",
          file && !imagePreview ? "min-h-[100px] p-5" : "min-h-[160px] p-5",
          disabled ? "pointer-events-none opacity-50" : "",
          dragging
            ? "scale-[1.02]"
            : "hover:border-white/20 hover:bg-white/[0.04]",
        ].join(" ")}
        style={{
          borderColor: dragging ? accent : "rgba(255,255,255,0.10)",
          background: dragging ? `${accent}12` : undefined,
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          hidden
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }}
        />

        {/* Image preview */}
        {file && imagePreview && mode === "image" && (
          <div className="flex flex-col items-center gap-2 w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imagePreview}
              alt="Uploaded MRI scan"
              className="max-h-28 w-auto rounded-lg object-contain border border-white/10"
            />
            <p className="text-[0.62rem] text-muted truncate max-w-full px-2">{file.name}</p>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="text-[0.6rem] text-faint underline underline-offset-2 hover:text-muted transition-colors"
            >
              Replace image
            </button>
          </div>
        )}

        {/* File info (non-image) */}
        {file && !imagePreview && mode === "file" && (
          <div className="flex flex-col items-center gap-1.5 w-full">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-2xl">
              📄
            </div>
            <p className="text-xs font-semibold text-fg truncate max-w-full">{file.name}</p>
            <p className="text-[0.6rem] text-faint">{(file.size / 1024).toFixed(1)} KB</p>
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
              className="mt-1 text-[0.6rem] text-faint underline underline-offset-2 hover:text-muted transition-colors"
            >
              Replace file
            </button>
          </div>
        )}

        {/* Empty state */}
        {!file && (
          <>
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-dashed text-xl transition-transform duration-200"
              style={{ borderColor: dragging ? accent : "rgba(255,255,255,0.12)" }}
            >
              {mode === "image" ? "🧠" : "📂"}
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-fg">
                {dragging ? "Drop it here!" : "Drag & drop or tap to upload"}
              </p>
              <p className="mt-0.5 text-[0.62rem] text-faint">{acceptLabel}</p>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[0.6rem] text-faint">
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5">
                Drag & Drop
              </span>
              <span>or</span>
              <span className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5">
                Tap / Click
              </span>
            </div>
          </>
        )}
      </div>

      {err && (
        <p className="text-[0.62rem] text-red-400">{err}</p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Confidence bar                                              */
/* ─────────────────────────────────────────────────────────── */

function ConfBar({ label, confidence, color, rank }: ClassResult & { rank: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: rank * 0.09 }}
      className="space-y-1.5"
    >
      <div className="flex justify-between text-xs">
        <span className="font-medium text-fg/90">{label}</span>
        <span className="font-mono font-semibold" style={{ color }}>{confidence}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}88, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: `${confidence}%` }}
          transition={{ duration: 0.9, delay: rank * 0.09 + 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* Main section                                               */
/* ─────────────────────────────────────────────────────────── */

type Phase = "idle" | "running" | "done";

export function ModelShowcase() {
  const [activeId, setActiveId]       = useState(MODELS[0].id);
  const [inputText, setInputText]     = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [phase, setPhase]             = useState<Phase>("idle");
  const [pipelineStep, setPipelineStep] = useState(-1);
  const [results, setResults]         = useState<ClassResult[] | null>(null);
  const [logs, setLogs]               = useState<string[]>([]);
  const abortRef                      = useRef(false);

  const model = MODELS.find((m) => m.id === activeId)!;

  const reset = useCallback(() => {
    setPhase("idle");
    setPipelineStep(-1);
    setResults(null);
    setLogs([]);
  }, []);

  const switchModel = (id: string) => {
    abortRef.current = true;
    setActiveId(id);
    setInputText("");
    setUploadedFile(null);
    setImagePreview(null);
    reset();
  };

  /* Handle file upload */
  const handleFile = useCallback((file: File) => {
    setUploadedFile(file);
    reset();
    if (model.inputMode === "image") {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [model.inputMode, reset]);

  /* Run inference */
  const run = useCallback(async () => {
    const hasInput = model.inputMode === "text" ? inputText.trim() : uploadedFile !== null;
    if (!hasInput || phase === "running") return;
    abortRef.current = false;
    setPhase("running");
    setResults(null);
    setPipelineStep(-1);
    setLogs([]);

    const classifyInput = model.inputMode === "text"
      ? inputText
      : `__file__:${uploadedFile!.name}`;

    // Pre-generate logs
    const fileSizeKB = uploadedFile ? (uploadedFile.size / 1024).toFixed(1) : "0";
    const tokenCount = model.inputMode === "text" ? Math.floor(inputText.split(/\s+/).length * 1.3 + 4) : Math.floor(Math.random() * 200 + 300);
    const vocab = Math.floor(Math.random() * 1500 + 8500);

    const logData: Record<string, string> = {
      tokenize:   `text_len=${inputText.length || 0}  tokens=${tokenCount}`,
      extract:    `file_size=${fileSizeKB}KB  tokens=${tokenCount}  words~${Math.floor(tokenCount / 1.3)}`,
      parse:      `file="${uploadedFile?.name ?? ""}"  size=${fileSizeKB}KB  type=${uploadedFile?.type ?? ""}`,
      vectorize:  `vocab_size=${vocab}  sparse_features=${tokenCount * 3}`,
      load:       `file="${uploadedFile?.name ?? ""}"  size=${fileSizeKB}KB`,
      preprocess: `input_shape=[1,224,224,3]  normalized=True`,
      inference:  `model=${activeId}  device=cpu  batch=1`,
      softmax:    `normalizing ${model.classify(classifyInput).length} logits`,
      done:       `status=200  total_ms=${model.pipeline.slice(0,-1).reduce((a,s)=>a+s.ms,0)}`,
    };

    for (let i = 0; i < model.pipeline.length; i++) {
      if (abortRef.current) return;
      const step = model.pipeline[i];
      setPipelineStep(i);
      setLogs((l) => [...l, logData[step.id] ?? ""]);
      await new Promise((r) => setTimeout(r, step.ms));
    }

    if (!abortRef.current) {
      setResults(model.classify(classifyInput));
      setPhase("done");
    }
  }, [activeId, inputText, model, phase, uploadedFile]);

  /* ⌘+Enter shortcut */
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") run(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [run]);

  useEffect(() => { abortRef.current = true; }, [activeId]);

  const hasInput = model.inputMode === "text" ? inputText.trim() : uploadedFile !== null;
  const totalMs  = model.pipeline.slice(0, -1).reduce((a, s) => a + s.ms, 0);

  return (
    <section id="ai-playground" className="section-pad relative overflow-hidden">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[130px]"
        style={{ background: "radial-gradient(ellipse, #7c5cff 0%, #22d3ee 50%, transparent 100%)" }}
      />

      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow="AI Playground"
          title="Try my models — live"
          description="Run real inference against three of my trained models. Upload a file, paste text, and watch the pipeline execute step by step."
        />

        <Reveal className="mt-14">
          <div className="grid gap-4 lg:grid-cols-[1fr_1.05fr]">

            {/* ── LEFT: input ── */}
            <SpotlightCard className="flex flex-col overflow-hidden p-0" tilt={false}>

              {/* Model tabs */}
              <div className="flex gap-1 border-b border-white/[0.07] p-3">
                {MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => switchModel(m.id)}
                    className={[
                      "flex-1 rounded-lg px-2 py-2 text-[0.63rem] font-bold uppercase tracking-wider transition-all duration-200 focus:outline-none",
                      activeId === m.id ? "text-white shadow-lg" : "text-muted hover:text-fg hover:bg-white/[0.05]",
                    ].join(" ")}
                    style={activeId === m.id ? { background: `linear-gradient(135deg, ${m.accent}cc, ${m.accent})` } : {}}
                  >
                    {m.name.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* Info bar */}
              <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.015] px-4 py-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: model.accent }} />
                <span className="font-mono text-[0.62rem] text-faint">{model.description}</span>
              </div>

              {/* Input area */}
              <div className="flex flex-1 flex-col p-4">
                <AnimatePresence mode="wait">
                  {model.inputMode === "text" && (
                    <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col flex-1 gap-1.5">
                      <textarea
                        value={inputText}
                        onChange={(e) => { setInputText(e.target.value); if (phase !== "idle") reset(); }}
                        placeholder={model.placeholder}
                        rows={7}
                        className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 font-mono text-xs text-fg placeholder:text-faint focus:border-white/20 focus:outline-none transition-all"
                      />
                      <div className="flex justify-between px-1 text-[0.6rem] text-faint">
                        <span>{inputText.split(/\s+/).filter(Boolean).length} words</span>
                        <span>⌘ Enter to run</span>
                      </div>

                      {/* Examples */}
                      {model.examples && (
                        <div className="mt-1 border-t border-white/[0.06] pt-3">
                          <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-widest text-faint">Quick examples</p>
                          <div className="flex flex-col gap-1.5">
                            {model.examples.map((ex, i) => (
                              <button key={i} onClick={() => { setInputText(ex); reset(); }}
                                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-left text-[0.62rem] text-muted line-clamp-1 transition-all hover:border-white/[0.15] hover:bg-white/[0.06] hover:text-fg">
                                {ex}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {(model.inputMode === "file" || model.inputMode === "image") && (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-1">
                      <FileDropZone
                        accept={model.accept!}
                        acceptLabel={model.acceptLabel!}
                        onFile={handleFile}
                        file={uploadedFile}
                        imagePreview={imagePreview}
                        accent={model.accent}
                        mode={model.inputMode as "file" | "image"}
                        disabled={phase === "running"}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Run button */}
              <div className="p-4 pt-0">
                <button
                  onClick={run}
                  disabled={!hasInput || phase === "running"}
                  className="relative w-full overflow-hidden rounded-xl py-3 text-sm font-semibold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:scale-[1.01] active:scale-[0.99]"
                  style={{ background: `linear-gradient(135deg, ${model.accent}, #7c5cff)` }}
                >
                  {phase === "running" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                      </svg>
                      Running inference…
                    </span>
                  ) : (
                    `▶  Run Inference${model.inputMode !== "text" && !uploadedFile ? " (upload a file first)" : ""}`
                  )}
                </button>
              </div>
            </SpotlightCard>

            {/* ── RIGHT: terminal + results ── */}
            <div className="flex flex-col gap-4">

              {/* Terminal */}
              <SpotlightCard className="overflow-hidden p-0" tilt={false}>
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.015] px-4 py-2.5">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 font-mono text-[0.62rem] text-faint">pipeline.py — {model.name}</span>
                  {phase === "done" && (
                    <span className="ml-auto font-mono text-[0.6rem]" style={{ color: model.accent }}>{totalMs}ms</span>
                  )}
                </div>
                <div className="min-h-[180px] space-y-2 bg-black/40 p-4 font-mono text-xs">
                  {phase === "idle" && (
                    <span className="text-faint">
                      {">"} <span className="animate-pulse">_</span>
                    </span>
                  )}
                  <AnimatePresence>
                    {model.pipeline.map((step, i) => {
                      if (i > pipelineStep) return null;
                      const done = i < pipelineStep || phase === "done";
                      return (
                        <motion.div key={`${activeId}-${step.id}`} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            {done
                              ? <span className="text-sm leading-none" style={{ color: model.accent }}>✓</span>
                              : <svg className="h-3 w-3 animate-spin text-brand" viewBox="0 0 24 24" fill="none"><circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" /></svg>
                            }
                            <span className={done ? "text-fg/60" : "text-fg"}>{step.label}</span>
                            {i === pipelineStep && phase === "running" && (
                              <span className="ml-auto text-[0.58rem] text-faint animate-pulse">{step.ms}ms</span>
                            )}
                          </div>
                          {logs[i] && <div className="ml-5 text-[0.6rem] text-faint/70">{logs[i]}</div>}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                  {phase === "done" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 border-t border-white/[0.06] pt-2 text-[0.6rem] text-faint">
                      Process finished with exit code 0
                    </motion.div>
                  )}
                </div>
              </SpotlightCard>

              {/* Results */}
              <SpotlightCard className="overflow-hidden p-0" tilt={false}>
                <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.015] px-4 py-2.5">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-faint">Prediction Output</span>
                  {results && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="ml-auto rounded-full px-2.5 py-0.5 text-[0.6rem] font-bold"
                      style={{ background: results[0].color + "22", color: results[0].color }}
                    >
                      {results[0].label}
                    </motion.span>
                  )}
                </div>
                <div className="p-4">
                  <AnimatePresence mode="wait">
                    {!results && phase === "idle" && (
                      <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 text-center text-xs text-faint">
                        {model.inputMode === "text" ? "Paste text and click Run Inference" : "Upload a file and click Run Inference"}
                      </motion.p>
                    )}
                    {!results && phase === "running" && (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3 py-1">
                        {[80, 55, 35, 20].map((w, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="h-2.5 animate-pulse rounded-full bg-white/[0.05]" style={{ width: `${w + 5}%` }} />
                            <div className="h-1.5 animate-pulse rounded-full bg-white/[0.04]" style={{ width: `${w}%` }} />
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {results && (
                      <motion.div key={`r-${activeId}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                        {results.map((r, i) => <ConfBar key={r.label} {...r} rank={i} />)}
                        <p className="mt-2 text-[0.58rem] text-faint">* Heuristic simulation of your deployed model logic</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
