"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateOrderSchema } from "./validations";
import { UpdateOrderInput, OrderActionState } from "./types";

export async function updateOrder(
  data: UpdateOrderInput
): Promise<OrderActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = updateOrderSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid order data",
      };
    }

    const { id, customerId, items } = parsedData.data;

    // Use a transaction to ensure all or nothing
    const order = await prisma.$transaction(async (tx) => {
      // Step A: Load Existing Order Data
      const existingOrder = await tx.order.findUnique({
        where: { id },
        include: { items: true },
      });

      if (!existingOrder || existingOrder.organizationId !== orgId) {
        throw new Error("Order not found or unauthorized");
      }

      const previousTotalAmount = Number(existingOrder.totalAmount);

      // Step B: Validate New Customer
      const customer = await tx.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer || customer.organizationId !== orgId) {
        throw new Error("Customer not found or unauthorized");
      }

      // Step C: Validate Products
      const productIds = items.map((item) => item.productId);
      const products = await tx.product.findMany({
        where: {
          id: { in: productIds },
          organizationId: orgId,
        },
      });

      if (products.length !== productIds.length) {
        throw new Error("One or more products are invalid or unauthorized");
      }

      // Step D: Recalculate Financial Data
      let totalAmount = 0;
      let totalCost = 0;

      const newOrderItemsData = items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const lineItemTotal = Number(product.price) * item.quantity;
        const lineItemCost = Number(product.cost) * item.quantity;

        totalAmount += lineItemTotal;
        totalCost += lineItemCost;

        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price, // Storing historical price at time of update
        };
      });

      const profit = totalAmount - totalCost;

      // Step E: Correct Customer Analytics
      if (existingOrder.customerId === customerId) {
        // Case 1: Customer remains the same
        // We only adjust the totalSpent difference
        const difference = totalAmount - previousTotalAmount;
        if (difference !== 0) {
          await tx.customer.update({
            where: { id: customerId },
            data: {
              totalSpent: { increment: difference },
            },
          });
        }
      } else {
        // Case 2: Customer changes
        // Old customer decreases
        await tx.customer.update({
          where: { id: existingOrder.customerId },
          data: {
            totalOrders: { decrement: 1 },
            totalSpent: { decrement: previousTotalAmount },
          },
        });
        
        // New customer increases
        await tx.customer.update({
          where: { id: customerId },
          data: {
            totalOrders: { increment: 1 },
            totalSpent: { increment: totalAmount },
          },
        });
      }

      // Step F & G: Update Order and Replace Order Items
      // First delete old items
      await tx.orderItem.deleteMany({
        where: { orderId: id },
      });

      // Then update order and insert new items
      const updatedOrder = await tx.order.update({
        where: { id },
        data: {
          customerId,
          totalAmount,
          profit,
          items: {
            create: newOrderItemsData,
          },
        },
        include: {
          customer: true,
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      return updatedOrder;
    });

    return {
      isSuccess: true,
      message: "Order updated successfully",
      data: order as any,
    };
  } catch (error: any) {
    console.error("Failed to update order:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while updating the order",
    };
  }
}
