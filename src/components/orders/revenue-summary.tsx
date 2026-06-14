"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"


import type { OrderForecastState, ChartDataPoint } from "@/actions/orders/types"

export function RevenueSummary({ forecast, chartData }: { forecast?: OrderForecastState["data"], chartData?: ChartDataPoint[] }) {
  return (
    <Card className="overflow-hidden border-primary/10 transition-shadow duration-200 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.01]" />
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Performance</CardTitle>
            <CardDescription>Monthly revenue trend vs profit</CardDescription>
          </div>
          <Badge variant="secondary" className="gap-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
            <TrendingUp className="size-3" />
            +18% M/M
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="relative space-y-6">
        <div className="h-[200px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData || []} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/40" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tickMargin={8} className="text-xs" />
              <Tooltip 
                formatter={(value: any) => `₹${(Number(value)/100000).toFixed(2)}L`}
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)' }}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorProfit)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-primary/10 bg-primary/5 p-4 flex gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="size-4" />
          </div>
          <div>
            <p className="text-sm font-medium leading-relaxed">
              {forecast?.insight1} {forecast?.insight2}
            </p>
            {forecast?.recommendation && (
              <div className="mt-2 rounded-md bg-background/60 p-2 text-sm border shadow-sm">
                <span className="font-semibold text-primary">Recommendation:</span> {forecast.recommendation}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
