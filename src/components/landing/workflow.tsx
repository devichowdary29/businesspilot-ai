import { Database, Sparkles, Zap, ArrowRight } from "lucide-react"

export function Workflow() {
  return (
    <section className="py-24 bg-muted/30 border-y relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A seamless pipeline from raw data to revenue-generating decisions.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-border via-primary/50 to-border -translate-y-1/2 hidden md:block" />
          
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-background rounded-2xl p-6 shadow-xl border relative flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 mb-6 shadow-inner">
                <Database className="size-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Your Business Data</h3>
              <p className="text-sm text-muted-foreground">
                Connect your sales, inventory, and customer databases securely.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-background rounded-2xl p-6 shadow-xl border border-primary/20 relative flex flex-col items-center text-center transform md:-translate-y-4">
              <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-b from-primary to-purple-600 blur opacity-20 -z-10" />
              <div className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white mb-6 shadow-lg shadow-primary/30">
                <Sparkles className="size-8" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-primary">2. BusinessPilot AI</h3>
              <p className="text-sm text-muted-foreground">
                Our AI analyzes patterns, detects risks, and forecasts trends 24/7.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-background rounded-2xl p-6 shadow-xl border relative flex flex-col items-center text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 mb-6 shadow-inner">
                <Zap className="size-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Actionable Decisions</h3>
              <p className="text-sm text-muted-foreground">
                Execute AI-recommended actions to increase revenue and cut costs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
