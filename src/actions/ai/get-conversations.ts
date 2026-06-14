"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { ConversationsActionState } from "./types";

export async function getConversations(): Promise<ConversationsActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const conversations = await prisma.aIConversation.findMany({
      where: {
        organizationId: orgId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return {
      isSuccess: true,
      message: "Conversations retrieved successfully",
      data: conversations,
    };
  } catch (error: any) {
    console.error("Failed to retrieve conversations:", error);
    return {
      isSuccess: false,
      message: "Failed to retrieve conversations",
    };
  }
}
