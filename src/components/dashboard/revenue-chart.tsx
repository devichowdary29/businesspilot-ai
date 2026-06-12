"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import type { RevenueDataPoint } from "./types"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--primary)",
  },
} satisfies ChartConfig

interface RevenueChartProps {
  data: RevenueDataPoint[]
}

function formatCurrency(value: number): string {
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`
  }
  if (value >= 1000) {
    return `₹${(value / 1000).toFixed(0)}K`
  }
  return `₹${value}`
}

export function RevenueChart({ data }: RevenueChartProps) {
  const latestRevenue = data[data.length - 1]?.revenue ?? 0
  const previousRevenue = data[data.length - 2]?.revenue ?? 0
  const growthPercent =
    previousRevenue > 0
      ? (((latestRevenue - previousRevenue) / previousRevenue) * 100).toFixed(1)
      : "0"

  return (
    <Card className="transition-shadow duration-200 hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>Last 6 months performance</CardDescription>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-sm font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
            <TrendingUp className="size-3.5" />
            +{growthPercent}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 12, left: 12, bottom: 0 }}
          >
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="100%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="stroke-border/40"
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value: string) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatCurrency}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => {
                    const numValue = typeof value === "number" ? value : Number(value)
                    return `₹${numValue.toLocaleString("en-IN")}`
                  }}
                  labelFormatter={(label) => label}
                />
              }
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
              dot={false}
              activeDot={{
                r: 5,
                fill: "var(--color-revenue)",
                stroke: "var(--background)",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
