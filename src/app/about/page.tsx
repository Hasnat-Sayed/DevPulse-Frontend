import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Lock, PenLine, ShieldCheck, Sparkles, Users, Workflow } from "lucide-react";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiJsonwebtokens,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";

export const metadata: Metadata = {
  title: "About | DevPulse",
  description: "Learn what DevPulse is, who it is for, and how it works.",
};

const POINTS = [
  { icon: Users, title: "Clear ownership", text: "Every issue shows who reported it and when." },
  { icon: Workflow, title: "Visible progress", text: "Open, in progress, resolved: the status is always one glance away." },
  { icon: Lock, title: "Simple permissions", text: "Two roles keep editing and deleting under control." },
];

const ROLES = [
  {
    icon: PenLine,
    name: "Contributor",
    blurb: "Anyone on the team who finds problems and shares ideas.",
    perks: [
      "Register and log in",
      "Report bugs and feature requests",
      "Browse and search every issue",
      "Edit your own issues while they are open",
    ],
  },
  {
    icon: ShieldCheck,
    name: "Maintainer",
    blurb: "Keeps the backlog healthy and moves work forward.",
    perks: [
      "Everything a contributor can do",
      "Edit any issue",
      "Change the workflow status",
      "Delete issues",
    ],
  },
];

const STACK = [
  { name: "Next.js",      icon: SiNextdotjs,      color: "#ffffff" },
  { name: "TypeScript",   icon: SiTypescript,     color: "#3178C6" },
  { name: "Tailwind CSS", icon: SiTailwindcss,    color: "#06B6D4" },
  { name: "shadcn/ui",    icon: SiShadcnui,       color: "#ffffff" },
  { name: "Node.js",      icon: SiNodedotjs,      color: "#5FA04E" },
  { name: "Express",      icon: SiExpress,        color: "#ffffff" },
  { name: "PostgreSQL",   icon: SiPostgresql,     color: "#4169E1" },
  { name: "JWT",          icon: SiJsonwebtokens,  color: "#FB015B" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-20 px-4 py-16 sm:px-6 md:space-y-28 md:py-24 lg:px-8">
      {/* Intro */}
      <Reveal>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" /> About DevPulse
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Built for teams that ship
          </h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            DevPulse is an internal issue and feature tracker. Teams report bugs, suggest
            improvements, and coordinate fixes in one clear place, with no noise.
          </p>
        </div>
      </Reveal>

      {/* Image + why */}
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40">
            <Image
              src="/images/aaa.webp"
              alt="Laptop showing source code on screen in a dark room"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-xl border border-border/80 bg-card/90 px-3.5 py-2 backdrop-blur-md">
              <span className="size-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-foreground">Bugs and features, one place</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Why DevPulse</h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Scattered messages and spreadsheets hide problems. DevPulse gives every issue a
              home, an owner and a status, so nothing falls through the cracks.
            </p>
            <ul className="mt-8 space-y-5">
              {POINTS.map((p) => (
                <li key={p.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <p.icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{p.title}</h3>
                    <p className="text-sm leading-6 text-muted-foreground">{p.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Roles */}
      <div>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Two roles, clear permissions</h2>
            <p className="mt-3 text-muted-foreground">Pick the role that fits when you register.</p>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ROLES.map((role, i) => (
            <Reveal key={role.name} delay={i * 120} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <role.icon className="size-6" />
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">{role.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{role.blurb}</p>
                <ul className="mt-6 space-y-3">
                  {role.perks.map((perk) => (
                    <li key={perk} className="flex items-start gap-3 text-sm text-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Stack + CTA */}
      <Reveal>
        <div className="relative isolate overflow-hidden rounded-2xl border border-primary/20 bg-linear-to-br from-primary/20 via-card/70 to-primary/10 p-8 text-center md:p-12">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 -z-10 size-64 rounded-full bg-primary/25 blur-3xl" />
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">Built with modern tools</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {STACK.map((item) => (
              <span
                key={item.name}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-4 py-1.5 text-base text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
              >
                <item.icon style={{ color: item.color }} className="size-5 shrink-0" />
                {item.name}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button nativeButton={false} render={<Link href="/items" />}>
              Browse Issues <ArrowRight className="size-4" />
            </Button>
            <Button variant="outline" nativeButton={false} render={<Link href="/items/add" />}>
              Report an Issue
            </Button>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
