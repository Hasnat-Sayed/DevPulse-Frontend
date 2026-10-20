"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "cn"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Items", href: "/items" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/#features" },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  const isLinkActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    if (href.startsWith("/#")) {
      return false
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:opacity-90 transition-opacity"
        >
          <Activity className="size-5 text-primary" />
          <span>DevPulse</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm transition-colors",
                  active
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.name}
              </Link>
            )
          })}
        </nav>

        {/* Right: Auth Buttons (Desktop) */}
        {/* USER DROPDOWN: A user dropdown will replace Login/Register here when authenticated */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline" nativeButton={false}
            render={<Link href="/login" />}
          >
            Login
          </Button>
          <Button
            variant="default" nativeButton={false}
            render={<Link href="/register" />}
          >
            Register
          </Button>
        </div>

        {/* Mobile Hamburger & Sheet */}
        <div className="flex md:hidden items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger 
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col w-72 sm:w-80 p-6">
              <SheetHeader className="text-left p-0">
                <SheetTitle className="flex items-center gap-2">
                  <Activity className="size-5 text-primary" />
                  <span>DevPulse</span>
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Navigation menu
                </SheetDescription>
              </SheetHeader>

              <nav className="flex flex-col gap-4 py-6">
                {navLinks.map((link) => {
                  const active = isLinkActive(link.href)
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "text-base transition-colors",
                        active
                          ? "text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.name}
                    </Link>
                  )
                })}
              </nav>

              {/* USER DROPDOWN: A user dropdown will replace Login/Register here when authenticated */}
              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setOpen(false)} nativeButton={false}
                  render={<Link href="/login" onClick={() => setOpen(false)} />}
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setOpen(false)} nativeButton={false}
                  render={<Link href="/register" onClick={() => setOpen(false)} />}
                >
                  Register
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
