"use client";

import { useState } from "react";

import { Mail, Linkedin, Github, Trophy, Boxes, Twitter, Instagram, Send, AlertCircle } from "lucide-react";
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
  Instagram,
};

export function Contact() {
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    const name = form.get("name") as string;
    const email = form.get("email") as string;
    const company = form.get("company") as string;
    const message = form.get("message") as string;

    const subject = encodeURIComponent(`Portfolio Contact: ${name}${company ? ` - ${company}` : ""}`);
    const body = encodeURIComponent(`${message}\n\n--\nName: ${name}\nEmail: ${email}\nCompany: ${company || "N/A"}`);

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
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
          description="Open to AI/ML internships and research roles. If you have a project, a role, or just want to talk ML - reach out."
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
              <form
                onSubmit={onSubmit}
                className="space-y-4"
                noValidate
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field name="name" label="Name" placeholder="Your Name" error={errors.name} />
                  <Field
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="you@company.com"
                    error={errors.email}
                  />
                </div>
                <Field name="company" label="Company / Org (optional)" placeholder="Company / Org Name" />
                <div>
                  <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What's on your mind? A role, a project, a collaboration..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-bg/60 p-3.5 text-sm text-fg outline-none transition-colors placeholder:text-faint focus:border-brand/50"
                  />
                  {errors.message && <FieldError msg={errors.message} />}
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand to-brand-3 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-brand/40 transition-all hover:brightness-110"
                >
                  <Send className="h-4 w-4" /> Open mail app
                </button>
              </form>
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
