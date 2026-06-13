import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl text-center">
        <div className="max-w-3xl mx-auto space-y-8 bg-background/50 backdrop-blur-sm border rounded-3xl p-8 md:p-16 shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Ready to make smarter business decisions?</h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Join thousands of modern businesses using AI to optimize their operations, reduce costs, and accelerate growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" asChild className="gap-2">
              <Link href="/dashboard">
                Start Building With AI <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
