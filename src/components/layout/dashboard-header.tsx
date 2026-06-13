"use client"

import React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Bell, Search } from "lucide-react"

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbSegment {
  label: string
  href: string
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/products": "Products",
  "/dashboard/customers": "Customers",
  "/dashboard/orders": "Orders",
  "/dashboard/inventory": "Inventory",
  "/dashboard/ai-advisor": "AI Advisor",
  "/dashboard/settings": "Settings",
}

function generateBreadcrumbs(pathname: string): BreadcrumbSegment[] {
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbSegment[] = []

  let currentPath = ""
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label =
      pageTitles[currentPath] ??
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    breadcrumbs.push({ label, href: currentPath })
  }

  return breadcrumbs
}

function HeaderBreadcrumbs() {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  if (breadcrumbs.length <= 1) return null

  return (
    <>
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1

            return (
              <React.Fragment key={crumb.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>{crumb.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  )
}

function HeaderSearch() {
  return (
    <div className="relative hidden md:flex">
      <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search…"
        className="w-56 pl-8 lg:w-72"
        aria-label="Search"
      />
    </div>
  )
}



export function DashboardHeader() {
  const pathname = usePathname()
  const pageTitle =
    pageTitles[pathname] ??
    pathname
      .split("/")
      .pop()
      ?.split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ") ??
    "Dashboard"

  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60">
      <div className="flex flex-1 items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 hidden h-4 md:block" />
        <h1 className="text-sm font-semibold tracking-tight md:text-base">
          {pageTitle}
        </h1>
        <div className="hidden md:flex">
          <HeaderBreadcrumbs />
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <HeaderSearch />

        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
        </Button>

        <Separator orientation="vertical" className="mx-1 hidden h-5 md:block" />

        <div className="flex items-center gap-3 ml-2">
          <OrganizationSwitcher 
            hidePersonal
            afterCreateOrganizationUrl="/dashboard"
            afterLeaveOrganizationUrl="/onboarding"
            afterSelectOrganizationUrl="/dashboard"
            appearance={{
              elements: {
                organizationSwitcherTrigger: "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              }
            }}
          />
          <UserButton />
        </div>
      </div>
    </header>
  )
}
