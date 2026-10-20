import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IssueStatus } from "@/types";

const STEPS: { key: IssueStatus; label: string }[] = [
  { key: "open", label: "Open" },
  { key: "in_progress", label: "In Progress" },
  { key: "resolved", label: "Resolved" },
];

export function IssueProgress({ status }: { status: IssueStatus }) {
  const current = STEPS.findIndex((s) => s.key === status);
  const resolved = status === "resolved";

  return (
    <ol className="grid grid-cols-3" aria-label="Issue progress">
      {STEPS.map((step, i) => {
        const done = i < current || resolved;
        const active = i === current && !resolved;
        return (
          <li
            key={step.key}
            aria-current={i === current ? "step" : undefined}
            className="relative flex flex-col items-center gap-2 text-center"
          >
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "absolute top-[21px] left-[calc(50%_+_28px)] right-[calc(-50%_+_28px)] h-0.5 rounded-full",
                  i < current ? "bg-primary" : "bg-border"
                )}
              />
            )}
            <span
              className={cn(
                "relative z-10 flex size-11 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                done && "border-primary bg-primary text-primary-foreground",
                active && "border-primary bg-primary/15 text-primary",
                !done && !active && "border-border bg-muted text-muted-foreground"
              )}
            >
              {done ? (
                <Check className="size-5" />
              ) : active ? (
                <span className="size-3 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
              ) : (
                i + 1
              )}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                done || active ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}