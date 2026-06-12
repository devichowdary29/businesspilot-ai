import {
  Sparkles,
  FileText,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { AiInsight, AiAction } from "./types"

interface AiAdvisorCardProps {
  healthScore: number
  insights: AiInsight[]
  actions: AiAction[]
}

function HealthScoreRing({ score }: { score: number }) {
  const circumference = 2 * Math.PI * 40
  const offset = circumference - (score / 100) * circumference
  const color =
    score >= 80
      ? "text-emerald-500"
      : score >= 60
        ? "text-amber-500"
        : "text-red-500"
  const strokeColor =
    score >= 80
      ? "stroke-emerald-500"
      : score >= 60
        ? "stroke-amber-500"
        : "stroke-red-500"

  return (
    <div className="relative flex size-28 items-center justify-center">
      <svg className="-rotate-90" width="112" height="112" viewBox="0 0 112 112">
        <circle
          cx="56"
          cy="56"
          r="40"
          fill="none"
          className="stroke-muted"
          strokeWidth="8"
        />
        <circle
          cx="56"
          cy="56"
          r="40"
          fill="none"
          className={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-2xl font-bold ${color}`}>{score}</span>
        <span className="text-[10px] font-medium text-muted-foreground">
          / 100
        </span>
      </div>
    </div>
  )
}

export function AiAdvisorCard({
  healthScore,
  insights,
  actions,
}: AiAdvisorCardProps) {
  return (
    <Card className="relative overflow-hidden border-primary/20 transition-shadow duration-200 hover:shadow-lg">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02]" />
      <CardHeader className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </div>
            <div>
              <CardTitle className="text-lg">AI Business Advisor</CardTitle>
              <CardDescription>
                Real-time insights powered by AI
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="gap-1">
            <TrendingUp className="size-3" />
            Healthy
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <div className="flex flex-col items-center gap-4 rounded-xl bg-muted/40 p-5 sm:flex-row sm:items-start">
          <HealthScoreRing score={healthScore} />
          <div className="flex-1 space-y-3">
            <div>
              <h4 className="text-sm font-semibold">Business Health Score</h4>
              <p className="text-xs text-muted-foreground">
                Based on revenue, inventory, and customer metrics
              </p>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-emerald-500 transition-all duration-1000 ease-out"
                style={{ width: `${healthScore}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Key Insights</h4>
          <div className="space-y-2.5">
            {insights.map((insight, i) => (
              <div
                key={i}
                className="flex items-start gap-2.5 rounded-lg border bg-background/60 p-3 transition-colors hover:bg-muted/40"
              >
                <AlertCircle className="mt-0.5 size-4 shrink-0 text-amber-500" />
                <p className="text-sm leading-relaxed text-foreground/90">
                  {insight.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Recommended Actions</h4>
          <div className="space-y-2">
            {actions.map((action, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 rounded-lg border border-emerald-200/60 bg-emerald-50/50 p-3 dark:border-emerald-500/20 dark:bg-emerald-500/5"
              >
                <CheckCircle2 className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm font-medium text-emerald-900 dark:text-emerald-300">
                  {action.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:flex-row">
          <Button className="gap-2">
            <FileText className="size-4" />
            Generate AI Report
          </Button>
          <Button variant="outline" className="gap-2">
            <MessageSquare className="size-4" />
            Ask AI Advisor
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
