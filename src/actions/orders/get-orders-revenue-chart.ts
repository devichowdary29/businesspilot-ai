"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OrdersRevenueChartState, ChartDataPoint } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export async function getOrdersRevenueChart(): Promise<OrdersRevenueChartState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return { isSuccess: false, message: "Unauthorized" };
    }

    const orders = await prisma.order.findMany({
      where: { organizationId: orgId },
      select: {
        createdAt: true,
        totalAmount: true,
        profit: true,
      },
    });

    const chartData: ChartDataPoint[] = MONTHS.map((month) => ({
      month,
      revenue: 0,
      profit: 0,
    }));

    orders.forEach((order) => {
      const monthIndex = new Date(order.createdAt).getMonth();
      chartData[monthIndex].revenue += Number(order.totalAmount);
      chartData[monthIndex].profit += Number(order.profit);
    });

    return {
      isSuccess: true,
      message: "Chart data retrieved successfully",
      data: chartData,
    };
  } catch (error) {
    console.error("Failed to fetch order chart data:", error);
    return { isSuccess: false, message: "Failed to load order chart data" };
  }
}
