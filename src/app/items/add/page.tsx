"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";

export default function AddIssuePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Add Issue
        </h1>
      </div>
    </ProtectedRoute>
  );
}
