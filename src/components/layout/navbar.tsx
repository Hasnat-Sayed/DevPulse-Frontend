"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Activity, ChevronDown, LayoutList, LogOut, Menu, PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/context/auth-context"
import { cn } from "cn"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Items", href: "/items" },
  { name: "About", href: "/about" },
  { name: "Features", href: "/#features" },
]

function getInitials(name?: string): string {
  if (!name) return "U"
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, logout } = useAuth()
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

  const handleLogout = () => {
    logout()
    toast.success("Logged out")
    router.push("/")
  }

  const firstName = user?.name ? user.name.trim().split(/\s+/)[0] : ""

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
        <div className="hidden md:flex items-center gap-3">
          {loading ? (
            <Skeleton className="h-9 w-24 rounded-md" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="group flex items-center gap-2 px-2.5 py-1.5 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  />
                }
              >
                <Avatar size="sm">
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block text-sm font-medium text-foreground">
                  {firstName}
                </span>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-[popup-open]:rotate-180 group-data-open:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-64 rounded-xl border border-border p-1.5 shadow-xl shadow-black/40"
              >
                <DropdownMenuGroup className="flex items-center gap-3 p-2">
                  <Avatar size="lg">
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span
                      title={user.name}
                      className="text-sm font-medium text-foreground truncate"
                    >
                      {user.name}
                    </span>
                    <span
                      title={user.email}
                      className="text-xs text-muted-foreground truncate"
                    >
                      {user.email}
                    </span>
                    <div className="mt-1">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {user.role}
                      </Badge>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="-mx-1.5 my-1.5" />
                <DropdownMenuItem
                  render={<Link href="/items/add" />}
                  className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-accent focus:bg-accent"
                >
                  <PlusCircle className="size-4" />
                  <span>Add Issue</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  render={<Link href="/items/manage" />}
                  className="cursor-pointer rounded-lg px-3 py-2 transition-colors hover:bg-accent focus:bg-accent"
                >
                  <LayoutList className="size-4" />
                  <span>Manage Issues</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="-mx-1.5 my-1.5" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer rounded-lg px-3 py-2 text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10 focus:text-destructive dark:hover:bg-destructive/10 dark:focus:bg-destructive/10"
                >
                  <LogOut className="size-4 text-destructive" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="outline"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                Login
              </Button>
              <Button
                variant="default"
                nativeButton={false}
                render={<Link href="/register" />}
              >
                Register
              </Button>
            </>
          )}
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

              <div className="mt-auto flex flex-col gap-3 pt-6 border-t border-border">
                {loading ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : user ? (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">
                          {user.name}
                        </span>
                        <span className="text-xs text-muted-foreground truncate">
                          {user.email}
                        </span>
                      </div>
                      <Badge variant="secondary" className="capitalize shrink-0">
                        {user.role}
                      </Badge>
                    </div>

                    <div className="flex flex-col gap-1 border-t border-border/50 pt-2">
                      <Link
                        href="/items/add"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        Add Issue
                      </Link>
                      <Link
                        href="/items/manage"
                        onClick={() => setOpen(false)}
                        className="rounded-md px-2 py-1.5 text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        Manage Issues
                      </Link>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={() => {
                        setOpen(false)
                        handleLogout()
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setOpen(false)}
                      nativeButton={false}
                      render={<Link href="/login" onClick={() => setOpen(false)} />}
                    >
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => setOpen(false)}
                      nativeButton={false}
                      render={<Link href="/register" onClick={() => setOpen(false)} />}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
