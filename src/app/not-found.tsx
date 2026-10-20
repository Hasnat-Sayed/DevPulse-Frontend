import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Compass className="size-7" />
      </span>
      <p className="mt-6 bg-linear-to-r from-indigo-400 via-primary to-purple-400 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">Page not found</h1>
      <p className="mt-2 text-muted-foreground">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button nativeButton={false} render={<Link href="/" />}>
          <ArrowLeft className="size-4" /> Back to home
        </Button>
        <Button variant="outline" nativeButton={false} render={<Link href="/items" />}>
          Browse Issues
        </Button>
      </div>
    </div>
  );
}