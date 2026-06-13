"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createProductSchema, CreateProductInput } from "./validations";
import { ProductActionState } from "./types";

export async function createProduct(
  data: CreateProductInput
): Promise<ProductActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createProductSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid product data",
      };
    }

    const product = await prisma.product.create({
      data: {
        ...parsedData.data,
        organizationId: orgId,
      },
    });

    return {
      isSuccess: true,
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    console.error("Failed to create product:", error);
    return {
      isSuccess: false,
      message: "An error occurred while creating the product",
    };
  }
}
