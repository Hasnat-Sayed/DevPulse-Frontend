import Link from "next/link";
import { Activity } from "lucide-react";
import { SiGithub } from "react-icons/si";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:gap-12">
          {/* Logo and Tagline */}
          <div className="space-y-3 md:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-90 transition-opacity"
            >
              <Activity className="size-5 text-primary" />
              <span>DevPulse</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Modern issue and bug tracking for engineering teams.
            </p>
          </div>

          {/* Link Groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-3">
            {/* Product */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/items"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Items
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            {/* Account */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Account</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/login"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/#features"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} DevPulse. All rights reserved.
          </p>
          <Link
            href="https://github.com/YOUR-USERNAME/YOUR-REPO"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <SiGithub className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
