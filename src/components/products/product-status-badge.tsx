import { Badge } from "@/components/ui/badge"
import type { ProductStatus } from "./types"

const statusStyles: Record<ProductStatus, string> = {
  Healthy:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-400",
  "Low Stock":
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  Critical:
    "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-400",
}

interface ProductStatusBadgeProps {
  status: ProductStatus
}

export function ProductStatusBadge({ status }: ProductStatusBadgeProps) {
  return (
    <Badge variant="secondary" className={statusStyles[status]}>
      {status}
    </Badge>
  )
}
