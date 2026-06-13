"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Box, Code } from "lucide-react"
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs"

export function Navbar() {
  const { isLoaded, isSignedIn } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-8 mx-auto">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Box className="size-5" />
            </div>
            <span className="font-bold tracking-tight text-xl">BusinessPilot AI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="#features" className="transition-colors hover:text-foreground">Features</Link>
          <Link href="#solutions" className="transition-colors hover:text-foreground">Solutions</Link>
          <Link href="#pricing" className="transition-colors hover:text-foreground">Pricing</Link>
          <Link href="#demo" className="transition-colors hover:text-foreground">Demo</Link>
          <Link href="#" className="flex items-center gap-1 transition-colors hover:text-foreground">
            <Code className="size-4" /> GitHub
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {!isLoaded ? null : !isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <Button variant="ghost" className="hidden sm:inline-flex">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button>Get Started</Button>
              </SignUpButton>
            </>
          ) : (
            <>
              <Link href="/dashboard">
                <Button variant="outline" className="hidden sm:inline-flex mr-2">Dashboard</Button>
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </div>
    </header>
  )
}
