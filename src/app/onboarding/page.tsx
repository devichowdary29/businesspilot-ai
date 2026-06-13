"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Box } from "lucide-react";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="absolute top-1/2 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-[100px] bg-primary/30 rounded-full mix-blend-screen dark:bg-primary/20"></div>
      
      <div className="z-10 w-full max-w-md px-4 sm:px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="mb-8 flex flex-col items-center text-center">
          <Link href="/" className="flex items-center gap-2 mb-6 transition-opacity hover:opacity-80">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Box className="size-6" />
            </div>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to BusinessPilot AI</h1>
          <p className="text-muted-foreground">
            Let's set up your workspace. Create your first organization to start managing products, customers, orders, and AI insights.
          </p>
        </div>

        <div className="flex justify-center w-full rounded-2xl bg-card border shadow-xl p-2 sm:p-4">
          <CreateOrganization
            routing="path"
            path="/onboarding"
            appearance={{
              elements: {
                rootBox: "w-full max-w-full",
                cardBox: "shadow-none border-none",
                card: "bg-transparent shadow-none",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
