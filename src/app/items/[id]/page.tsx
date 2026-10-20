import type { Metadata } from "next";
import { IssueDetails } from "@/components/issues/issue-details";

export const metadata: Metadata = {
  title: "Issue Details | DevPulse",
};

interface IssuePageProps {
  params: Promise<{ id: string }>;
}

export default async function IssuePage({ params }: IssuePageProps) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <IssueDetails id={id} />
    </div>
  );
}
