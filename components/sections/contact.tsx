"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Linkedin, Github, Trophy, Boxes, Twitter, Send, Check, Loader2, AlertCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { contactChannels } from "@/lib/data";
import { siteConfig } from "@/lib/site";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Mail,
  Linkedin,
  Github,
  Trophy,
  Boxes,
  Twitter,
};

type Status = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const next: Record<string, string> = {};
    const name = (form.get("name") as string)?.trim();
    const email = (form.get("email") as string)?.trim();
    const message = (form.get("message") as string)?.trim();
    if (!name || name.length < 2) next.name = "Please enter your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (!message || message.length < 10) next.message = "Tell me a bit more (10+ chars).";
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-brand/15 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          description="I'm actively looking for AI/ML internships and research opportunities. Whether it's a role, a collaboration, or a question — my inbox is open."
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* channels */}
          <div className="grid gap-3">
            {contactChannels.map((c, i) => {
              const Icon = ICONS[c.icon] ?? Mail;
              return (
                <Reveal key={c.label} delay={i * 0.05}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition-all hover:border-brand/40 hover:bg-white/[0.04]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand/20 to-brand-2/10 text-brand-2">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-fg">{c.label}</div>
                      <div className="truncate text-xs text-muted">{c.value}</div>
                    </div>
                  </a>
                </Reveal>
              );
            })}
          </div>

          {/* form */}
          <Reveal>
            <SpotlightCard className="p-6 sm:p-8" tilt={false}>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[340px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 12 }}
                      className="grid h-16 w-16 place-items-center rounded-full bg-emerald-400/15 text-emerald-300"
                    >
                      <Check className="h-8 w-8" />
                    </motion.span>
                    <h3 className="mt-5 text-xl font-semibold text-fg">Message sent!</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted">
                      Thanks for reaching out — I'll get back to you soon. Meanwhile, feel free to
                      connect on LinkedIn.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm text-brand-2 hover:text-fg"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                    noValidate
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field name="name" label="Name" placeholder="Ada Lovelace" error={errors.name} />
                      <Field
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="you@company.com"
                        error={errors.email}
                      />
                    </div>
                    <Field name="company" label="Company / Org (optional)" placeholder="Acme AI" />
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell me about the role or opportunity…"
                        className="w-full resize-none rounded-xl border border-white/10 bg-bg/60 p-3.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand/50"
                      />
                      {errors.message && <FieldError msg={errors.message} />}
                    </div>

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-3 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/40 transition-all hover:brightness-110 disabled:opacity-60"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" /> Send message
                        </>
                      )}
                    </button>

                    {status === "error" && (
                      <p className="flex items-center justify-center gap-2 text-sm text-rose-400">
                        <AlertCircle className="h-4 w-4" /> Something went wrong. Email me directly at{" "}
                        <a href={`mailto:${siteConfig.email}`} className="underline">
                          {siteConfig.email}
                        </a>
                      </p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </SpotlightCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-bg/60 px-3.5 py-2.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand/50"
      />
      {error && <FieldError msg={error} />}
    </div>
  );
}

function FieldError({ msg }: { msg: string }) {
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-rose-400">
      <AlertCircle className="h-3 w-3" /> {msg}
    </p>
  );
}
