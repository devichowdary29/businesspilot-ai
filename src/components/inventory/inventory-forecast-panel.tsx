import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, AlertTriangle, TrendingUp, TrendingDown, FileText, Settings2 } from "lucide-react"

export function InventoryForecastPanel() {
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
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="22.6" className="text-emerald-500" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-foreground">92</span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Score</span>
              </div>
            </div>
            <p className="mt-4 text-center font-medium">Inventory Health is Excellent</p>
            <p className="text-center text-sm text-muted-foreground mt-1">Based on historical run rates and current stock.</p>
          </div>

          <div className="md:w-2/3 space-y-4">
            <div className="rounded-xl border border-amber-200/50 bg-amber-50/50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
              <div className="flex gap-3">
                <AlertTriangle className="size-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-900 dark:text-amber-400 text-sm">
                    Wireless Mouse will run out in 4 days.
                  </p>
                  <div className="mt-2 text-sm text-amber-800 dark:text-amber-500/90 grid gap-1">
                    <p>Expected revenue loss: <span className="font-medium">₹45,000</span></p>
                    <p>Recommended order: <span className="font-medium">Purchase 200 units today.</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Additional Insights</h4>
              
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400">
                  <span className="text-xs">🔥</span>
                </div>
                <p className="text-sm leading-snug">
                  <span className="font-medium">Mechanical Keyboard</span> demand increased by 35%. Maintain current stock levels.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
                  <TrendingUp className="size-3" />
                </div>
                <p className="text-sm leading-snug">
                  <span className="font-medium">USB-C Hub</span> sales are growing faster than expected. Prepare next PO soon.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                  <TrendingDown className="size-3" />
                </div>
                <p className="text-sm leading-snug">
                  Reduce excess stock of slow-moving <span className="font-medium">Webcams</span>. Consider running a promotional campaign.
                </p>
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
