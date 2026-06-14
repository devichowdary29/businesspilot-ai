"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ProductsActionState } from "./types";
import { ProductStatus } from "@prisma/client";

export interface GetProductsOptions {
  category?: string;
  status?: ProductStatus;
  isActive?: boolean;
}

export async function getProducts(
  options?: GetProductsOptions
): Promise<ProductsActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const products = await prisma.product.findMany({
      where: {
        organizationId: orgId,
        ...(options?.category ? { category: options.category } : {}),
        ...(options?.status ? { status: options.status } : {}),
        ...(options?.isActive !== undefined ? { isActive: options.isActive } : {}),
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      isSuccess: true,
      message: "Products retrieved successfully",
      data: products.map(product => ({
        ...product,
        price: Number(product.price),
        cost: Number(product.cost),
      })),
    };
  } catch (error) {
    console.error("Failed to get products:", error);
    return {
      isSuccess: false,
      message: "An error occurred while retrieving products",
    };
  }
}
