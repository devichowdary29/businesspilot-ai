import { Plus, ShoppingCart, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickAction {
  label: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  variant: "default" | "outline" | "secondary"
}

const quickActions: QuickAction[] = [
  { label: "Add Product", icon: Plus, variant: "outline" },
  { label: "Create Order", icon: ShoppingCart, variant: "outline" },
  { label: "Add Customer", icon: Users, variant: "outline" },
  { label: "Ask AI", icon: Sparkles, variant: "default" },
]

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2.5">
      {quickActions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant}
          className="gap-2"
        >
          <action.icon className="size-4" />
          {action.label}
        </Button>
      ))}
    </div>
  )
}
