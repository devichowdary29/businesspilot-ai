import { Sparkles, TrendingUp, Users, Package, ShoppingCart, FileText } from "lucide-react"

export function Features() {
  const features = [
    {
      title: "AI Business Advisor",
      description: "Ask AI anything about your business.",
      icon: Sparkles,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Revenue Intelligence",
      description: "Discover opportunities to increase profit.",
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Customer Insights",
      description: "Predict churn and identify high-value customers.",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Smart Inventory",
      description: "Prevent stockouts before they happen.",
      icon: Package,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "Order Analytics",
      description: "Understand your sales pipeline.",
      icon: ShoppingCart,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
    {
      title: "Automated Reports",
      description: "Generate executive reports instantly.",
      icon: FileText,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to scale</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A complete suite of intelligent tools designed to give you complete visibility and control over your operations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div 
              key={feature.title} 
              className="group relative overflow-hidden rounded-2xl border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${feature.bg} ${feature.color}`}>
                <feature.icon className="size-6" />
              </div>
              <h3 className="mb-2 font-semibold text-lg">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
