import { Bug, CheckCircle2, Filter, KeyRound, ShieldCheck, Zap } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

const features = [
  {
    icon: Bug,
    title: "Report Bugs and Features",
    description: "Submit clear bug reports and high-impact feature requests with intuitive categorization.",
    color: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  },
  {
    icon: CheckCircle2,
    title: "Track Status",
    description: "Easily monitor lifecycle transitions across open, in-progress, and resolved stages.",
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Filter,
    title: "Filter and Search",
    description: "Instant search plus filters by type and status, with newest or oldest sorting.",
    color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description: "Distinguish capabilities between contributors and maintainers with strict permission boundaries.",
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    icon: KeyRound,
    title: "Secure Authentication",
    description: "Stateless JWT sign-in, with permissions checked on the server for every protected action.",
    color: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Zap,
    title: "Responsive and Fast",
    description: "Optimized Next.js architecture built for snappy interactions and fast loading speeds.",
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 border-y border-border/50 bg-card/30 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Engineered for developer productivity
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Everything your team needs to catch software issues, discuss technical implementations, and ship reliably.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={100 * (index + 1)}>
                <div className="group h-full p-6 rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
                  <div
                    className={`size-11 rounded-lg border flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105 ${feature.color}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
