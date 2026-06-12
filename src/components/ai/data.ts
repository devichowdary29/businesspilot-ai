import { TrendingUp, AlertTriangle, Users, Package, FileBarChart, Sparkles, Box, PieChart } from "lucide-react"
import type { ConversationHistoryItem, SuggestedPrompt } from "./types"

export const historyItems: ConversationHistoryItem[] = [
  {
    id: "conv-001",
    title: "Revenue Growth Analysis",
    date: "Today",
    category: "Revenue",
    icon: TrendingUp,
  },
  {
    id: "conv-002",
    title: "Inventory Risk Report",
    date: "Yesterday",
    category: "Inventory",
    icon: AlertTriangle,
  },
  {
    id: "conv-003",
    title: "Customer Churn Prediction",
    date: "10 Jun",
    category: "Customers",
    icon: Users,
  },
  {
    id: "conv-004",
    title: "Trending Products",
    date: "08 Jun",
    category: "Products",
    icon: Package,
  },
  {
    id: "conv-005",
    title: "Monthly Business Report",
    date: "01 Jun",
    category: "Report",
    icon: FileBarChart,
  },
]

export const suggestedPrompts: SuggestedPrompt[] = [
  {
    id: "prompt-1",
    text: "How can I increase revenue?",
    icon: TrendingUp,
    colorClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
  },
  {
    id: "prompt-2",
    text: "Which inventory should I restock?",
    icon: Box,
    colorClass: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/20",
  },
  {
    id: "prompt-3",
    text: "Which customers might churn?",
    icon: Users,
    colorClass: "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/20",
  },
  {
    id: "prompt-4",
    text: "Which products are trending?",
    icon: Sparkles,
    colorClass: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/20",
  },
  {
    id: "prompt-5",
    text: "Generate my weekly business report",
    icon: PieChart,
    colorClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/20",
  },
]
