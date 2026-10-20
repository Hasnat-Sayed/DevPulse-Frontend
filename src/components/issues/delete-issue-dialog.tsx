"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { deleteIssue } from "@/lib/issues-api";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import type { Issue } from "@/types";

interface DeleteIssueDialogProps {
  issue: Issue;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onError: (error: unknown) => void;
  onDeleted?: () => void;
}

export function DeleteIssueDialog({
  issue,
  open,
  onOpenChange,
  onError,
  onDeleted,
}: DeleteIssueDialogProps) {
  const router = useRouter();
  const { token } = useAuth();
  const [deleting, setDeleting] = React.useState(false);

  const handleDelete = async () => {
    console.log("onDeleted provided?", Boolean(onDeleted));
    setDeleting(true);
    try {
      await deleteIssue(issue.id, token);
      toast.success("Issue deleted");
      onOpenChange(false);
      if (onDeleted) {
        onDeleted();
      } else {
        router.push("/items");
      }
    } catch (err: unknown) {
      onError(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this issue?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &ldquo;{issue.title}&rdquo;? This
            action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="gap-2"
          >
            {deleting && <Loader2 className="size-4 animate-spin" />}
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
