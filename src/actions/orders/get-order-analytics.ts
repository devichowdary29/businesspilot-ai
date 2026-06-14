"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OrderAnalyticsState } from "./types";

export async function getOrderAnalytics(): Promise<OrderAnalyticsState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Run independent aggregations concurrently
    const [totalOrders, orderStats] = await Promise.all([
      // Total orders
      prisma.order.count({ where: { organizationId: orgId } }),

      // Aggregate revenue and profit
      prisma.order.aggregate({
        where: { organizationId: orgId },
        _sum: {
          totalAmount: true,
          profit: true,
        },
      }),
    ]);

    // Handle Decimal serialization safely
    const totalRevenue = orderStats._sum.totalAmount ? Number(orderStats._sum.totalAmount) : 0;
    const totalProfit = orderStats._sum.profit ? Number(orderStats._sum.profit) : 0;

    // Calculate derived metrics
    let profitMargin = 0;
    if (totalRevenue > 0) {
      profitMargin = Math.round((totalProfit / totalRevenue) * 100);
    }

    let averageOrderValue = 0;
    if (totalOrders > 0) {
      averageOrderValue = Math.round(totalRevenue / totalOrders);
    }

    return {
      isSuccess: true,
      message: "Order analytics retrieved successfully",
      data: {
        totalRevenue,
        totalOrders,
        profitMargin,
        averageOrderValue,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch order analytics:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching order analytics",
    };
  }
}
