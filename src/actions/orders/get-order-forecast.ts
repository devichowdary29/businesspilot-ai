"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OrderForecastState } from "./types";

export async function getOrderForecast(): Promise<OrderForecastState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return { isSuccess: false, message: "Unauthorized" };
    }

    const [orderCount, revenueAgg] = await Promise.all([
      prisma.order.count({ where: { organizationId: orgId } }),
      prisma.order.aggregate({
        where: { organizationId: orgId },
        _sum: { totalAmount: true, profit: true },
      }),
    ]);

    if (orderCount === 0) {
      return {
        isSuccess: true,
        message: "No orders yet",
        data: {
          insight1: "No sales history available yet.",
          insight2: "Start tracking orders to build your revenue baseline.",
          recommendation: "Create your first order to start receiving AI revenue insights.",
        },
      };
    }

    const totalRevenue = revenueAgg._sum.totalAmount ? Number(revenueAgg._sum.totalAmount) : 0;
    const totalProfit = revenueAgg._sum.profit ? Number(revenueAgg._sum.profit) : 0;
    const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

    let insight1 = `Your business has generated ₹${totalRevenue.toLocaleString("en-IN")} from ${orderCount} completed orders.`;
    let insight2 = `Current profit margin is ${profitMargin.toFixed(1)}%.`;
    let recommendation = "";

    if (profitMargin >= 30) {
      insight2 += " Profit margins are healthy. Continue optimizing your best-selling products.";
      recommendation = "Scale marketing and inventory planning to maximize your high-margin revenue.";
    } else if (profitMargin >= 10) {
      insight2 += " Margins are stable but have room for growth.";
      recommendation = "Identify and promote your most profitable products to lift overall margins.";
    } else {
      insight2 += " Profit margins are low. Consider reviewing pricing strategies or reducing costs.";
      recommendation = "Review product costs and consider raising prices on low-margin items.";
    }

    if (totalRevenue < 5000) {
      recommendation = "Low revenue detected. Focus on acquiring more customers and increasing marketing efforts. " + recommendation;
    }

    return {
      isSuccess: true,
      message: "Forecast retrieved successfully",
      data: {
        insight1,
        insight2,
        recommendation,
      },
    };
  } catch (error) {
    console.error("Failed to fetch order forecast:", error);
    return { isSuccess: false, message: "Failed to load order forecast" };
  }
}
