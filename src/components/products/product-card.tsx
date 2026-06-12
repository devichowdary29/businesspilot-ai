import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AiInsightType, Product } from "./types"
import { ProductStatusBadge } from "./product-status-badge"

interface ProductCardProps {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

const aiInsightStyles: Record<AiInsightType, string> = {
  trending:
    "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-400",
  restock:
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400",
  "slow-moving":
    "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-400",
  "bundle-opportunity":
    "bg-blue-100 text-blue-800 dark:bg-blue-500/15 dark:text-blue-400",
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  void onEdit
  void onDelete

  return (
    <Card className="group/product-card transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
      <CardContent>
        <div className="aspect-video overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="size-full object-cover transition-transform duration-300 group-hover/product-card:scale-105"
          />
        </div>

        <div className="space-y-2 pt-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {product.category}
            </span>
            <ProductStatusBadge status={product.status} />
          </div>

          <h3 className="truncate font-semibold">{product.name}</h3>

          <p className="line-clamp-2 text-xs text-muted-foreground">
            {product.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="font-bold">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-muted-foreground">
              {product.stockQuantity} in stock
            </span>
          </div>

          <Badge
            variant="secondary"
            className={aiInsightStyles[product.aiInsight.type]}
          >
            {product.aiInsight.emoji} {product.aiInsight.label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
