/* eslint-disable @next/next/no-img-element */
import { Github, GitFork, Star, GitCommit, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const user = siteConfig.githubUsername;

// github-readme-stats themed to match the site (no API key, generated server-side by their service).
const statCardUrl = `https://github-readme-stats.vercel.app/api?username=${user}&show_icons=true&hide_border=true&bg_color=00000000&title_color=a78bfa&icon_color=22d3ee&text_color=9aa3b8&hide_title=true`;
const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=${user}&hide_border=true&background=00000000&stroke=1c1f2e&ring=7c5cff&fire=f472b6&currStreakLabel=a78bfa&sideLabels=9aa3b8&dates=5b6378&currStreakNum=e9ecf5&sideNums=e9ecf5`;
const langUrl = `https://github-readme-stats.vercel.app/api/top-langs/?username=${user}&layout=compact&hide_border=true&bg_color=00000000&title_color=a78bfa&text_color=9aa3b8`;
const chartUrl = `https://ghchart.rshah.org/7c5cff/${user}`;

const quickStats = [
  { icon: GitCommit, label: "Contributions", value: "1,500+" },
  { icon: Github, label: "Repositories", value: "15+" },
  { icon: Star, label: "Languages", value: "6+" },
  { icon: GitFork, label: "Problems Solved", value: "50+" },
];

export function OpenSource() {
  return (
    <section id="opensource" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Open Source"
          title="I build in public"
          description="A snapshot of my GitHub activity — contributions, top languages, and streaks. Code is the resume that can't be faked."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-4">
          {quickStats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <SpotlightCard className="p-5" tilt={false}>
                <s.icon className="h-5 w-5 text-brand-2" />
                <div className="mt-3 text-2xl font-semibold text-gradient-brand">{s.value}</div>
                <div className="text-xs text-muted">{s.label}</div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-6">
          <SpotlightCard className="p-6" tilt={false}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-fg">Contribution graph</h3>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-brand-2 hover:text-fg"
              >
                @{user} <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <img
              src={chartUrl}
              alt={`${user} GitHub contribution chart`}
              className="w-full opacity-90"
              loading="lazy"
            />
          </SpotlightCard>
        </Reveal>

        <div className="mt-6 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <SpotlightCard className="flex items-center justify-center p-6" tilt={false}>
              <img src={statCardUrl} alt={`${user} GitHub stats`} className="w-full" loading="lazy" />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.06}>
            <SpotlightCard className="flex items-center justify-center p-6" tilt={false}>
              <img src={streakUrl} alt={`${user} GitHub streak`} className="w-full" loading="lazy" />
            </SpotlightCard>
          </Reveal>
          <Reveal delay={0.12}>
            <SpotlightCard className="flex items-center justify-center p-6" tilt={false}>
              <img src={langUrl} alt={`${user} top languages`} className="w-full" loading="lazy" />
            </SpotlightCard>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button href={siteConfig.links.github} external variant="outline" size="lg">
            <Github className="h-4 w-4" /> Explore my GitHub
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
