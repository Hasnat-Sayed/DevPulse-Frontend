import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, statusMeta, typeMeta } from "@/lib/format";
import type { Issue } from "@/types";
import { cn } from "cn";

interface IssueCardProps {
  issue: Issue;
}

export function IssueCard({ issue }: IssueCardProps) {
  const currentType = typeMeta[issue.type];
  const currentStatus = statusMeta[issue.status];
  const TypeIcon = currentType?.icon;

  return (
    <div className="group h-full flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105",
              currentType?.bgClass
            )}
            title={currentType?.label}
          >
            {TypeIcon && <TypeIcon className="size-4.5" />}
          </div>
          <Badge
            variant="outline"
            className={cn("capitalize font-medium text-xs px-2.5 py-0.5", currentStatus?.badgeClass)}
          >
            {currentStatus?.label ?? issue.status}
          </Badge>
        </div>

        <div className="space-y-1.5">
          <h3
            className="font-semibold text-foreground text-base tracking-tight line-clamp-1 group-hover:text-primary transition-colors"
            title={issue.title}
          >
            {issue.title}
          </h3>
          <p
            className="text-sm text-muted-foreground line-clamp-2 leading-relaxed"
            title={issue.description}
          >
            {issue.description}
          </p>
        </div>
      </div>

      <div className="pt-5 mt-4 border-t border-border/60 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="truncate max-w-[130px] font-medium text-foreground/80">
            {issue.reporter?.name || "Unknown"}
          </span>
          <span>{formatDate(issue.created_at)}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          nativeButton={false}
          render={<Link href={`/items/${issue.id}`} />}
        >
          View Details
        </Button>
      </div>
    </div>
  );
}

export function IssueCardSkeleton() {
  return (
    <div className="h-full flex flex-col justify-between rounded-xl border border-border bg-card p-5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="size-9 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>

      <div className="pt-5 mt-4 border-t border-border/60 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-8 w-full rounded-lg" />
      </div>
    </div>
  );
}
