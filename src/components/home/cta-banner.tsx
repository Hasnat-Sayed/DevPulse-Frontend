"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/common/reveal";
import { useAuth } from "@/context/auth-context";

export function CtaBanner() {
  const { user } = useAuth();

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/30 via-card to-blue-500/25 p-8 text-center shadow-2xl shadow-primary/10 sm:p-12 md:p-16">
            {/* Soft decorative background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -top-24 -z-10 size-72 rounded-full bg-primary/30 blur-3xl"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-72 rounded-full bg-blue-500/25 blur-3xl"
            />

            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles className="size-3.5" />
                <span>Ready to streamline development?</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                Start tracking issues with precision today
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Join engineering teams shipping high quality software with
                structured issue workflows and clear accountability.
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
