import type { Issue } from "@/types";

interface IssueActionsProps {
  issue: Issue;
  onChange?: (updated: Issue) => void;
}

export function IssueActions({ issue: _issue, onChange: _onChange }: IssueActionsProps) {
  return null;
}
