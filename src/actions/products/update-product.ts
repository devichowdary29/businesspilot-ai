"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { updateProductSchema, UpdateProductInput } from "./validations";
import { ProductActionState } from "./types";

export async function updateProduct(
  data: UpdateProductInput
): Promise<ProductActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = updateProductSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid product data",
      };
    }

    const { id, ...updateData } = parsedData.data;

    // Verify the product exists and belongs to the current organization
    const existingProduct = await prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!existingProduct || existingProduct.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Product not found or unauthorized",
      };
    }

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: updateData,
    });

    return {
      isSuccess: true,
      message: "Product updated successfully",
      data: {
        ...product,
        price: Number(product.price),
        cost: Number(product.cost),
      } as any,
    };
  } catch (error) {
    console.error("Failed to update product:", error);
    return {
      isSuccess: false,
      message: "An error occurred while updating the product",
    };
  }
}
