"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CustomersActionState } from "./types";

export async function getCustomers(): Promise<CustomersActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const customers = await prisma.customer.findMany({
      where: {
        organizationId: orgId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      isSuccess: true,
      message: "Customers fetched successfully",
      data: customers,
    };
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return {
      isSuccess: false,
      message: "An error occurred while fetching customers",
    };
  }
}
