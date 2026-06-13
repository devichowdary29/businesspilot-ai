import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30 border-y">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the perfect plan for your business needs. No hidden fees.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Starter</h3>
            <p className="text-sm text-muted-foreground mb-6">For small businesses just getting started.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹999</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button variant="outline" className="w-full mb-8">Start Free Trial</Button>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Up to 1,000 orders/mo</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Basic Analytics</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Inventory Tracking</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Email Support</div>
            </div>
          </div>

          {/* Growth */}
          <div className="rounded-3xl border-2 border-primary bg-card p-8 shadow-xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Most Popular
            </div>
            <h3 className="font-semibold text-lg mb-2">Growth</h3>
            <p className="text-sm text-muted-foreground mb-6">For scaling teams that need AI insights.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">₹4999</span>
              <span className="text-muted-foreground">/month</span>
            </div>
            <Button className="w-full mb-8">Start Free Trial</Button>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Unlimited orders</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Full AI Business Advisor</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Advanced Forecasting</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Customer Churn Prediction</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Priority 24/7 Support</div>
            </div>
          </div>

          {/* Enterprise */}
          <div className="rounded-3xl border bg-card p-8 shadow-sm">
            <h3 className="font-semibold text-lg mb-2">Enterprise</h3>
            <p className="text-sm text-muted-foreground mb-6">For large organizations with complex needs.</p>
            <div className="mb-6">
              <span className="text-4xl font-bold">Custom</span>
            </div>
            <Button variant="outline" className="w-full mb-8">Contact Sales</Button>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Everything in Growth</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Custom AI Model Training</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> Dedicated Success Manager</div>
              <div className="flex items-center gap-3"><Check className="size-4 text-primary" /> SLA Guarantee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
