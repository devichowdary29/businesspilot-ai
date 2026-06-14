"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ActionState } from "./types";
import { Inventory } from "@prisma/client";

export async function deleteInventory(id: string): Promise<ActionState<Inventory>> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const existingInventory = await prisma.inventory.findUnique({
      where: { id },
    });

    if (!existingInventory || existingInventory.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Inventory not found or unauthorized.",
      };
    }

    const deletedInventory = await prisma.inventory.delete({
      where: { id },
    });

    return {
      isSuccess: true,
      message: "Inventory deleted successfully",
      data: deletedInventory,
    };
  } catch (error: any) {
    console.error("Failed to delete inventory:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while deleting inventory",
    };
  }
}
