import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Star, Clock, ShieldCheck } from "lucide-react"

export function SupplierInfoCard() {
  return (
    <Card className="h-full border-primary/10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base">Supplier Intelligence</CardTitle>
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400 gap-1 border-emerald-200 dark:border-emerald-500/20">
            <ShieldCheck className="size-3" /> Preferred
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-xl border bg-card p-4 shadow-sm flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
            <span className="text-lg font-bold">95%</span>
          </div>
          <div>
            <p className="font-semibold">Reliability Score</p>
            <p className="text-xs text-muted-foreground">Excellent standing</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="size-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Avg. Delivery</p>
            </div>
            <p className="font-semibold text-sm">8 Days</p>
          </div>
          <div className="rounded-lg bg-muted/40 p-3">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="size-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Last Order</p>
            </div>
            <p className="font-semibold text-sm">22 May 2026</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted/40 p-3 flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground">Supplier Rating</p>
          <div className="flex gap-0.5 text-amber-500">
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current" />
            <Star className="size-3.5 fill-current opacity-30" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
