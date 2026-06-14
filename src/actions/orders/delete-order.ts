"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ActionState } from "./types";
import { Order } from "@prisma/client";

export async function deleteOrder(id: string): Promise<ActionState<Order>> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    // Use a transaction to ensure all or nothing
    const order = await prisma.$transaction(async (tx) => {
      // Step A: Load Related Data
      const existingOrder = await tx.order.findUnique({
        where: { id },
      });

      if (!existingOrder || existingOrder.organizationId !== orgId) {
        throw new Error("Order not found or unauthorized.");
      }

      // Step B: Correct Customer Analytics
      await tx.customer.update({
        where: { id: existingOrder.customerId },
        data: {
          totalOrders: { decrement: 1 },
          totalSpent: { decrement: existingOrder.totalAmount },
        },
      });

      // Step C: Delete Order Items
      await tx.orderItem.deleteMany({
        where: { orderId: id },
      });

      // Step D: Delete Order
      const deletedOrder = await tx.order.delete({
        where: { id },
      });

      return deletedOrder;
    });

    return {
      isSuccess: true,
      message: "Order deleted successfully",
      data: order,
    };
  } catch (error: any) {
    console.error("Failed to delete order:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while deleting the order",
    };
  }
}
