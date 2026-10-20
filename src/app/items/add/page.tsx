import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { AddIssueForm } from "@/components/items/add-issue-form";

export const metadata: Metadata = {
  title: "Add Issue | DevPulse",
};

export default function AddIssuePage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-6">
          <div>
            <Button
              variant="ghost"
              size="sm"
              nativeButton={false}
              render={<Link href="/items" />}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to Issues
            </Button>
          </div>

          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Report an Issue
            </h1>
            <p className="text-muted-foreground">
              Submit a bug report or suggest a new feature for the community.
            </p>
          </div>

          <AddIssueForm />
        </div>
      </div>
    </ProtectedRoute>
  );
}
