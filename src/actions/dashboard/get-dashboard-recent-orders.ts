"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { DashboardRecentOrdersState } from "./types";

export async function getDashboardRecentOrders(): Promise<DashboardRecentOrdersState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Fetch the 5 most recent orders with Customer and first few OrderItems
    const recentOrders = await prisma.order.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        status: true,
        totalAmount: true,
        createdAt: true,
        customer: {
          select: {
            name: true,
          },
        },
        items: {
          take: 2, // We only need up to 2 items to know if there's multiple for the summary
          select: {
            product: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: { items: true },
        },
      },
    });

    if (!recentOrders || recentOrders.length === 0) {
      return {
        isSuccess: true,
        message: "No orders found",
        data: [],
      };
    }

    // Format the database records for the Dashboard UI
    const formattedOrders = recentOrders.map((order) => {
      // 1. Format Monetary Value safely
      const rawAmount = order.totalAmount ? Number(order.totalAmount) : 0;
      const formattedAmount = `₹${rawAmount.toLocaleString("en-IN")}`;

      // 2. Format Date (e.g., 15 June 2026)
      const formattedDate = order.createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      // 3. Summarize Product String
      let productSummary = "Unknown Product";
      const totalItemsCount = order._count?.items || 0;

      if (totalItemsCount > 0 && order.items && order.items[0]) {
        const firstProductName = order.items[0].product.name;
        if (totalItemsCount === 1) {
          productSummary = firstProductName;
        } else {
          // Calculate remaining items
          const remaining = totalItemsCount - 1;
          productSummary = `${firstProductName} +${remaining} item${remaining > 1 ? "s" : ""}`;
        }
      }

      // Map status safely (the UI expects "Paid" | "Pending" | "Delivered")
      // In our schema, status is OrderStatus enum which usually has variants like PENDING, COMPLETED, CANCELLED.
      // We map COMPLETED -> Delivered/Paid for UI purposes if necessary, or just capitalize.
      let uiStatus: "Paid" | "Pending" | "Delivered" = "Pending";
      const dbStatus = order.status.toUpperCase();
      if (dbStatus === "COMPLETED" || dbStatus === "PAID" || dbStatus === "DELIVERED") {
        uiStatus = "Paid"; // Or Delivered based on your specific UI preference for generic COMPLETED
      }

      return {
        id: order.id,
        customer: order.customer.name,
        product: productSummary,
        amount: formattedAmount,
        status: uiStatus,
        date: formattedDate,
      };
    });

    return {
      isSuccess: true,
      message: "Recent orders retrieved successfully",
      data: formattedOrders,
    };
  } catch (error: any) {
    console.error("Failed to fetch recent orders:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching recent orders",
    };
  }
}
