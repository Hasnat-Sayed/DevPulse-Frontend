"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bug, Check, Eye, Lightbulb, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IssueCard } from "@/components/issues/issue-card";
import { useAuth } from "@/context/auth-context";
import { useApiError } from "@/hooks/use-api-error";
import { createIssue } from "@/lib/issues-api";
import { cn } from "cn";
import type { Issue, IssueType } from "@/types";

export function AddIssueForm() {
  const router = useRouter();
  const { user, token } = useAuth();
  const handleApiError = useApiError();

  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState<IssueType>("bug");
  const [description, setDescription] = React.useState("");

  const [titleTouched, setTitleTouched] = React.useState(false);
  const [descTouched, setDescTouched] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const descTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  const validateTitle = (val: string): string | null => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Title is required";
    }
    if (val.length > 150) {
      return "Title must be at most 150 characters";
    }
    return null;
  };

  const validateDescription = (val: string): string | null => {
    const trimmed = val.trim();
    if (trimmed.length < 20) {
      return "Description must be at least 20 characters";
    }
    return null;
  };

  const titleError = titleTouched ? validateTitle(title) : null;
  const descError = descTouched ? validateDescription(description) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    setTitleTouched(true);
    setDescTouched(true);

    const tErr = validateTitle(title);
    const dErr = validateDescription(description);

    if (tErr) {
      titleInputRef.current?.focus();
      return;
    }

    if (dErr) {
      descTextareaRef.current?.focus();
      return;
    }

    setSubmitting(true);
    try {
      const res = await createIssue(
        {
          title: title.trim(),
          description: description.trim(),
          type,
        },
        token
      );
      toast.success("Issue created successfully");
      router.push(`/items/${res.data.id}`);
    } catch (err: unknown) {
      handleApiError(err);
      setSubmitting(false);
    }
  };

  const previewIssue: Issue = {
    id: 0,
    title: title.trim() || "Your issue title",
    description: description.trim() || "Your description will appear here",
    type,
    status: "open",
    reporter: {
      id: user?.id ?? 0,
      name: user?.name ?? "You",
      role: user?.role ?? "contributor",
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      {/* Left Form: lg:col-span-3 */}
      <div className="lg:col-span-3">
        <Card className="p-6 md:p-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="issue-title"
                  className="text-sm font-medium text-foreground"
                >
                  Title <span className="text-destructive">*</span>
                </label>
                <span
                  className={cn(
                    "text-xs tabular-nums",
                    title.length > 150
                      ? "text-destructive font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {title.length}/150
                </span>
              </div>
              <Input
                ref={titleInputRef}
                id="issue-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTitleTouched(true)}
                disabled={submitting}
                aria-invalid={Boolean(titleError)}
                aria-describedby={titleError ? "title-error" : undefined}
                placeholder="What is the issue or feature request?"
                className="h-10"
              />
              {titleError && (
                <p id="title-error" className="text-sm text-destructive">
                  {titleError}
                </p>
              )}
            </div>

            {/* Type */}
            <div className="space-y-2">
              <label
                id="issue-type-label"
                className="text-sm font-medium text-foreground"
              >
                Type <span className="text-destructive">*</span>
              </label>
              <div
                role="group"
                aria-labelledby="issue-type-label"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* Bug card */}
                <button
                  type="button"
                  role="button"
                  aria-pressed={type === "bug"}
                  disabled={submitting}
                  onClick={() => setType("bug")}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                    type === "bug"
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border bg-card/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0",
                        type === "bug"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Bug className="size-4" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      Bug
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Something is broken or behaves incorrectly
                  </p>
                </button>

                {/* Feature Request card */}
                <button
                  type="button"
                  role="button"
                  aria-pressed={type === "feature_request"}
                  disabled={submitting}
                  onClick={() => setType("feature_request")}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
                    type === "feature_request"
                      ? "border-primary bg-primary/10 shadow-xs"
                      : "border-border bg-card/50 hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "size-8 rounded-lg flex items-center justify-center shrink-0",
                        type === "feature_request"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      )}
                    >
                      <Lightbulb className="size-4" />
                    </div>
                    <span className="font-semibold text-foreground text-sm">
                      Feature Request
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    An idea or improvement you would like to see
                  </p>
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="issue-description"
                  className="text-sm font-medium text-foreground"
                >
                  Description <span className="text-destructive">*</span>
                </label>
                <span className="text-xs tabular-nums text-muted-foreground">
                  {description.length} chars
                </span>
              </div>
              <Textarea
                ref={descTextareaRef}
                id="issue-description"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setDescTouched(true)}
                disabled={submitting}
                aria-invalid={Boolean(descError)}
                aria-describedby={
                  descError ? "description-error" : "description-helper"
                }
                placeholder="Explain the issue in detail, steps to reproduce, or requirements..."
              />
              <p
                id="description-helper"
                className="text-xs text-muted-foreground"
              >
                At least 20 characters. Explain what happened or what you need.
              </p>
              {descError && (
                <p id="description-error" className="text-sm text-destructive">
                  {descError}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="ghost"
                disabled={submitting}
                nativeButton={false}
                render={<Link href="/items" />}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting} className="gap-2">
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="size-4" />
                    Submit Issue
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Right Preview & Tips: lg:col-span-2 */}
      <div className="lg:col-span-2 lg:sticky lg:top-24 self-start space-y-6">
        {/* Live preview */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Eye className="size-4 text-primary" />
            <span>Live preview</span>
          </div>
          <div
            className="pointer-events-none select-none"
            aria-hidden="true"
          >
            <IssueCard issue={previewIssue} />
          </div>
        </div>

        {/* Tips card */}
        <Card className="p-5">
          <CardHeader className="p-0 pb-3">
            <CardTitle className="text-sm font-semibold text-foreground">
              Tips for a good issue
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Use a clear, specific title</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Describe what you expected and what happened</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="size-4 text-primary shrink-0 mt-0.5" />
                <span>Include steps to reproduce for bugs</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
