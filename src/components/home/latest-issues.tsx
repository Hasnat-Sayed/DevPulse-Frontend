"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  AlertCircle,
  RefreshCw,
  PlusCircle,
  Inbox,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IssueCard, IssueCardSkeleton } from "@/components/issues/issue-card";
import { Reveal } from "@/components/common/reveal";
import { getIssues } from "@/lib/issues-api";
import type { Issue } from "@/types";

export function LatestIssues() {
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const fetchLatestIssues = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getIssues({ sort: "newest" });
      const items = response.data || [];
      setIssues(items.slice(0, 6));
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load latest issues";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    fetchLatestIssues();
  }, [fetchLatestIssues]);
  /* eslint-enable react-hooks/set-state-in-effect */

  return (
    <section className="py-16 md:py-24 border-t border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <Reveal>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Latest Issues
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="text-base text-muted-foreground">
                Recent bugs and feature requests submitted by the community.
              </p>
            </Reveal>
          </div>
          <Reveal delay={150}>
            <Button
              variant="outline"
              className="hidden sm:inline-flex group self-start"
              nativeButton={false}
              render={<Link href="/items" />}
            >
              View all issues
              <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Reveal>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <IssueCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-8 text-center space-y-4">
            <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
              <AlertCircle className="size-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                Unable to load issues
              </h3>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchLatestIssues}
              className="gap-2"
            >
              <RefreshCw className="size-3.5" />
              Try again
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && issues.length === 0 && (
          <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4">
            <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Inbox className="size-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-foreground">
                No issues yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Be the first to report a bug or request a feature.
              </p>
            </div>
            <Button
              nativeButton={false}
              render={<Link href="/items/add" />}
              className="gap-2"
            >
              <PlusCircle className="size-4" />
              Report an Issue
            </Button>
          </div>
        )}

        {/* Success Grid */}
        {!loading && !error && issues.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {issues.map((issue, index) => (
                <Reveal key={issue.id} delay={100 * (index + 1)}>
                  <IssueCard issue={issue} />
                </Reveal>
              ))}
            </div>

            <div className="mt-12 text-center sm:hidden">
              <Button
                variant="outline"
                className="w-full group"
                nativeButton={false}
                render={<Link href="/items" />}
              >
                View all issues
                <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
