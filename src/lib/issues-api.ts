import { apiFetch } from "@/lib/api";
import type { ApiSuccess, Issue, IssueFilters, IssueInput } from "@/types";

export async function getIssues(
  filters?: IssueFilters
): Promise<ApiSuccess<Issue[]>> {
  const searchParams = new URLSearchParams();

  if (filters?.sort) {
    searchParams.set("sort", filters.sort);
  }
  if (filters?.type) {
    searchParams.set("type", filters.type);
  }
  if (filters?.status) {
    searchParams.set("status", filters.status);
  }

  const queryString = searchParams.toString();
  const path = queryString ? `/api/issues?${queryString}` : "/api/issues";

  return apiFetch<Issue[]>(path);
}

export async function getIssue(
  id: number | string
): Promise<ApiSuccess<Issue>> {
  return apiFetch<Issue>(`/api/issues/${id}`);
}

export async function createIssue(
  input: IssueInput,
  token?: string | null
): Promise<ApiSuccess<Issue>> {
  return apiFetch<Issue>("/api/issues", {
    method: "POST",
    body: input,
    token,
  });
}

export async function updateIssue(
  id: number | string,
  input: Partial<IssueInput> & { status?: Issue["status"] },
  token?: string | null
): Promise<ApiSuccess<Issue>> {
  return apiFetch<Issue>(`/api/issues/${id}`, {
    method: "PATCH",
    body: input,
    token,
  });
}

export async function deleteIssue(
  id: number | string,
  token?: string | null
): Promise<ApiSuccess<undefined>> {
  return apiFetch<undefined>(`/api/issues/${id}`, {
    method: "DELETE",
    token,
  });
}
