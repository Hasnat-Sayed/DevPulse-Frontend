"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { ApiError } from "@/lib/api";

export function useApiError() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleApiError = React.useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) {
        toast.error("Your session expired. Please log in again.");
        logout();
        router.push("/login");
        return;
      }
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
    [logout, router]
  );

  return handleApiError;
}
