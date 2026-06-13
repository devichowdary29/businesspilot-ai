export function TrustedBy() {
  const industries = ["Retail", "E-commerce", "Agencies", "Manufacturing", "Restaurants", "Healthcare"]

  return (
    <section className="py-10 border-y bg-muted/20">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-2xl">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
          Trusted by 5000+ growing businesses across industries
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {industries.map((industry) => (
            <div key={industry} className="text-lg font-bold tracking-tight text-foreground/80 flex items-center gap-2">
              <div className="size-6 rounded-md bg-foreground/10" />
              {industry}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
