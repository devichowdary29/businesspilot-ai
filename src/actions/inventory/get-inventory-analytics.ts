"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InventoryAnalyticsState } from "./types";

export async function getInventoryAnalytics(): Promise<InventoryAnalyticsState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Fetch all inventory items with product cost for exact value calculations
    const inventoryItems = await prisma.inventory.findMany({
      where: { organizationId: orgId },
      include: { product: { select: { cost: true, price: true } } },
    });

    let inventoryValue = 0;
    let healthyStock = 0;
    let lowStock = 0;
    let criticalItems = 0;

    inventoryItems.forEach((item) => {
      // Calculate value based on item quantity and product cost (or price if cost not available)
      const costValue = item.product?.cost ? Number(item.product.cost) : (item.product?.price ? Number(item.product.price) : 0);
      inventoryValue += item.quantity * costValue;

      // Health metrics
      if (item.quantity > item.minimumStock) {
        healthyStock++;
      } else if (item.quantity <= item.minimumStock / 2) {
        criticalItems++;
        lowStock++; // Critical items are also considered low stock
      } else if (item.quantity <= item.minimumStock) {
        lowStock++;
      }
    });

    return {
      isSuccess: true,
      message: "Inventory analytics retrieved successfully",
      data: {
        inventoryValue: Math.round(inventoryValue),
        healthyStock,
        lowStock,
        criticalItems,
      },
    };
  } catch (error: any) {
    console.error("Failed to fetch inventory analytics:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching inventory analytics",
    };
  }
}
