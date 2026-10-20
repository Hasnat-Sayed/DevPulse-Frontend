import type { ApiSuccess } from "@/types";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

interface ApiFetchOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

export async function apiFetch<T>(
  path: string,
  options?: ApiFetchOptions
): Promise<ApiSuccess<T>> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
  const url = `${baseUrl}${path}`;

  const headers: Record<string, string> = {};

  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (options?.token) {
    headers["Authorization"] = options.token;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method: options?.method || "GET",
      headers,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new ApiError("Cannot reach the server. Please try again.", 0);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  const isSuccessResponse = (
    res: unknown
  ): res is ApiSuccess<T> => {
    return (
      typeof res === "object" &&
      res !== null &&
      "success" in res &&
      (res as { success: unknown }).success === true
    );
  };

  if (!response.ok || !isSuccessResponse(data)) {
    let errorMessage = "An error occurred. Please try again.";
    if (
      typeof data === "object" &&
      data !== null &&
      "message" in data &&
      typeof (data as { message: unknown }).message === "string"
    ) {
      errorMessage = (data as { message: string }).message;
    }
    throw new ApiError(errorMessage, response.status);
  }

  return data;
}
