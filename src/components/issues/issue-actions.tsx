"use client";

import * as React from "react";
import { Loader2, Pencil, SlidersHorizontal, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/common/reveal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/context/auth-context";
import { useApiError } from "@/hooks/use-api-error";
import { updateIssue } from "@/lib/issues-api";
import { EditIssueDialog } from "@/components/issues/edit-issue-dialog";
import { DeleteIssueDialog } from "@/components/issues/delete-issue-dialog";
import type { Issue, IssueStatus } from "@/types";

interface IssueActionsProps {
  issue: Issue;
  onChange: () => void;
}

const STATUS_LABELS: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
};

export function IssueActions({ issue, onChange }: IssueActionsProps) {
  const { user, token} = useAuth();

  const [editOpen, setEditOpen] = React.useState(false);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [statusPending, setStatusPending] = React.useState(false);

  const handleApiError = useApiError();

  if (!user) {
    return null;
  }

  const isMaintainer = user.role === "maintainer";
  const isOwner = user.id === issue.reporter.id;
  const canEdit = isMaintainer || (isOwner && issue.status === "open");

  if (!isMaintainer && !isOwner) {
    return null;
  }

  const handleStatusChange = async (value: string | null) => {
    if (!value || value === issue.status) return;
    const nextStatus = value as IssueStatus;
    setStatusPending(true);
    try {
      await updateIssue(issue.id, { status: nextStatus }, token);
      toast.success(`Status changed to ${STATUS_LABELS[nextStatus]}`);
      onChange();
    } catch (err: unknown) {
      handleApiError(err);
    } finally {
      setStatusPending(false);
    }
  };

    
return (
  <>
    <Reveal delay={200}>
      <Card className="gap-3 p-6">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="size-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">
            Manage issue
          </h2>
        </div>

        <p className="text-sm text-muted-foreground">
          {isMaintainer
            ? "Update the status, edit the details, or remove this issue."
            : "You can edit this issue while it is still open."}
        </p>

        <div className="space-y-3">
          {/* Actions */}
          <div
            className={cn(
              "grid gap-3",
              isMaintainer ? "grid-cols-3" : "grid-cols-1"
            )}
          >
            {isMaintainer && (
              <Select
                value={issue.status}
                onValueChange={handleStatusChange}
                disabled={statusPending}
              >
                <SelectTrigger
                  aria-label="Issue status"
                  className="w-full justify-between"
                >
                  {statusPending ? (
                    <span className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 className="size-4 animate-spin" />
                      Updating...
                    </span>
                  ) : (
                    <SelectValue />
                  )}
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            )}

            {canEdit && (
              <Button
                variant="secondary"
                onClick={() => setEditOpen(true)}
                className="gap-2"
              >
                <Pencil className="size-4" />
                Edit
              </Button>
            )}

            {isMaintainer && (
              <Button
                variant="outline"
                onClick={() => setDeleteOpen(true)}
                className="gap-2 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <Trash2 className="size-4" />
                Delete
              </Button>
            )}
          </div>

          {/* Permission message */}
          {!canEdit && isOwner && (
            <p className="text-xs text-muted-foreground">
              Only maintainers can edit an issue once work has started.
            </p>
          )}
        </div>
      </Card>
    </Reveal>

    <EditIssueDialog
      issue={issue}
      open={editOpen}
      onOpenChange={setEditOpen}
      onSaved={onChange}
      onError={handleApiError}
    />

    <DeleteIssueDialog
      issue={issue}
      open={deleteOpen}
      onOpenChange={setDeleteOpen}
      onError={handleApiError}
    />
  </>
);


}
