import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown, FileText, Settings2 } from "lucide-react"

import type { InventoryIntelligenceState } from "@/actions/inventory/types"

export function InventoryForecastPanel({ intelligence }: { intelligence?: InventoryIntelligenceState["data"] }) {
  const score = intelligence?.healthScore ?? 0;
  const strokeDashoffset = 282.7 - (282.7 * score) / 100;
  
  let scoreColorClass = "text-emerald-500";
  let statusText = "Excellent";
  if (score < 40) {
    scoreColorClass = "text-red-500";
    statusText = "Critical";
  } else if (score < 70) {
    scoreColorClass = "text-amber-500";
    statusText = "Needs Attention";
  } else if (score < 90) {
    scoreColorClass = "text-blue-500";
    statusText = "Good";
  }

  return (
    <Card className="h-full border-primary/20 bg-gradient-to-br from-background via-background to-primary/[0.03]">
      <CardHeader className="pb-3 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </div>
          <CardTitle>AI Inventory Forecast</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="md:w-1/3 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border/50 pb-6 md:pb-0 pr-0 md:pr-6">
            <div className="relative size-32">
              <svg className="size-full -rotate-90 transform" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted/50" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset={strokeDashoffset} className={scoreColorClass} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">{score}</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Score</span>
              </div>
            </div>
            <p className="mt-4 text-center font-medium">Inventory Health is {statusText}</p>
            <p className="text-center text-sm text-muted-foreground mt-1">Based on minimum stock thresholds.</p>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="rounded-xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex gap-3">
                <Sparkles className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-primary text-sm">
                    {intelligence?.insight1}
                  </p>
                  <div className="mt-2 text-sm text-muted-foreground grid gap-1">
                    <p>{intelligence?.insight2}</p>
                    <p className="text-foreground mt-1"><span className="font-medium text-primary">Recommendation:</span> {intelligence?.recommendation}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Button className="gap-2">
                <FileText className="size-4" /> Generate Forecast Report
              </Button>
              <Button variant="secondary" className="gap-2">
                <Settings2 className="size-4" /> Optimize Inventory
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
