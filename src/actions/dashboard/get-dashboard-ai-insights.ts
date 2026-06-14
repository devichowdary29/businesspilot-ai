"use server";

import { auth } from "@clerk/nextjs/server";
import { getBusinessContext } from "@/lib/ai/business-context";
import { DashboardAiInsightsState } from "./types";

export async function getDashboardAIInsights(): Promise<DashboardAiInsightsState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Reuse the existing Business Context engine, which is already optimized
    // with Promise.all and already enforces organization isolation.
    const context = await getBusinessContext(orgId);

    const { overview, inventory, customers, products } = context;

    // Handle Empty Organization Case
    if (overview.totalProducts === 0 && overview.totalCustomers === 0 && overview.totalOrders === 0) {
      return {
        isSuccess: true,
        message: "Insights generated",
        data: {
          healthScore: 15,
          insights: [
            { text: "Start adding products and customers to begin tracking your business." },
          ],
          actions: [
            { text: "Create your first product in the inventory." },
            { text: "Add your first customer to the database." },
          ],
        },
      };
    }

    // Calculate Deterministic Business Health Score (0 - 100)
    let healthScore = 50; // Base neutral score

    // Revenue & Order modifiers
    if (overview.totalRevenue > 0) healthScore += 15;
    if (overview.totalOrders > 10) healthScore += 10;
    if (overview.totalOrders > 50) healthScore += 10;

    // Customer modifiers
    if (overview.totalCustomers > 0) healthScore += 5;
    if (overview.totalCustomers > 20) healthScore += 10;

    // Inventory modifiers
    if (inventory.lowStockItems.length > 0) {
      // Penalize based on how many items are low in stock
      const penalty = Math.min(inventory.lowStockItems.length * 5, 25);
      healthScore -= penalty;
    } else if (overview.totalProducts > 0) {
      healthScore += 15; // Healthy inventory
    }

    // Clamp score
    healthScore = Math.max(0, Math.min(100, healthScore));

    // Generate Dynamic Rule-Based Insights
    const insights: { text: string }[] = [];

    // 1. Revenue Insight
    if (overview.totalRevenue > 0) {
      insights.push({
        text: `Your business has generated ₹${overview.totalRevenue.toLocaleString("en-IN")} in revenue from ${overview.totalOrders} orders.`,
      });
    }

    // 2. Inventory Insight
    if (inventory.lowStockItems.length > 0) {
      insights.push({
        text: `${inventory.lowStockItems.length} product${inventory.lowStockItems.length > 1 ? "s are" : " is"} running below minimum stock and require immediate attention.`,
      });
    } else {
      insights.push({
        text: "Your inventory levels are currently healthy with no immediate shortages detected.",
      });
    }

    // 3. Customer Insight
    if (customers.topCustomers.length > 0) {
      const topCustomer = customers.topCustomers[0];
      if (topCustomer.totalSpent > 0) {
        insights.push({
          text: `Your top customer, ${topCustomer.name}, has contributed ₹${topCustomer.totalSpent.toLocaleString("en-IN")} in purchases.`,
        });
      }
    }

    // Generate Dynamic Recommended Actions
    const actions: { text: string }[] = [];

    if (inventory.lowStockItems.length > 0) {
      actions.push({ text: "Restock low inventory products." });
    }

    if (overview.totalCustomers > 0 && overview.totalOrders > 0) {
      actions.push({ text: "Focus marketing efforts on your highest-value customers." });
    } else {
      actions.push({ text: "Launch a promotional campaign to acquire new customers." });
    }

    if (overview.totalProducts < 5) {
      actions.push({ text: "Increase product catalog diversity to improve sales opportunities." });
    } else if (inventory.lowStockItems.length === 0) {
      actions.push({ text: "Consider running a sale on aging inventory to increase turnover." });
    }

    return {
      isSuccess: true,
      message: "Insights generated successfully",
      data: {
        healthScore,
        insights: insights.slice(0, 4), // Keep it to max 4 insights for UI cleanliness
        actions: actions.slice(0, 3),   // Keep it to max 3 actions
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch AI insights:", error);
    return {
      isSuccess: false,
      message: "An error occurred while generating insights",
    };
  }
}
