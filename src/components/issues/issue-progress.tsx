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
    <ol className="flex items-start px-3" aria-label="Issue progress">
      {STEPS.map((step, i) => {
        const done = i < current || resolved;
        const active = i === current && !resolved;
        const isLast = i === STEPS.length - 1;
        return (
          <li
            key={step.key}
            aria-current={i === current ? "step" : undefined}
            className={cn("flex items-start", !isLast && "flex-1")}
          >
            <div className="flex w-11 shrink-0 flex-col items-center gap-2">
              <span
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                  done && "border-primary bg-primary text-primary-foreground",
                  active && "border-primary bg-primary/15 text-primary",
                  !done && !active && "border-border bg-muted text-muted-foreground"
                )}
              >
                {done ? (
                  <Check className="size-5" />
                ) : active ? (
                  <span className="size-3 animate-pulse rounded-full bg-primary motion-reduce:animate-none" />
                ) : (
                  i + 1
                )}
              </span>
              <span
                className={cn(
                  "whitespace-nowrap text-sm font-medium",
                  done || active ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <span
                aria-hidden
                className={cn(
                  "mx-2 mt-[21px] h-0.5 flex-1 rounded-full",
                  i < current ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}