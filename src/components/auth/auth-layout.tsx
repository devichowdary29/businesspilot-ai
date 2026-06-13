import Link from "next/link"
import { Box, TrendingUp, Users, AlertTriangle } from "lucide-react"
import { AuthBenefits } from "./auth-benefits"
import { AuthTestimonial } from "./auth-testimonial"

interface AuthLayoutProps {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel - Branding & Visuals */}
      <div className="relative hidden lg:flex flex-col bg-muted/30 border-r p-12 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        
        {/* Abstract Floating Shapes */}
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col h-full">
          <Link href="/" className="flex items-center gap-2 mb-16 transition-opacity hover:opacity-80 w-fit">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Box className="size-5" />
            </div>
            <span className="font-bold tracking-tight text-xl">BusinessPilot AI</span>
          </Link>

          <div className="max-w-md mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Your AI Business Analyst.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 dark:to-purple-400">
                Available 24/7.
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Join thousands of modern businesses using AI to optimize operations and accelerate growth.
            </p>
          </div>

          <AuthBenefits />

          {/* Floating Metric Cards */}
          <div className="relative h-48 w-full max-w-md mt-12 mb-8 hidden xl:block">
            <div className="absolute top-0 left-0 rounded-xl border bg-background/60 backdrop-blur-md p-4 shadow-xl animate-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <TrendingUp className="size-4 text-emerald-500" />
                <span className="text-xs font-semibold uppercase">Revenue Growth</span>
              </div>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">+28%</p>
            </div>

            <div className="absolute top-12 right-0 rounded-xl border bg-background/60 backdrop-blur-md p-4 shadow-xl animate-in slide-in-from-bottom-8 duration-700 delay-150">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="size-4 text-blue-500" />
                <span className="text-xs font-semibold uppercase">Customer Retention</span>
              </div>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">+15%</p>
            </div>

            <div className="absolute bottom-0 left-12 rounded-xl border bg-background/60 backdrop-blur-md p-4 shadow-xl animate-in slide-in-from-bottom-12 duration-700 delay-300">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <AlertTriangle className="size-4 text-amber-500" />
                <span className="text-xs font-semibold uppercase">Inventory Risk</span>
              </div>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">-40%</p>
            </div>
          </div>

          <AuthTestimonial />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-24 relative">
        <div className="absolute top-8 left-8 lg:hidden">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Box className="size-5" />
            </div>
            <span className="font-bold tracking-tight text-xl">BusinessPilot AI</span>
          </Link>
        </div>
        
        <div className="mx-auto w-full max-w-sm">
          {children}
        </div>
      </div>
    </div>
  )
}
