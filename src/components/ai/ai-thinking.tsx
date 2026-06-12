"use client"

import { Sparkles, CheckCircle2 } from "lucide-react"
import * as React from "react"

export function AiThinking() {
  const [steps, setSteps] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setSteps(s => Math.min(s + 1, 4))
    }, 800)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex w-full justify-start mb-6 animate-in fade-in duration-300">
      <div className="flex max-w-[85%] gap-4 flex-row">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg shadow-sm bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white animate-pulse">
          <Sparkles className="size-4" />
        </div>

        <div className="rounded-2xl px-5 py-4 text-sm shadow-sm bg-card border text-card-foreground rounded-tl-sm">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <span className="size-2 rounded-full bg-primary animate-ping" />
            BusinessPilot AI is analyzing:
          </p>
          <div className="space-y-2 text-muted-foreground">
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${steps >= 0 ? "opacity-100" : "opacity-0"}`}>
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Revenue trends
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${steps >= 1 ? "opacity-100" : "opacity-0"}`}>
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Customer behavior
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${steps >= 2 ? "opacity-100" : "opacity-0"}`}>
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Inventory forecasts
            </div>
            <div className={`flex items-center gap-2 transition-opacity duration-300 ${steps >= 3 ? "opacity-100" : "opacity-0"}`}>
              <CheckCircle2 className="size-3.5 text-emerald-500" /> Product performance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
