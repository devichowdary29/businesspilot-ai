"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DashboardRevenueState } from "./types";

export async function getDashboardRevenue(): Promise<DashboardRevenueState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Fetch minimal required order data
    const orders = await prisma.order.findMany({
      where: { organizationId: orgId },
      select: {
        createdAt: true,
        totalAmount: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // Initialize an empty 12-month map
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const revenueMap = new Map<string, number>();
    months.forEach((month) => revenueMap.set(month, 0));

    // Aggregate orders into their respective months
    orders.forEach((order) => {
      const monthName = order.createdAt.toLocaleString("default", { month: "short" });
      const amount = order.totalAmount ? Number(order.totalAmount) : 0;
      const current = revenueMap.get(monthName) || 0;
      revenueMap.set(monthName, current + amount);
    });

    // Transform back to the array shape expected by the UI
    const revenueData = months.map((month) => ({
      month,
      revenue: revenueMap.get(month) || 0,
    }));

    return {
      isSuccess: true,
      message: "Revenue data retrieved successfully",
      data: revenueData,
    };
  } catch (error: any) {
    console.error("Failed to fetch dashboard revenue:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching revenue analytics",
    };
  }
}
