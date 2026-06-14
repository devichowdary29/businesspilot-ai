import { Card, CardContent } from "@/components/ui/card"
import { InventoryHealthBadge } from "./inventory-health-badge"
import { Sparkles, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { InventoryItem } from "./types"

interface InventoryCardProps {
  item: InventoryItem
  onAction: (item: InventoryItem, action: "view" | "reorder" | "edit") => void
}

export function InventoryCard({ item, onAction }: InventoryCardProps) {
  return (
    <Card 
      className="group/inv-card cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-primary/5"
      onClick={() => onAction(item, "view")}
    >
      <CardContent className="p-0 flex flex-col h-full">
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl bg-muted">
          <img 
            src={item.productImage} 
            alt={item.productName}
            className="size-full object-cover transition-transform duration-500 group-hover/inv-card:scale-105"
          />
          <div className="absolute top-3 left-3">
            <InventoryHealthBadge level={item.riskLevel} />
          </div>
          <div className="absolute top-3 right-3 opacity-0 group-hover/inv-card:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className="size-8 rounded-full shadow-md bg-background/80 backdrop-blur hover:bg-background"
              onClick={(e) => {
                e.stopPropagation()
                onAction(item, "edit")
              }}
            >
              <Edit className="size-4 text-foreground" />
            </Button>
          </div>
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <div className="mb-4">
            <h3 className="truncate font-semibold text-lg">{item.productName}</h3>
            <p className="font-mono text-xs text-muted-foreground mt-0.5">{item.sku} • {item.supplierName}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-lg bg-muted/40 p-3 text-sm mb-4">
            <div>
              <p className="text-muted-foreground text-xs">Stock Level</p>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-semibold text-base">{item.currentStock}</span>
                <span className="text-[10px] text-muted-foreground">/ Min {item.minimumStock}</span>
              </div>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Days Remaining</p>
              <p className="font-semibold text-base mt-0.5">{item.daysUntilStockout}</p>
            </div>
          </div>

          <div className="mt-auto pt-3 border-t">
            <div className="flex gap-2 text-xs">
              <Sparkles className="size-3.5 text-purple-500 shrink-0 mt-0.5" />
              <span className="text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground mr-1">AI:</span>
                {item.aiRecommendation}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
