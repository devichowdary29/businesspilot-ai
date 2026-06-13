"use client"

import * as React from "react"
import { Star } from "lucide-react"

export function AuthTestimonial() {
  return (
    <div className="mt-auto rounded-2xl border bg-background/50 p-6 backdrop-blur-sm shadow-xl">
      <div className="flex gap-1 mb-4 text-amber-500">
        <Star className="size-4 fill-current" />
        <Star className="size-4 fill-current" />
        <Star className="size-4 fill-current" />
        <Star className="size-4 fill-current" />
        <Star className="size-4 fill-current" />
      </div>
      <p className="text-sm italic leading-relaxed mb-4 text-muted-foreground">
        "BusinessPilot AI increased our revenue by 28% in just three months. It's like having a full-time data scientist on the team."
      </p>
      <div>
        <p className="font-semibold text-sm">Sarah Chen</p>
        <p className="text-xs text-muted-foreground">Founder, Modern Retail Co.</p>
      </div>
    </div>
  )
}
