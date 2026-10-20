import Link from "next/link";
import { Activity, Mail } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FooterAccountLinks } from "@/components/layout/footer-account-links";
import { site } from "@/lib/site";

const SOCIALS = [
  { label: "GitHub", href: site.socials.github, icon: FaGithub },
  { label: "LinkedIn", href: site.socials.linkedin, icon: FaLinkedinIn },
  { label: "Facebook", href: site.socials.facebook, icon: FaFacebookF },
];

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground";
const socialClass =
  "flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary";

export function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
              <Activity className="size-5 text-primary" />
              <span>{site.name}</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-muted-foreground">
              {site.tagline} Report bugs, request features and track every fix in one place.
            </p>
            
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Explore</h3>
              <ul className="space-y-2">
                <li><Link href="/" className={linkClass}>Home</Link></li>
                <li><Link href="/items" className={linkClass}>Issues</Link></li>
                <li><Link href="/about" className={linkClass}>About</Link></li>
                <li><Link href="/contact" className={linkClass}>Contact</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Account</h3>
              <FooterAccountLinks />
            </div>

            <ul className="flex items-top gap-3 pt-1">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={socialClass}
                  >
                    <s.icon className="size-4" />
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} aria-label="Email" className={socialClass}>
                  <Mail className="size-4" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS and shadcn/ui
          </p>
        </div>
      </div>
    </footer>
  );
}