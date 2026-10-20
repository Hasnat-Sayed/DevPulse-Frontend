"use client";

import Link from "next/link";
import { ArrowRight, Bug, Check, Lightbulb, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/common/reveal";
import { useAuth } from "@/context/auth-context";

export function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* Decorative background grid and blurred gradient blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px),linear-gradient(to_bottom,color-mix(in_oklab,var(--border)_45%,transparent)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
        />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[34rem] h-[34rem] rounded-full bg-primary/20 blur-3xl animate-pulse-glow" />
        <div className="absolute top-48 left-1/3 -translate-x-1/2 w-[26rem] h-[26rem] rounded-full bg-secondary/30 blur-3xl animate-pulse-glow [animation-delay:4s]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Headline and CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <Reveal delay={100}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5 text-primary" />
                <span>Issue tracking for engineering teams</span>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Track issues effortlessly,{" "}
                <span className="bg-gradient-to-r from-indigo-400 via-primary to-purple-400 bg-clip-text text-transparent">
                  ship faster
                </span>
              </h1>
            </Reveal>

            <Reveal delay={300}>
              <p className="text-lg text-muted-foreground sm:text-xl max-w-2xl leading-relaxed">
                A streamlined bug and feature tracker crafted for modern development teams to prioritize, collaborate, and resolve with velocity.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="flex flex-wrap items-center gap-4">
                {user ? (
                  <>
                    <Button
                      size="lg"
                      className="group font-medium px-6 shadow-md shadow-primary/20"
                      nativeButton={false}
                      render={<Link href="/items/add" />}
                    >
                      Report an Issue
                      <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-medium px-6"
                      nativeButton={false}
                      render={<Link href="/items" />}
                    >
                      Browse Issues
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      size="lg"
                      className="group font-medium px-6 shadow-md shadow-primary/20"
                      nativeButton={false}
                      render={<Link href="/register" />}
                    >
                      Get Started
                      <ArrowRight className="ml-1 size-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-medium px-6"
                      nativeButton={false}
                      render={<Link href="/items" />}
                    >
                      Browse Issues
                    </Button>
                  </>
                )}
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="pt-2 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-400 shrink-0" />
                  <span>Role-based access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-400 shrink-0" />
                  <span>Secure JWT login</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-400 shrink-0" />
                  <span>Bug and feature tracking</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Floating Mockup */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
            <Reveal delay={300} className="w-full max-w-md lg:max-w-none">
              <div className="relative">
                {/* Floating Mockup Card */}
                <div className="animate-float relative rounded-2xl border border-border/80 bg-card/90 backdrop-blur-md shadow-2xl p-4 sm:p-5">
                  {/* Window frame with 3 dots */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-4">
                    <div className="flex items-center gap-1.5">
                      <div className="size-2.5 rounded-full bg-rose-500/80" />
                      <div className="size-2.5 rounded-full bg-amber-500/80" />
                      <div className="size-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                      <Shield className="size-3 text-primary/70" />
                      devpulse.app/items
                    </div>
                    <div className="w-8" />
                  </div>

                  {/* Mock issue rows */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-7 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                          <Bug className="size-3.5" />
                        </div>
                        <span className="text-xs font-medium text-foreground truncate">
                          Fix auth cookie hydration race
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0 border-amber-500/30 bg-amber-500/10 text-amber-400 shrink-0"
                      >
                        In Progress
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-7 rounded-md bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
                          <Lightbulb className="size-3.5" />
                        </div>
                        <span className="text-xs font-medium text-foreground truncate">
                          Add Webhook notification support
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shrink-0"
                      >
                        Open
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/40 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="size-7 rounded-md bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0">
                          <Bug className="size-3.5" />
                        </div>
                        <span className="text-xs font-medium text-foreground truncate">
                          Memory leak in realtime socket
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0 border-indigo-500/30 bg-indigo-500/10 text-indigo-400 shrink-0"
                      >
                        Resolved
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Small floating "Resolved" chip overlapping corner */}
                <div className="animate-float [animation-delay:2s] absolute -bottom-4 -right-2 sm:-right-4 rounded-xl border border-border/80 bg-card/95 px-3.5 py-2 shadow-xl backdrop-blur-md flex items-center gap-2">
                  <div className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-foreground">Live Issue Tracking</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
