import { Button } from "@/components/ui/button"
import { ArrowRight, Play, TrendingUp, Sparkles, AlertTriangle, Users } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8 max-w-2xl">
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                <Sparkles className="mr-2 size-3.5" />
                Next-Gen Business Operating System
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
                Your AI Business Analyst.<br className="hidden md:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">
                  Available 24/7.
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
                Turn your business data into revenue growth, customer insights, and smarter decisions using AI-powered analytics.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="gap-2">
                <Link href="/dashboard">
                  Start Free Trial <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="size-4" /> Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">No credit card required • 14-day free trial</p>
          </div>

          {/* Abstract Interface Mockup */}
          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-primary/30 to-purple-500/30 blur-2xl opacity-50" />
            
            <div className="relative rounded-2xl border bg-background/50 backdrop-blur-xl p-4 shadow-2xl space-y-4">
              {/* Top Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border bg-card/80 p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <TrendingUp className="size-4 text-emerald-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Revenue Growth</span>
                  </div>
                  <div className="text-2xl font-bold">₹12.4L</div>
                  <div className="mt-1 text-xs text-emerald-500">+18% this month</div>
                </div>

                <div className="rounded-xl border bg-card/80 p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="size-4 text-blue-500" />
                    <span className="text-xs font-medium uppercase tracking-wider">Customer Health</span>
                  </div>
                  <div className="text-2xl font-bold">92<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                  <div className="mt-1 text-xs text-blue-500">Excellent standing</div>
                </div>
              </div>

              {/* Middle Row */}
              <div className="rounded-xl border bg-gradient-to-r from-purple-500/10 to-primary/10 p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                    <Sparkles className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Insight Generated</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Mechanical Keyboard demand increased by 35%. Recommend purchasing 200 units.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 shadow-sm transition-transform hover:-translate-y-1 duration-300">
                <div className="flex gap-3 items-center">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-amber-600">
                    <AlertTriangle className="size-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-amber-700 dark:text-amber-500">Inventory Alert</h3>
                    <p className="text-xs text-amber-600/80 dark:text-amber-500/80 mt-0.5">
                      Wireless Mouse stock is critically low (4 days left).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
