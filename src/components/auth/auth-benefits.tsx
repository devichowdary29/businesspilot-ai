import { CheckCircle2 } from "lucide-react"

export function AuthBenefits() {
  const benefits = [
    "Increase revenue with AI",
    "Predict customer churn",
    "Prevent inventory shortages",
    "Generate executive reports"
  ]

  return (
    <div className="space-y-4">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Trusted by 5000+ businesses
      </p>
      <div className="space-y-3">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-3">
            <CheckCircle2 className="size-5 text-emerald-500" />
            <span className="font-medium text-foreground/80">{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
