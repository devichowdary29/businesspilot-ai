"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowLeft, Loader2, MailCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsSent(true)
    }, 1500)
  }

  if (isSent) {
    return (
      <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400">
          <MailCheck className="size-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Check your inbox</h2>
          <p className="text-muted-foreground">
            A password recovery link has been sent. Please check your email to continue.
          </p>
        </div>
        <Button variant="outline" className="w-full h-11" asChild>
          <Link href="/login">Return to login</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Reset your password</h2>
        <p className="text-muted-foreground">Enter your email and we’ll send a recovery link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@company.com" required className="h-11" />
        </div>

        <Button type="submit" className="w-full h-11" disabled={isLoading}>
          {isLoading ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          Send Reset Link
        </Button>
      </form>

      <div className="text-center">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 size-4" />
          Back to login
        </Link>
      </div>
    </div>
  )
}
