import { Hero } from "@/components/home/hero";
import { Features } from "@/components/home/features";
import { HowItWorks } from "@/components/home/how-it-works";
import { LatestIssues } from "@/components/home/latest-issues";
import { CtaBanner } from "@/components/home/cta-banner";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <LatestIssues />
      <CtaBanner />
    </>
  );
}
