import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ItemsExplorer } from "@/components/items/items-explorer";

export const metadata: Metadata = {
  title: "Items | DevPulse",
};

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            All Issues
          </h1>
          <p className="mt-2 text-base text-muted-foreground">
            Browse, search, and track issues reported across the community.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/items/add" />}
          className="self-start sm:self-auto gap-2"
        >
          <Plus className="size-4" />
          Report an Issue
        </Button>
      </div>
      <ItemsExplorer />
    </div>
  );
}
