"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { OrdersActionState } from "./types";

export async function getOrders(): Promise<OrdersActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const orders = await prisma.order.findMany({
      where: {
        organizationId: orgId,
      },
      include: {
        customer: true,
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      isSuccess: true,
      message: "Orders fetched successfully",
      data: orders.map(order => ({
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
      })),
    };
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching orders",
    };
  }
}
