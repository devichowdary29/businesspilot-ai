"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createOrderSchema } from "./validations";
import { CreateOrderInput, OrderActionState } from "./types";
import { OrderStatus, PaymentStatus } from "@prisma/client";

export async function createOrder(
  data: CreateOrderInput
): Promise<OrderActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createOrderSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid order data",
      };
    }

    const { customerId, items } = parsedData.data;

    // Use a transaction to ensure all or nothing
    const order = await prisma.$transaction(async (tx) => {
      // 1. Verify customer ownership
      const customer = await tx.customer.findUnique({
        where: { id: customerId },
      });

      if (!customer || customer.organizationId !== orgId) {
        throw new Error("Customer not found or unauthorized");
      }

      // 2. Fetch all products to verify ownership and get prices/costs
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

      // 3. Calculate totalAmount and profit
      let totalAmount = 0;
      let totalCost = 0;

      const orderItemsData = items.map((item) => {
        const product = products.find((p) => p.id === item.productId)!;
        const lineItemTotal = Number(product.price) * item.quantity;
        const lineItemCost = Number(product.cost) * item.quantity;

        totalAmount += lineItemTotal;
        totalCost += lineItemCost;

        return {
          productId: product.id,
          quantity: item.quantity,
          price: product.price, // Storing historical price at time of order
        };
      });

      const profit = totalAmount - totalCost;

      // 4. Create the Order
      const newOrder = await tx.order.create({
        data: {
          organizationId: orgId,
          customerId,
          status: OrderStatus.PROCESSING,
          paymentStatus: PaymentStatus.PENDING,
          totalAmount,
          profit,
          items: {
            create: orderItemsData,
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

      // Update customer stats
      await tx.customer.update({
        where: { id: customerId },
        data: {
          totalOrders: { increment: 1 },
          totalSpent: { increment: totalAmount },
        },
      });

      return newOrder;
    });

    return {
      isSuccess: true,
      message: "Order created successfully",
      data: {
        ...order,
        totalAmount: Number(order.totalAmount),
        profit: Number(order.profit),
        customer: {
          ...order.customer,
          totalSpent: Number(order.customer.totalSpent),
        },
        items: order.items.map(item => ({
          ...item,
          price: Number(item.price),
          product: {
            ...item.product,
            price: Number(item.product.price),
            cost: Number(item.product.cost),
          }
        }))
      },
    };
  } catch (error: any) {
    console.error("Failed to create order:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while creating the order",
    };
  }
}
