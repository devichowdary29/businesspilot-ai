import { Star } from "lucide-react"

export function Testimonials() {
  const testimonials = [
    {
      quote: "BusinessPilot AI helped us increase revenue by 28% in three months. The inventory forecasting alone saved us from massive stockouts during the holiday season.",
      author: "Sarah Chen",
      role: "Founder, Modern Retail Co."
    },
    {
      quote: "It literally feels like having a Harvard MBA analyzing our data 24/7. We identified and prevented churn for 50+ VIP customers within the first week.",
      author: "Marcus Johnson",
      role: "CEO, TechGear Direct"
    },
    {
      quote: "The automated executive reports save me 10 hours a week. I just log in, check the AI advisor, and I immediately know exactly what my team needs to focus on today.",
      author: "Priya Sharma",
      role: "Operations Director, Lumina"
    }
  ]

  return (
    <section className="py-24">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Loved by founders</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our customers have to say.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex gap-1 mb-6 text-amber-500">
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
                <Star className="size-4 fill-current" />
              </div>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                "{t.quote}"
              </p>
              <div>
                <p className="font-semibold">{t.author}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
