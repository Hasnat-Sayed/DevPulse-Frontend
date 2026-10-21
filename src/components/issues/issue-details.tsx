"use client";

import * as React from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Hash,
  Info,
  Link2,
  RefreshCw,
  SearchX,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/common/reveal";
import { IssueCard } from "@/components/issues/issue-card";
import { IssueActions } from "@/components/issues/issue-actions";
import { ApiError } from "@/lib/api";
import { formatDate, formatRelative, statusMeta, typeMeta } from "@/lib/format";
import { getIssue, getIssues } from "@/lib/issues-api";
import type { Issue } from "@/types";
import { cn } from "cn";
import { IssueProgress } from "./issue-progress";

interface IssueDetailsProps {
  id: string;
}

function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function IssueDetails({ id }: IssueDetailsProps) {
  const isIdValid = /^[1-9]\d*$/.test(id.trim());

  const [issue, setIssue] = React.useState<Issue | null>(null);
  const [relatedIssues, setRelatedIssues] = React.useState<Issue[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isNotFound, setIsNotFound] = React.useState<boolean>(!isIdValid);

  const refresh = React.useCallback(async () => {
    if (!isIdValid) return;
    try {
      const issueRes = await getIssue(id.trim());
      const current = issueRes.data;
      setIssue(current);

      try {
        const relatedRes = await getIssues({ type: current.type });
        const filtered = (relatedRes.data || [])
          .filter((item) => String(item.id) !== String(current.id))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(0, 3);
        setRelatedIssues(filtered);
      } catch {
        // preserve existing related issues or ignore error
      }
    } catch {
      // keep current state if silent refresh fails
    }
  }, [id, isIdValid]);

  const fetchIssueAndRelated = React.useCallback(async () => {
    if (!isIdValid) {
      setIsNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsNotFound(false);

    try {
      const issueRes = await getIssue(id.trim());
      const current = issueRes.data;
      setIssue(current);

      try {
        const relatedRes = await getIssues({ type: current.type });
        const filtered = (relatedRes.data || [])
          .filter((item) => String(item.id) !== String(current.id))
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          )
          .slice(0, 3);
        setRelatedIssues(filtered);
      } catch {
        setRelatedIssues([]);
      }
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 404) {
        setIsNotFound(true);
      } else {
        const msg =
          err instanceof Error ? err.message : "Failed to load issue details";
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  }, [id, isIdValid]);

  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    fetchIssueAndRelated();
  }, [fetchIssueAndRelated]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (isNotFound) {
    return (
      <div className="space-y-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/items" />}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Issues
          </Button>
        </div>
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-12 text-center max-w-xl mx-auto space-y-5">
          <div className="mx-auto size-14 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
            <SearchX className="size-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Issue not found
            </h1>
            <p className="text-sm text-muted-foreground">
              The issue you are looking for does not exist or may have been
              removed.
            </p>
          </div>
          <Button nativeButton={false} render={<Link href="/items" />}>
            Back to Issues
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <Skeleton className="h-9 w-36 rounded-md" />
        </div>

        {/* Header Skeleton */}
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <Skeleton className="size-14 rounded-xl shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-9 w-3/4 rounded-md" />
                <div className="flex items-center gap-3">
                  <Skeleton className="size-6 rounded-full" />
                  <Skeleton className="h-4 w-44 rounded-md" />
                </div>
              </div>
            </div>
            <Skeleton className="h-9 w-28 rounded-md" />
          </div>
        </div>

        {/* Body Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-5/6 rounded-md" />
              <Skeleton className="h-4 w-4/6 rounded-md" />
            </div>
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-28 rounded-md" />
              <Skeleton className="h-12 w-full rounded-md" />
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="space-y-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            nativeButton={false}
            render={<Link href="/items" />}
            className="gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back to Issues
          </Button>
        </div>
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 p-12 text-center max-w-xl mx-auto space-y-5">
          <div className="mx-auto size-14 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertCircle className="size-7" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-foreground">
              Failed to load issue
            </h1>
            <p className="text-sm text-muted-foreground">
              {error ||
                "An unexpected error occurred while loading this issue."}
            </p>
          </div>
          <Button
            variant="outline"
            onClick={fetchIssueAndRelated}
            className="gap-2"
          >
            <RefreshCw className="size-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const currentType = typeMeta[issue.type];
  const currentStatus = statusMeta[issue.status];
  const TypeIcon = currentType?.icon;

  return (
    <div className="space-y-6">
      {/* a) Top: Back to Issues */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          nativeButton={false}
          render={<Link href="/items" />}
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Issues
        </Button>
      </div>

      {/* b) Header */}
      <Reveal delay={0}>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0">
              <div
                className={cn(
                  "size-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                  currentType?.bgClass,
                )}
                title={currentType?.label}
              >
                {TypeIcon && <TypeIcon className="size-7" />}
              </div>

              <div className="space-y-3 flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium text-xs px-2.5 py-0.5",
                      currentType?.badgeClass,
                    )}
                  >
                    {currentType?.label ?? issue.type}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize font-medium text-xs px-2.5 py-0.5",
                      currentStatus?.badgeClass,
                    )}
                  >
                    {currentStatus?.label ?? issue.status}
                  </Badge>
                </div>

                <h1 className="text-md md:text-4xl font-bold tracking-tight text-foreground break-words">
                  {issue.title}
                </h1>

                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                  <Avatar size="sm" className="size-6">
                    <AvatarFallback className="text-[10px] font-semibold bg-primary/10 text-primary">
                      {getInitials(issue.reporter?.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-foreground/90 font-medium">
                    Reported by {issue.reporter?.name || "Unknown"}
                  </span>
                  {issue.reporter?.role && (
                    <Badge
                      variant="outline"
                      className="capitalize text-[10px] px-1.5 py-0 border-border text-muted-foreground"
                    >
                      {issue.reporter.role}
                    </Badge>
                  )}
                  <span aria-hidden="true" className="text-border">
                    •
                  </span>
                  <span
                    title={formatDate(issue.created_at)}
                    className="cursor-default"
                  >
                    {formatRelative(issue.created_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      {/* c) Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <Reveal delay={100}>
            <Card className="p-6">
              <div className="flex items-center gap-2.5">
                <FileText className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Description
                </h2>
              </div>
              <p className="text-base leading-7 text-muted-foreground whitespace-pre-wrap break-words">
                {issue.description}
              </p>
            </Card>
          </Reveal>
          {/* Manage card: renders only when the user can act on this issue */}
          <IssueActions issue={issue} onChange={refresh} />

          {/* Progress Card */}
          <Reveal delay={150}>
            <Card className="p-6">
              <div className="flex items-center gap-2.5">
                <Info className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Progress
                </h2>
              </div>

              <div
                role="region"
                aria-label="Issue Progress"
                className="w-full pt-2.5"
              >
                <IssueProgress status={issue.status} />
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
          <Reveal delay={200}>
            <Card className="p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <Info className="size-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Issue Details
                </h2>
              </div>

              <div className="space-y-4">
                {/* ID */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <Hash className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Issue ID
                    </div>
                    <div className="text-sm font-medium font-mono text-foreground">
                      #{issue.id}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Type */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    {TypeIcon ? (
                      <TypeIcon className="size-4" />
                    ) : (
                      <Info className="size-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Type
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {currentType?.label ?? issue.type}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Status */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Status
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {currentStatus?.label ?? issue.status}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Reporter */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <UserIcon className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Reporter
                    </div>
                    <div className="text-sm font-medium text-foreground flex items-center gap-1.5 flex-wrap">
                      <span>{issue.reporter?.name || "Unknown"}</span>
                      {issue.reporter?.role && (
                        <Badge
                          variant="outline"
                          className="capitalize text-[10px] px-1.5 py-0 border-border text-muted-foreground"
                        >
                          {issue.reporter.role}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Created */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <Calendar className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Created
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatDate(issue.created_at)}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Last updated */}
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-lg bg-muted flex items-center justify-center shrink-0 text-muted-foreground">
                    <Clock className="size-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">
                      Last Updated
                    </div>
                    <div className="text-sm font-medium text-foreground">
                      {formatDate(issue.updated_at || issue.created_at)} (
                      {formatRelative(issue.updated_at || issue.created_at)})
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </div>

      {/* d) Related Issues section */}
      <div className="mt-12 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link2 className="size-5 text-primary" />
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Related Issues
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            More issues of the same type
          </p>
        </div>

        {relatedIssues.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedIssues.map((relIssue) => (
              <IssueCard key={relIssue.id} issue={relIssue} />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center border-dashed">
            <CardContent className="p-0">
              <p className="text-sm text-muted-foreground">
                No related issues yet
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
