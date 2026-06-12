import { ArrowUpRight, AlertTriangle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { KpiCardData } from "./types"

interface KpiCardsProps {
  cards: KpiCardData[]
}

export function KpiCards({ cards }: KpiCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="group/kpi transition-shadow duration-200 hover:shadow-md"
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {card.title}
              </p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground transition-colors group-hover/kpi:bg-primary/10 group-hover/kpi:text-primary">
                <card.icon className="size-4" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold tracking-tight">{card.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {card.changeType === "positive" && (
                  <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
                {card.changeType === "neutral" && (
                  <AlertTriangle className="size-3.5 text-amber-500 dark:text-amber-400" />
                )}
                <p
                  className={
                    card.changeType === "positive"
                      ? "text-xs font-medium text-emerald-600 dark:text-emerald-400"
                      : card.changeType === "neutral"
                        ? "text-xs font-medium text-amber-600 dark:text-amber-400"
                        : "text-xs font-medium text-red-600 dark:text-red-400"
                  }
                >
                  {card.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
