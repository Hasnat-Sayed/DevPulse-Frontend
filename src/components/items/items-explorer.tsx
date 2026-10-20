"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  Bug,
  Lightbulb,
  PlusCircle,
  RefreshCw,
  Search,
  SearchX,
  X,
} from "lucide-react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IssueCard, IssueCardSkeleton } from "@/components/issues/issue-card";
import { getIssues } from "@/lib/issues-api";
import type { Issue, IssueStatus, IssueType } from "@/types";

type TypeFilter = "all" | IssueType;
type StatusFilter = "all" | IssueStatus;
type SortFilter = "newest" | "oldest";

export function ItemsExplorer() {
  const [issues, setIssues] = React.useState<Issue[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [search, setSearch] = React.useState<string>("");
  const [type, setType] = React.useState<TypeFilter>("all");
  const [status, setStatus] = React.useState<StatusFilter>("all");
  const [sort, setSort] = React.useState<SortFilter>("newest");

  const fetchIssuesData = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getIssues();
      setIssues(response.data || []);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load issues";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    fetchIssuesData();
  }, [fetchIssuesData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const clearFilters = () => {
    setSearch("");
    setType("all");
    setStatus("all");
    setSort("newest");
  };

  const isFiltered =
    search.trim() !== "" || type !== "all" || status !== "all" || sort !== "newest";

  const filteredIssues = React.useMemo(() => {
    const trimmed = search.trim().toLowerCase();

    return issues
      .filter((issue) => {
        if (!trimmed) return true;
        const titleMatch = issue.title.toLowerCase().includes(trimmed);
        const descMatch = issue.description.toLowerCase().includes(trimmed);
        const reporterMatch = (issue.reporter?.name || "")
          .toLowerCase()
          .includes(trimmed);
        return titleMatch || descMatch || reporterMatch;
      })
      .filter((issue) => {
        if (type === "all") return true;
        return issue.type === type;
      })
      .filter((issue) => {
        if (status === "all") return true;
        return issue.status === status;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sort === "oldest" ? timeA - timeB : timeB - timeA;
      });
  }, [issues, search, type, status, sort]);

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[240px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, description, or reporter..."
              aria-label="Search issues"
              className="pl-9 pr-9 h-9"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-sm transition-colors"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Type Segmented Group */}
            <div
              role="group"
              aria-label="Filter by type"
              className="inline-flex rounded-lg border border-border bg-muted/40 p-1"
            >
              <button
                type="button"
                aria-pressed={type === "all"}
                onClick={() => setType("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  type === "all"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                All
              </button>
              <button
                type="button"
                aria-pressed={type === "bug"}
                onClick={() => setType("bug")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  type === "bug"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Bug className="size-3.5" />
                Bugs
              </button>
              <button
                type="button"
                aria-pressed={type === "feature_request"}
                onClick={() => setType("feature_request")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  type === "feature_request"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <Lightbulb className="size-3.5" />
                Features
              </button>
            </div>

            {/* Status Segmented Group */}
            <div
              role="group"
              aria-label="Filter by status"
              className="inline-flex rounded-lg border border-border bg-muted/40 p-1"
            >
              <button
                type="button"
                aria-pressed={status === "all"}
                onClick={() => setStatus("all")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  status === "all"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                All
              </button>
              <button
                type="button"
                aria-pressed={status === "open"}
                onClick={() => setStatus("open")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  status === "open"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Open
              </button>
              <button
                type="button"
                aria-pressed={status === "in_progress"}
                onClick={() => setStatus("in_progress")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  status === "in_progress"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                In Progress
              </button>
              <button
                type="button"
                aria-pressed={status === "resolved"}
                onClick={() => setStatus("resolved")}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-xs font-medium transition-all select-none",
                  status === "resolved"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Resolved
              </button>
            </div>

            {/* Sort Select */}
            <Select
              value={sort}
              onValueChange={(val) => {
                if (val === "newest" || val === "oldest") {
                  setSort(val);
                }
              }}
            >
              <SelectTrigger className="h-9 min-w-[130px] text-xs">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
              </SelectContent>
            </Select>

            {/* Clear Filters Button */}
            {isFiltered && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="gap-1.5 text-xs text-muted-foreground hover:text-foreground h-9"
              >
                <X className="size-3.5" />
                Clear filters
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Showing count */}
      {!loading && !error && issues.length > 0 && (
        <div
          aria-live="polite"
          className="text-xs text-muted-foreground font-medium px-1"
        >
          Showing {filteredIssues.length} of {issues.length} issues
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="space-y-6">
          <Skeleton className="h-4 w-36 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <IssueCardSkeleton key={i} />
            ))}
          </div>
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
            onClick={fetchIssuesData}
            className="gap-2"
          >
            <RefreshCw className="size-3.5" />
            Retry
          </Button>
        </div>
      )}

      {/* No issues at all */}
      {!loading && !error && issues.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <AlertCircle className="size-6" />
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

      {/* No results for current filters */}
      {!loading && !error && issues.length > 0 && filteredIssues.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <SearchX className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              No matching issues
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search query or filter criteria.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="gap-1.5"
          >
            <X className="size-3.5" />
            Clear filters
          </Button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && filteredIssues.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  );
}
