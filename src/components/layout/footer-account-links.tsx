"use client";

import Link from "next/link";
import { useAuth } from "@/context/auth-context";

const linkClass = "text-sm text-muted-foreground transition-colors hover:text-foreground";

export function FooterAccountLinks() {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-14" aria-hidden />;

  const links = user
    ? [
        { label: "Report an issue", href: "/items/add" },
        { label: "Manage issues", href: "/items/manage" },
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Register", href: "/register" },
      ];

  return (
    <ul className="space-y-2">
      {links.map((l) => (
        <li key={l.href}>
          <Link href={l.href} className={linkClass}>
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}