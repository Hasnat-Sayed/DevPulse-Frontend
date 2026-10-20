import type { Metadata } from "next";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ManageIssues } from "@/components/items/manage-issues";

export const metadata: Metadata = {
  title: "Manage Issues | DevPulse",
};

export default function ManageIssuesPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <ManageIssues />
      </div>
    </ProtectedRoute>
  );
}
