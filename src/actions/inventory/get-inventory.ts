"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { InventoriesActionState } from "./types";

export async function getInventory(): Promise<InventoriesActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const items = await prisma.inventory.findMany({
      where: {
        organizationId: orgId,
      },
      include: {
        product: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      isSuccess: true,
      message: "Inventory retrieved successfully",
      data: items,
    };
  } catch (error: any) {
    console.error("Failed to retrieve inventory:", error);
    return {
      isSuccess: false,
      message: "Failed to retrieve inventory",
    };
  }
}
