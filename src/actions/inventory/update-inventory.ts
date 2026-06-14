"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateInventorySchema } from "./validations";
import { UpdateInventoryInput, InventoryActionState } from "./types";

export async function updateInventory(
  data: UpdateInventoryInput
): Promise<InventoryActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = updateInventorySchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid inventory data",
      };
    }

    const {
      id,
      quantity,
      minimumStock,
      supplier,
      leadTimeDays,
      dailySalesAvg,
    } = parsedData.data;

    // 1. Verify Inventory Ownership
    const existingInventory = await prisma.inventory.findUnique({
      where: { id },
    });

    if (!existingInventory || existingInventory.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Inventory not found or unauthorized.",
      };
    }

    // 2. Update Inventory Record
    const inventory = await prisma.inventory.update({
      where: { id },
      data: {
        quantity,
        minimumStock,
        supplier,
        leadTimeDays,
        dailySalesAvg,
      },
      include: {
        product: true,
      },
    });

    return {
      isSuccess: true,
      message: "Inventory updated successfully",
      data: inventory,
    };
  } catch (error: any) {
    console.error("Failed to update inventory:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while updating inventory",
    };
  }
}
