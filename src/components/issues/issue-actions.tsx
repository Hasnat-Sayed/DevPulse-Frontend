"use client";

import * as React from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { user, token, logout } = useAuth();

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
    <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 w-full sm:w-auto">
      {/* Contributor owner with non-open issue */}
      {!canEdit && isOwner && (
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <Button
            variant="outline"
            disabled
            className="w-full sm:w-auto gap-2"
          >
            <Pencil className="size-4" />
            Edit
          </Button>
          <p className="text-xs text-muted-foreground">
            Only maintainers can edit an issue once work has started.
          </p>
        </div>
      )}

      {/* canEdit: outline Edit button */}
      {canEdit && (
        <Button
          variant="outline"
          onClick={() => setEditOpen(true)}
          className="w-full sm:w-auto gap-2"
        >
          <Pencil className="size-4" />
          Edit
        </Button>
      )}

      {/* Maintainer only: status Select */}
      {isMaintainer && (
        <div className="w-full sm:w-40">
          <Select
            value={issue.status}
            onValueChange={handleStatusChange}
            disabled={statusPending}
          >
            <SelectTrigger className="w-full sm:w-40 justify-between">
              {statusPending ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                  <span className="text-muted-foreground">Updating...</span>
                </div>
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
        </div>
      )}

      {/* Maintainer only: outline destructive Delete button */}
      {isMaintainer && (
        <Button
          variant="outline"
          onClick={() => setDeleteOpen(true)}
          className="w-full sm:w-auto gap-2 text-destructive border-border hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="size-4" />
          Delete
        </Button>
      )}

      {/* Dialogs */}
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
    </div>
  );
}
