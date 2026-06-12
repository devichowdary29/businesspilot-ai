import { Card, CardContent } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, AlertTriangle } from "lucide-react"
import type { InventoryStatsData } from "./types"

interface InventoryStatsProps {
  stats: InventoryStatsData[]
}

export function InventoryStats({ stats }: InventoryStatsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card
          key={stat.title}
          className="group/stat transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
        >
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </p>
              <div className="flex size-9 items-center justify-center rounded-lg bg-muted/60 text-muted-foreground transition-colors group-hover/stat:bg-primary/10 group-hover/stat:text-primary">
                <stat.icon className="size-4" />
              </div>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              <div className="mt-1 flex items-center gap-1">
                {stat.changeType === "positive" && (
                  <ArrowUpRight className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                )}
                {stat.changeType === "negative" && (
                  <ArrowDownRight className="size-3.5 text-red-600 dark:text-red-400" />
                )}
                {stat.changeType === "neutral" && (
                  <AlertTriangle className="size-3.5 text-amber-500 dark:text-amber-400" />
                )}
                <p
                  className={
                    stat.changeType === "positive"
                      ? "text-xs font-medium text-emerald-600 dark:text-emerald-400"
                      : stat.changeType === "neutral"
                        ? "text-xs font-medium text-amber-600 dark:text-amber-400"
                        : "text-xs font-medium text-red-600 dark:text-red-400"
                  }
                >
                  {stat.change}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
