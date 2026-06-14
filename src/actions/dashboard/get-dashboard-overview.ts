"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DashboardOverviewState } from "./types";

export async function getDashboardOverview(): Promise<DashboardOverviewState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Run independent aggregation queries concurrently
    const [productsCount, customersCount, ordersCount, orderStats] = await Promise.all([
      prisma.product.count({ where: { organizationId: orgId } }),
      prisma.customer.count({ where: { organizationId: orgId } }),
      prisma.order.count({ where: { organizationId: orgId } }),
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
    // We fetch profit but it isn't directly exposed in the current phase's UI requirements, included for future use

    return {
      isSuccess: true,
      message: "Dashboard data retrieved successfully",
      data: {
        totalProducts: productsCount,
        totalCustomers: customersCount,
        totalOrders: ordersCount,
        totalRevenue,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch dashboard overview:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching dashboard data",
    };
  }
}
