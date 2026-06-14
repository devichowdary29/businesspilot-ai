"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createInventorySchema } from "./validations";
import { CreateInventoryInput, InventoryActionState } from "./types";

export async function createInventory(
  data: CreateInventoryInput
): Promise<InventoryActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createInventorySchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid inventory data",
      };
    }

    const {
      productId,
      quantity,
      minimumStock,
      supplier,
      leadTimeDays,
      dailySalesAvg,
    } = parsedData.data;

    // 1. Verify Product Ownership
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || product.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Product not found or unauthorized.",
      };
    }

    // 2. Prevent Duplicate Inventory Row
    const existingInventory = await prisma.inventory.findUnique({
      where: { productId },
    });

    if (existingInventory) {
      return {
        isSuccess: false,
        message: "Inventory already exists for this product.",
      };
    }

    // 3. Create Inventory Record
    const inventory = await prisma.inventory.create({
      data: {
        organizationId: orgId,
        productId,
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
      message: "Inventory created successfully",
      data: {
        ...inventory,
        product: {
          ...inventory.product,
          price: Number(inventory.product.price),
          cost: Number(inventory.product.cost),
        }
      },
    };
  } catch (error: any) {
    console.error("Failed to create inventory:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while creating inventory",
    };
  }
}
