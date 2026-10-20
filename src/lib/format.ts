import type { IssueStatus, IssueType } from "@/types";
import { Bug, Lightbulb, type LucideIcon } from "lucide-react";

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

export function formatRelative(dateInput: string | Date): string {
  try {
    const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) {
      return String(dateInput);
    }

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 0) {
      return "just now";
    }

    if (diffInSeconds < 60) {
      return "just now";
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 30) {
      return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`;
    }

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) {
      return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`;
    }

    const diffInYears = Math.floor(diffInDays / 365);
    return `${diffInYears} ${diffInYears === 1 ? "year" : "years"} ago`;
  } catch {
    return String(dateInput);
  }
}

export interface TypeMeta {
  label: string;
  icon: LucideIcon;
  badgeClass: string;
  bgClass: string;
}

export interface StatusMeta {
  label: string;
  badgeClass: string;
  bgClass: string;
}

export const typeMeta: Record<IssueType, TypeMeta> = {
  bug: {
    label: "Bug",
    icon: Bug,
    badgeClass: "border-rose-500/30 bg-rose-500/10 text-rose-400",
    bgClass: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  },
  feature_request: {
    label: "Feature Request",
    icon: Lightbulb,
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    bgClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
};

export const statusMeta: Record<IssueStatus, StatusMeta> = {
  open: {
    label: "Open",
    badgeClass: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    bgClass: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  },
  in_progress: {
    label: "In Progress",
    badgeClass: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    bgClass: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  },
  resolved: {
    label: "Resolved",
    badgeClass: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
    bgClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  },
};

export function getStatusLabel(status: IssueStatus): string {
  return statusMeta[status]?.label ?? status;
}

export function getTypeLabel(type: IssueType): string {
  return typeMeta[type]?.label ?? type;
}
