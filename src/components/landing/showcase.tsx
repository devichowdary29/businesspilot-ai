"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, Package, Users, Sparkles } from "lucide-react"

export function Showcase() {
  return (
    <section id="solutions" className="py-24">
      <div className="container px-4 md:px-8 mx-auto max-w-screen-xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Built for every team</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            A unified workspace that gives every department the AI-powered tools they need.
          </p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl h-auto p-1 bg-muted/50">
              <TabsTrigger value="dashboard" className="py-2.5 data-[state=active]:shadow-sm">
                <LayoutDashboard className="size-4 mr-2 hidden sm:block" /> Dashboard
              </TabsTrigger>
              <TabsTrigger value="products" className="py-2.5 data-[state=active]:shadow-sm">
                <Package className="size-4 mr-2 hidden sm:block" /> Products
              </TabsTrigger>
              <TabsTrigger value="customers" className="py-2.5 data-[state=active]:shadow-sm">
                <Users className="size-4 mr-2 hidden sm:block" /> Customers
              </TabsTrigger>
              <TabsTrigger value="advisor" className="py-2.5 data-[state=active]:shadow-sm">
                <Sparkles className="size-4 mr-2 hidden sm:block" /> AI Advisor
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="mx-auto max-w-4xl relative rounded-xl border bg-background shadow-2xl overflow-hidden aspect-video">
            <TabsContent value="dashboard" className="m-0 h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent p-8 flex flex-col">
                <div className="h-8 w-1/3 bg-muted rounded-md mb-8 animate-pulse" />
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="h-24 bg-card rounded-xl border shadow-sm" />
                  <div className="h-24 bg-card rounded-xl border shadow-sm" />
                  <div className="h-24 bg-card rounded-xl border shadow-sm" />
                </div>
                <div className="flex-1 bg-card rounded-xl border shadow-sm" />
              </div>
            </TabsContent>

            <TabsContent value="products" className="m-0 h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent p-8 flex flex-col">
                <div className="flex justify-between mb-8">
                  <div className="h-8 w-1/4 bg-muted rounded-md animate-pulse" />
                  <div className="h-8 w-1/6 bg-muted rounded-md animate-pulse" />
                </div>
                <div className="grid grid-cols-4 gap-4 flex-1">
                  {[1,2,3,4,5,6,7,8].map(i => (
                    <div key={i} className="bg-card rounded-xl border shadow-sm h-32" />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="customers" className="m-0 h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent p-8 flex flex-col">
                <div className="h-8 w-1/4 bg-muted rounded-md mb-8 animate-pulse" />
                <div className="flex-1 bg-card rounded-xl border shadow-sm flex flex-col p-4">
                  <div className="border-b pb-4 flex justify-between">
                     <div className="h-4 w-1/3 bg-muted rounded" />
                     <div className="h-4 w-1/4 bg-muted rounded" />
                  </div>
                  <div className="space-y-4 pt-4 flex-1">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-8 bg-muted/50 rounded" />
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advisor" className="m-0 h-full w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent p-8 flex">
                <div className="w-1/4 border-r pr-4 hidden md:block">
                  <div className="h-8 bg-muted rounded-md mb-4" />
                  <div className="space-y-2">
                    {[1,2,3].map(i => <div key={i} className="h-10 bg-muted/50 rounded-md" />)}
                  </div>
                </div>
                <div className="flex-1 pl-0 md:pl-4 flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="w-1/2 h-16 bg-muted rounded-xl rounded-tl-sm self-start" />
                    <div className="w-2/3 h-24 bg-primary/20 rounded-xl rounded-tr-sm self-end ml-auto" />
                  </div>
                  <div className="h-12 bg-muted rounded-xl mt-4" />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  )
}
