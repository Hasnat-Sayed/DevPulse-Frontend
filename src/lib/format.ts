import type { IssueStatus, IssueType } from "@/types";

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getStatusLabel(status: IssueStatus): string {
  switch (status) {
    case "open":
      return "Open";
    case "in_progress":
      return "In Progress";
    case "resolved":
      return "Resolved";
    default:
      return status;
  }
}

export function getTypeLabel(type: IssueType): string {
  switch (type) {
    case "bug":
      return "Bug";
    case "feature_request":
      return "Feature Request";
    default:
      return type;
  }
}
