"use client";

import * as React from "react";
import { Bug, Lightbulb, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateIssue } from "@/lib/issues-api";
import { useAuth } from "@/context/auth-context";
import { cn } from "cn";
import type { Issue, IssueInput, IssueType } from "@/types";

interface EditIssueDialogProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
  onError: (error: unknown) => void;
}

export function EditIssueDialog({
  issue,
  open,
  onOpenChange,
  onSaved,
  onError,
}: EditIssueDialogProps) {
  const { token } = useAuth();

  const [title, setTitle] = React.useState(issue.title);
  const [description, setDescription] = React.useState(issue.description);
  const [type, setType] = React.useState<IssueType>(issue.type);

  const [titleTouched, setTitleTouched] = React.useState(false);
  const [descTouched, setDescTouched] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Reset fields to the issue's values each time the dialog opens
  /* eslint-disable react-hooks/set-state-in-effect -- fetch on mount */
  React.useEffect(() => {
    if (open) {
      setTitle(issue.title);
      setDescription(issue.description);
      setType(issue.type);
      setTitleTouched(false);
      setDescTouched(false);
    }
  }, [open, issue.title, issue.description, issue.type]);
  /* eslint-enable react-hooks/set-state-in-effect */

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

  const hasChanged =
    title.trim() !== issue.title ||
    description.trim() !== issue.description ||
    type !== issue.type;

  const isFormValid =
    !validateTitle(title) && !validateDescription(description);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleTouched(true);
    setDescTouched(true);

    const tErr = validateTitle(title);
    const dErr = validateDescription(description);
    if (tErr || dErr) {
      return;
    }

    if (!hasChanged) {
      return;
    }

    const patchPayload: Partial<IssueInput> = {};
    if (title.trim() !== issue.title) {
      patchPayload.title = title.trim();
    }
    if (description.trim() !== issue.description) {
      patchPayload.description = description.trim();
    }
    if (type !== issue.type) {
      patchPayload.type = type;
    }

    setSubmitting(true);
    try {
      await updateIssue(issue.id, patchPayload, token);
      toast.success("Issue updated");
      onOpenChange(false);
      onSaved();
    } catch (err: unknown) {
      onError(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Issue</DialogTitle>
          <DialogDescription>
            Make changes to your issue details below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type segmented buttons */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Type</label>
            <div
              role="group"
              aria-label="Issue Type"
              className="grid grid-cols-2 gap-2 rounded-lg bg-muted/50 p-1"
            >
              <button
                type="button"
                aria-pressed={type === "bug"}
                onClick={() => setType("bug")}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md py-1.5 text-xs font-medium transition-all outline-none",
                  type === "bug"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Bug className="size-3.5 text-rose-500" />
                Bug
              </button>
              <button
                type="button"
                aria-pressed={type === "feature_request"}
                onClick={() => setType("feature_request")}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-md py-1.5 text-xs font-medium transition-all outline-none",
                  type === "feature_request"
                    ? "bg-card text-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Lightbulb className="size-3.5 text-amber-500" />
                Feature Request
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="edit-issue-title"
                className="text-xs font-medium text-foreground"
              >
                Title
              </label>
              <span
                className={cn(
                  "text-[10px] tabular-nums",
                  title.length > 150
                    ? "text-destructive"
                    : "text-muted-foreground",
                )}
              >
                {title.length}/150
              </span>
            </div>
            <Input
              id="edit-issue-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTitleTouched(true)}
              aria-invalid={Boolean(titleError)}
              maxLength={150}
              placeholder="Brief summary of the issue"
            />
            {titleError && (
              <p className="text-xs text-destructive">{titleError}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="edit-issue-description"
                className="text-xs font-medium text-foreground"
              >
                Description
              </label>
              <span className="text-[10px] tabular-nums text-muted-foreground">
                {description.length} characters (min 20)
              </span>
            </div>
            <Textarea
              id="edit-issue-description"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={() => setDescTouched(true)}
              aria-invalid={Boolean(descError)}
              placeholder="Provide a detailed explanation (minimum 20 characters)"
            />
            {descError && (
              <p className="text-xs text-destructive">{descError}</p>
            )}
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!hasChanged || !isFormValid || submitting}
              className="gap-2"
            >
              {submitting && <Loader2 className="size-4 animate-spin" />}
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
