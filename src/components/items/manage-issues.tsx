"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "cn";
import {
  AlertCircle,
  CheckCircle2,
  Circle,
  Clock,
  Eye,
  FilePlus,
  Layers,
  Pencil,
  Plus,
  RefreshCw,
  Search,
  SearchX,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeleteIssueDialog } from "@/components/issues/delete-issue-dialog";
import { useAuth } from "@/context/auth-context";
import { useApiError } from "@/hooks/use-api-error";
import { getIssues } from "@/lib/issues-api";
import { formatDate, typeMeta, statusMeta } from "@/lib/format";
import type { Issue, IssueStatus } from "@/types";

type StatusFilter = "all" | IssueStatus;

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
}

function StatCard({ label, value, icon, iconBg }: StatCardProps) {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3 py-1">
        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            iconBg
          )}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-foreground leading-none">{value}</p>
          <p className="text-xs uppercase tracking-wide text-muted-foreground mt-0.5">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Stat Card Skeleton ───────────────────────────────────────────────────────

function StatCardSkeleton() {
  return (
    <Card size="sm">
      <CardContent className="flex items-center gap-3 py-1">
        <Skeleton className="size-10 rounded-lg shrink-0" />
        <div className="min-w-0 space-y-1.5">
          <Skeleton className="h-6 w-10 rounded" />
          <Skeleton className="h-3 w-20 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Role badge ──────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide",
        role === "maintainer"
          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      )}
    >
      {role}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ManageIssues() {
  const { user } = useAuth();
  const handleApiError = useApiError();

  const [allIssues, setAllIssues] = React.useState<Issue[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<StatusFilter>("all");

  const [deleteDialogIssue, setDeleteDialogIssue] = React.useState<Issue | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const isMaintainer = user?.role === "maintainer";

  const fetchIssues = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getIssues({ sort: "newest" });
      setAllIssues(res.data ?? []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load issues");
    } finally {
      setLoading(false);
    }
  }, []);

  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);
  /* eslint-enable react-hooks/set-state-in-effect */

  // Visible issues based on role
  const visibleIssues = React.useMemo(() => {
    if (!user) return [];
    if (isMaintainer) return allIssues;
    return allIssues.filter((issue) => issue.reporter.id === user.id);
  }, [allIssues, user, isMaintainer]);

  // Stat counts computed from visible issues
  const totalCount = visibleIssues.length;
  const openCount = visibleIssues.filter((i) => i.status === "open").length;
  const inProgressCount = visibleIssues.filter((i) => i.status === "in_progress").length;
  const resolvedCount = visibleIssues.filter((i) => i.status === "resolved").length;

  // Filter counts for the toolbar badges
  const statusCounts: Record<StatusFilter, number> = {
    all: visibleIssues.length,
    open: openCount,
    in_progress: inProgressCount,
    resolved: resolvedCount,
  };

  // Filtered issues
  const filteredIssues = React.useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    return visibleIssues.filter((issue) => {
      const matchesSearch =
        !trimmed ||
        issue.title.toLowerCase().includes(trimmed) ||
        issue.reporter.name.toLowerCase().includes(trimmed);
      const matchesStatus =
        statusFilter === "all" || issue.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [visibleIssues, search, statusFilter]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("all");
  };

  const isFiltered = search.trim() !== "" || statusFilter !== "all";

  const openDeleteDialog = (issue: Issue) => {
    setDeleteDialogIssue(issue);
    setDeleteDialogOpen(true);
  };

  const handleDeleted = () => {
    if (deleteDialogIssue) {
      setAllIssues((prev) => prev.filter((i) => i.id !== deleteDialogIssue.id));
    }
  };

  // ── Loading state ───────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-8">
        {/* Header skeleton */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-8 w-44 rounded" />
            <Skeleton className="h-4 w-64 rounded" />
          </div>
          <Skeleton className="h-8 w-28 rounded-lg" />
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        {/* Toolbar skeleton */}
        <Card>
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center py-2">
            <Skeleton className="h-8 flex-1 rounded-lg" />
            <Skeleton className="h-8 w-72 rounded-lg" />
          </CardContent>
        </Card>

        {/* Table skeleton rows */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="divide-y divide-border">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3">
                <Skeleton className="size-9 rounded-lg shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-4 w-48 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-24 rounded" />
                <div className="flex gap-1.5">
                  <Skeleton className="size-8 rounded-lg" />
                  <Skeleton className="size-8 rounded-lg" />
                  <Skeleton className="size-8 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center space-y-4">
        <div className="mx-auto size-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
          <AlertCircle className="size-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-foreground">
            Unable to load issues
          </h3>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>
        <Button variant="outline" size="sm" onClick={fetchIssues} className="gap-2">
          <RefreshCw className="size-3.5" />
          Retry
        </Button>
      </div>
    );
  }

  // ── Contributor with no issues ──────────────────────────────────────────────
  if (!isMaintainer && visibleIssues.length === 0) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Manage Issues
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Issues you have reported.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href="/items/add" />} className="gap-2 shrink-0">
            <Plus className="size-4" />
            Add Issue
          </Button>
        </div>

        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <FilePlus className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              You have not reported any issues yet
            </h3>
            <p className="text-sm text-muted-foreground">
              Start by reporting a bug or requesting a feature.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href="/items/add" />} className="gap-2">
            <Plus className="size-4" />
            Add Issue
          </Button>
        </div>
      </div>
    );
  }

  // ── Normal render ───────────────────────────────────────────────────────────
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Manage Issues
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {isMaintainer
              ? "You can manage every issue in the system."
              : "Issues you have reported."}
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/items/add" />}
          className="gap-2 shrink-0"
        >
          <Plus className="size-4" />
          Add Issue
        </Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total"
          value={totalCount}
          iconBg="bg-primary/10 text-primary border border-primary/20"
          icon={<Layers className="size-5" />}
        />
        <StatCard
          label="Open"
          value={openCount}
          iconBg="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
          icon={<Circle className="size-5" />}
        />
        <StatCard
          label="In Progress"
          value={inProgressCount}
          iconBg="bg-amber-500/10 text-amber-400 border border-amber-500/20"
          icon={<Clock className="size-5" />}
        />
        <StatCard
          label="Resolved"
          value={resolvedCount}
          iconBg="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
          icon={<CheckCircle2 className="size-5" />}
        />
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="py-3 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or reporter name..."
                aria-label="Search issues"
                className="pl-9"
              />
            </div>

            {/* Status segmented filter */}
            <div
              role="group"
              aria-label="Filter by status"
              className="inline-flex flex-wrap rounded-lg border border-border bg-muted/40 p-1 gap-1"
            >
              {(
                [
                  { value: "all", label: "All" },
                  { value: "open", label: "Open" },
                  { value: "in_progress", label: "In Progress" },
                  { value: "resolved", label: "Resolved" },
                ] as { value: StatusFilter; label: string }[]
              ).map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={statusFilter === value}
                  onClick={() => setStatusFilter(value)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all select-none",
                    statusFilter === value
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold leading-none tabular-nums",
                      statusFilter === value
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted-foreground/20 text-muted-foreground"
                    )}
                  >
                    {statusCounts[value]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Showing count */}
          <p aria-live="polite" className="text-xs text-muted-foreground">
            Showing {filteredIssues.length} of {visibleIssues.length} issues
          </p>
        </CardContent>
      </Card>

      {/* No matches */}
      {isFiltered && filteredIssues.length === 0 && (
        <div className="rounded-xl border border-dashed border-border p-12 text-center space-y-4">
          <div className="mx-auto size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <SearchX className="size-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-foreground">
              No matching issues
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={clearFilters} className="gap-1.5">
            Clear filters
          </Button>
        </div>
      )}

      {/* Desktop Table */}
      {filteredIssues.length > 0 && (
        <>
          <div className="hidden md:block rounded-xl border border-border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Issue</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  {isMaintainer && <TableHead>Reporter</TableHead>}
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right pr-4">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue) => {
                  const tm = typeMeta[issue.type];
                  const sm = statusMeta[issue.status];
                  const TypeIcon = tm.icon;
                  const isOwner = user?.id === issue.reporter.id;
                  const canEdit =
                    isMaintainer || (isOwner && issue.status === "open");

                  return (
                    <TableRow
                      key={issue.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {/* Issue cell */}
                      <TableCell className="pl-4 py-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={cn(
                              "flex size-9 shrink-0 items-center justify-center rounded-lg",
                              tm.bgClass
                            )}
                          >
                            <TypeIcon className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/items/${issue.id}`}
                              className="block truncate max-w-md font-medium text-foreground hover:text-primary transition-colors"
                            >
                              {issue.title}
                            </Link>
                            <span className="text-xs text-muted-foreground font-mono">
                              #{issue.id}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Type badge */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                            tm.badgeClass
                          )}
                        >
                          {tm.label}
                        </span>
                      </TableCell>

                      {/* Status badge */}
                      <TableCell>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                            sm.badgeClass
                          )}
                        >
                          {sm.label}
                        </span>
                      </TableCell>

                      {/* Reporter (maintainers only) */}
                      {isMaintainer && (
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm text-foreground">
                              {issue.reporter.name}
                            </span>
                            <RoleBadge role={issue.reporter.role} />
                          </div>
                        </TableCell>
                      )}

                      {/* Created date */}
                      <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                        {formatDate(issue.created_at)}
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="pr-4">
                        <div className="flex items-center justify-end gap-1">
                          {/* View */}
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            nativeButton={false}
                            render={<Link href={`/items/${issue.id}`} />}
                            aria-label={`View issue #${issue.id}`}
                            title="View"
                          >
                            <Eye className="size-4" />
                          </Button>

                          {/* Edit */}
                          {canEdit && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              nativeButton={false}
                              render={<Link href={`/items/${issue.id}`} />}
                              aria-label={`Edit issue #${issue.id}`}
                              title="Edit"
                            >
                              <Pencil className="size-4" />
                            </Button>
                          )}

                          {/* Delete (maintainer only) */}
                          {isMaintainer && (
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              onClick={() => openDeleteDialog(issue)}
                              aria-label={`Delete issue #${issue.id}`}
                              title="Delete"
                              className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card List */}
          <div className="md:hidden space-y-3">
            {filteredIssues.map((issue) => {
              const tm = typeMeta[issue.type];
              const sm = statusMeta[issue.status];
              const TypeIcon = tm.icon;
              const isOwner = user?.id === issue.reporter.id;
              const canEdit =
                isMaintainer || (isOwner && issue.status === "open");

              return (
                <div
                  key={issue.id}
                  className="rounded-xl border border-border bg-card p-4 space-y-3"
                >
                  {/* Issue row */}
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        tm.bgClass
                      )}
                    >
                      <TypeIcon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/items/${issue.id}`}
                        className="block font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                      >
                        {issue.title}
                      </Link>
                      <span className="text-xs text-muted-foreground font-mono">
                        #{issue.id}
                      </span>
                    </div>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                        tm.badgeClass
                      )}
                    >
                      {tm.label}
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
                        sm.badgeClass
                      )}
                    >
                      {sm.label}
                    </span>
                    {isMaintainer && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span>{issue.reporter.name}</span>
                        <RoleBadge role={issue.reporter.role} />
                      </div>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">
                      {formatDate(issue.created_at)}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 pt-1 border-t border-border">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link href={`/items/${issue.id}`} />}
                      aria-label={`View issue #${issue.id}`}
                      title="View"
                    >
                      <Eye className="size-4" />
                    </Button>

                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        nativeButton={false}
                        render={<Link href={`/items/${issue.id}`} />}
                        aria-label={`Edit issue #${issue.id}`}
                        title="Edit"
                      >
                        <Pencil className="size-4" />
                      </Button>
                    )}

                    {isMaintainer && (
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => openDeleteDialog(issue)}
                        aria-label={`Delete issue #${issue.id}`}
                        title="Delete"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* Shared Delete Dialog */}
      {deleteDialogIssue && (
        <DeleteIssueDialog
          issue={deleteDialogIssue}
          open={deleteDialogOpen}
          onOpenChange={(open) => {
            setDeleteDialogOpen(open);
            if (!open) setDeleteDialogIssue(null);
          }}
          onError={handleApiError}
          onDeleted={handleDeleted}
        />
      )}
    </div>
  );
}
