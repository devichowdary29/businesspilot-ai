"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InventoryIntelligenceState } from "./types";

export async function getInventoryIntelligence(): Promise<InventoryIntelligenceState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId || !orgId) {
      return { isSuccess: false, message: "Unauthorized" };
    }

    const inventoryItems = await prisma.inventory.findMany({
      where: { organizationId: orgId },
      select: { quantity: true, minimumStock: true, product: { select: { name: true } } },
    });

    if (inventoryItems.length === 0) {
      return {
        isSuccess: true,
        message: "No inventory data",
        data: {
          healthScore: 0,
          insight1: "No inventory data available.",
          insight2: "Start tracking products to receive inventory intelligence.",
          recommendation: "Add your first inventory item to unlock AI insights and low-stock alerts.",
        },
      };
    }

    let lowStockCount = 0;
    let criticalStockCount = 0;

    inventoryItems.forEach((item) => {
      if (item.quantity <= item.minimumStock / 2) {
        criticalStockCount++;
      } else if (item.quantity <= item.minimumStock) {
        lowStockCount++;
      }
    });

    let healthScore = 100 - (lowStockCount * 5) - (criticalStockCount * 10);
    healthScore = Math.max(0, Math.min(100, healthScore));

    let insight1 = "Inventory levels are healthy with no immediate shortages detected.";
    let insight2 = "All tracked products are currently above their minimum safety thresholds.";
    let recommendation = "Monitor inventory turnover before purchasing additional stock.";

    if (criticalStockCount > 0) {
      insight1 = `${criticalStockCount} product(s) require immediate attention because stock levels are critically low.`;
      insight2 = lowStockCount > 0 ? `Additionally, ${lowStockCount} product(s) are below their minimum stock levels.` : "Other products are currently adequately stocked.";
      recommendation = "Urgently review and restock critical items to prevent stockouts and lost revenue.";
    } else if (lowStockCount > 0) {
      insight1 = `${lowStockCount} product(s) are below their minimum stock levels.`;
      insight2 = "Restock these items soon to avoid shortages during peak demand.";
      recommendation = "Review reorder quantities for low-stock products and increase safety stock if necessary.";
    }

    return {
      isSuccess: true,
      message: "Inventory intelligence retrieved successfully",
      data: {
        healthScore,
        insight1,
        insight2,
        recommendation,
      },
    };
  } catch (error) {
    console.error("Failed to fetch inventory intelligence:", error);
    return { isSuccess: false, message: "Failed to load inventory intelligence" };
  }
}
