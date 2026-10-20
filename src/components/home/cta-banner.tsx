"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { useAuth } from "@/context/auth-context";

export function CtaBanner() {
  const { user } = useAuth();

  return (
    <section className="py-16 md:py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-b from-card via-card/90 to-card/50 p-8 sm:p-12 md:p-16 text-center shadow-2xl shadow-primary/5">
            {/* Soft decorative background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
            >
              <div className="h-64 w-64 md:h-96 md:w-96 rounded-full bg-primary/15 blur-3xl" />
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" />
                <span>Ready to streamline development?</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Start tracking issues with precision today
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Join engineering teams shipping high quality software with structured issue workflows and clear accountability.
              </p>

              <div className="pt-2 flex flex-wrap justify-center items-center gap-4">
                {user ? (
                  <>
                    <Button
                      size="lg"
                      className="group font-medium px-6 shadow-md shadow-primary/20"
                      nativeButton={false}
                      render={<Link href="/items/add" />}
                    >
                      Report an Issue
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-medium px-6"
                      nativeButton={false}
                      render={<Link href="/items" />}
                    >
                      Browse All Issues
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
                      Get Started Now
                      <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-medium px-6"
                      nativeButton={false}
                      render={<Link href="/items" />}
                    >
                      Explore Issues
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
