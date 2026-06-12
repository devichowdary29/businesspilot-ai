import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, TrendingUp, CheckCircle2 } from "lucide-react"

interface BusinessReportCardProps {
  onExport: () => void
}

export function BusinessReportCard({ onExport }: BusinessReportCardProps) {
  return (
    <Card className="max-w-md border-primary/20 bg-gradient-to-br from-background to-primary/[0.02] shadow-md">
      <CardHeader className="pb-4 border-b">
        <CardTitle className="text-base flex items-center justify-between">
          <span>AI Weekly Business Report</span>
          <div className="flex items-center gap-1.5 text-xs font-normal text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400 px-2 py-0.5 rounded-full">
            <TrendingUp className="size-3" />
            Active
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted/40 p-3 text-center">
            <p className="text-xs text-muted-foreground">Health</p>
            <p className="text-xl font-bold mt-1 text-primary">92<span className="text-sm text-muted-foreground font-normal">/100</span></p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3 text-center">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold mt-1 text-emerald-600 dark:text-emerald-400">↑ 18%</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3 text-center">
            <p className="text-xs text-muted-foreground">Risk</p>
            <p className="text-lg font-bold mt-1 text-emerald-600 dark:text-emerald-400">Low</p>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Key Opportunities</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Increase accessory promotions to clear stock</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Restock top-selling products (Wireless Mouse)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Re-engage inactive VIP customers</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="flex-1 gap-2" variant="default" onClick={onExport}>
            <Download className="size-4" /> Export PDF
          </Button>
          <Button className="flex-1 gap-2" variant="outline">
            <Share2 className="size-4" /> Share Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
