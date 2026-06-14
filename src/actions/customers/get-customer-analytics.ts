"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CustomerAnalyticsState } from "./types";

export async function getCustomerAnalytics(): Promise<CustomerAnalyticsState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Run independent aggregations concurrently
    const [totalCustomers, customerStats, vipCustomers, churnRisk] = await Promise.all([
      // Total customers
      prisma.customer.count({ where: { organizationId: orgId } }),

      // Lifetime value (sum of totalSpent)
      prisma.customer.aggregate({
        where: { organizationId: orgId },
        _sum: { totalSpent: true },
      }),

      // VIP Customers (totalSpent >= 10000)
      prisma.customer.count({
        where: { 
          organizationId: orgId,
          totalSpent: { gte: 10000 }
        },
      }),

      // Churn Risk (Customers with zero orders)
      // Since order relationship isn't directly a count filter in Prisma standard where clause easily,
      // we check for totalSpent = 0 or we check customers with NO orders.
      prisma.customer.count({
        where: {
          organizationId: orgId,
          orders: { none: {} }
        }
      }),
    ]);

    // Handle Decimal serialization
    const lifetimeValue = customerStats._sum.totalSpent ? Number(customerStats._sum.totalSpent) : 0;

    return {
      isSuccess: true,
      message: "Customer analytics retrieved successfully",
      data: {
        totalCustomers,
        lifetimeValue,
        vipCustomers,
        churnRisk,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch customer analytics:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching customer analytics",
    };
  }
}
