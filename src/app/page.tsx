import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex-1">
      <div className="space-y-12">
        <div className="space-y-3">
          <Badge variant="outline">Phase 1 Preview</Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            DevPulse Design System
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Permanent dark theme verification showing Inter typography, elevated slate surfaces,
            solid indigo primary actions, soft indigo secondary tints, and transparent outline styles.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Card 1: Interactive Form & Core Surface */}
          <Card className="rounded-xl border hover:border-ring/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Theme Tokens & Surface</CardTitle>
                <Badge variant="default">Primary Active</Badge>
              </div>
              <CardDescription>
                Near-black slate background with elevated card surface and crisp Inter text.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-foreground">
                Notice the distinct contrast hierarchy: solid indigo primary stands out, soft indigo secondary provides subtle emphasis, and outline stays clean and transparent.
              </p>
              <div className="space-y-2">
                <label htmlFor="preview-input" className="text-sm font-medium text-foreground">
                  Quick Search
                </label>
                <Input
                  id="preview-input"
                  placeholder="Filter issues by title, reporter, or tag..."
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button variant="default">Primary Action</Button>
              <Button variant="secondary">Secondary Action</Button>
              <Button variant="outline">Outline</Button>
            </CardFooter>
          </Card>

          {/* Card 2: Style Comparison Matrix */}
          <Card className="rounded-xl border hover:border-ring/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>Variant Visual Hierarchy</CardTitle>
                <Badge variant="secondary">Secondary Tint</Badge>
              </div>
              <CardDescription>
                Direct visual comparison between Primary, Secondary, and Outline variants.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Badges Comparison */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Badges (Primary · Secondary · Outline)
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="default">Primary (Solid Indigo)</Badge>
                  <Badge variant="secondary">Secondary (Soft Tint)</Badge>
                  <Badge variant="outline">Outline (Transparent)</Badge>
                </div>
              </div>

              {/* Buttons Comparison */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Buttons (Primary · Secondary · Outline)
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
