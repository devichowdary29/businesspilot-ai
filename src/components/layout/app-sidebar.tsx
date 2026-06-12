"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  Warehouse,
  Sparkles,
  Settings,
  ChevronsUpDown,
  LogOut,
  CreditCard,
  type LucideIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar"
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

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

const mainNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Orders",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    badge: "12",
  },
  {
    title: "Inventory",
    href: "/dashboard/inventory",
    icon: Warehouse,
  },
]

const secondaryNavItems: NavItem[] = [
  {
    title: "AI Advisor",
    href: "/dashboard/ai-advisor",
    icon: Sparkles,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

function SidebarLogo() {
  const { state } = useSidebar()

  return (
    <Link
      href="/dashboard"
      className="flex items-center gap-2.5 px-1 py-0.5 transition-opacity hover:opacity-80"
    >
      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Sparkles className="size-4" />
      </div>
      {state === "expanded" && (
        <div className="flex flex-col gap-0.5 leading-none">
          <span className="font-heading text-sm font-semibold tracking-tight">
            BusinessPilot
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
            AI
          </span>
        </div>
      )}
    </Link>
  )
}

function NavSection({
  label,
  items,
}: {
  label: string
  items: NavItem[]
}) {
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href)

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  tooltip={item.title}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function SidebarUserFooter() {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar size="sm">
                <AvatarImage
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=Felix"
                  alt="User avatar"
                />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">John Parker</span>
                <span className="truncate text-xs text-muted-foreground">
                  john@businesspilot.ai
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium leading-none">John Parker</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@businesspilot.ai
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CreditCard className="mr-2 size-4" />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Settings
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 size-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <NavSection label="Platform" items={mainNavItems} />
        <NavSection label="Tools" items={secondaryNavItems} />
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarUserFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
