import { CheckCircle2, FileEdit, UserPlus } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const steps = [
  {
    step: "01",
    title: "Sign up",
    description: "Create an account in seconds with custom role assignment for your team.",
    icon: UserPlus,
  },
  {
    step: "02",
    title: "Report an issue",
    description: "Log bugs with technical descriptions or pitch ambitious feature requests.",
    icon: FileEdit,
  },
  {
    step: "03",
    title: "Track to resolution",
    description: "Collaborate, update lifecycle statuses, and celebrate resolving issues together.",
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              How DevPulse works
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Three streamlined steps from discovering a bug to deploying a clean fix.
            </p>
          </Reveal>
        </div>

        <div className="relative">
          {/* Dashed connector line visible on md and up */}
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 border-t-2 border-dashed border-border/80 -z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.step} delay={150 * (index + 1)}>
                  <div className="flex flex-col items-center text-center p-6 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                    <div className="relative mb-6">
                      <div className="size-16 rounded-2xl bg-secondary/70 border border-border flex items-center justify-center text-primary shadow-inner">
                        <Icon className="size-8 text-primary" />
                      </div>
                      <span className="absolute -top-2 -right-2 size-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
