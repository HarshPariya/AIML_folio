import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { navItems } from "@/lib/data";
import { Logo } from "@/components/ui/logo";

const socials = [
  { icon: Github, href: siteConfig.links.github, label: "GitHub" },
  { icon: Linkedin, href: siteConfig.links.linkedin, label: "LinkedIn" },
  { icon: Twitter, href: siteConfig.links.twitter, label: "X / Twitter" },
  { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex" aria-label="Harsh Pariya — home">
              <Logo markSize={38} />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Aspiring AI/ML Engineer building intelligent systems — from research
              experiments to shipped products. Open to internships & research roles.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-muted transition-all hover:scale-105 hover:border-brand/40 hover:text-fg"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">Navigate</h3>
            <ul className="mt-4 space-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-fg">Get in touch</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-muted">
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-fg">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.location}</li>
              <li>
                <a
                  href={siteConfig.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-brand-2 transition-colors hover:text-fg"
                >
                  Download Résumé <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-faint sm:flex-row">
          <p>© {2026} Harsh Pariya. Built with Next.js, Tailwind & Framer Motion.</p>
          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {siteConfig.availability}
          </p>
        </div>
      </div>
    </footer>
  );
}
