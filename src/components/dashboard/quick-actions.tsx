import Link from "next/link"
import { Plus, ShoppingCart, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickAction {
  label: string
  href: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  variant: "default" | "outline" | "secondary"
}

const quickActions: QuickAction[] = [
  {
    label: "Add Product",
    href: "/dashboard/products",
    icon: Plus,
    variant: "outline",
  },
  {
    label: "Create Order",
    href: "/dashboard/orders",
    icon: ShoppingCart,
    variant: "outline",
  },
  {
    label: "Add Customer",
    href: "/dashboard/customers",
    icon: Users,
    variant: "outline",
  },
  {
    label: "Ask AI",
    href: "/dashboard/ai-advisor",
    icon: Sparkles,
    variant: "default",
  },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {quickActions.map((action) => (
        <Link key={action.label} href={action.href}>
          <Button variant={action.variant} className="gap-2">
            <action.icon className="size-4" />
            {action.label}
          </Button>
        </Link>
      ))}
    </div>
  )
}