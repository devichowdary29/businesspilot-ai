"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { createMessageSchema } from "./validations";
import { CreateMessageInput, MessageActionState } from "./types";
import { generateAIResponse } from "@/lib/ai/generate-response";
import { ProviderMessage } from "@/lib/ai/types";

export async function createMessage(
  data: CreateMessageInput
): Promise<MessageActionState> {
  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return { isSuccess: false, message: "Not authenticated" };
    }

    if (!orgId) {
      return { isSuccess: false, message: "No active organization" };
    }

    const parsedData = createMessageSchema.safeParse(data);

    if (!parsedData.success) {
      return {
        isSuccess: false,
        message: "Invalid message data provided",
      };
    }

    const { conversationId, content } = parsedData.data;

    // Verify conversation ownership
    const existingConversation = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
    });

    if (!existingConversation || existingConversation.organizationId !== orgId) {
      return {
        isSuccess: false,
        message: "Conversation not found or unauthorized.",
      };
    }

    // Create USER message
    const userMessage = await prisma.aIMessage.create({
      data: {
        conversationId,
        content,
        role: "USER",
      },
    });

    // Load Conversation Context
    const conversationWithMessages = await prisma.aIConversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    // Map to ProviderMessage
    const history: ProviderMessage[] = (conversationWithMessages?.messages || []).map(msg => ({
      role: msg.role as ProviderMessage["role"],
      content: msg.content,
    }));

    // Call AI Service
    let aiResponseContent = "";
    try {
      const response = await generateAIResponse({
        conversationHistory: history,
        latestQuestion: content,
        businessContext: JSON.stringify({
          products: [],
          customers: [],
          orders: [],
          inventory: []
        }), // Placeholder business context
      });
      aiResponseContent = response.content;
    } catch (aiError) {
      console.error("AI Generation failed:", aiError);
      aiResponseContent = "I apologize, but I am temporarily unable to analyze your request. Please try again shortly.";
    }

    // Store ASSISTANT Message
    await prisma.aIMessage.create({
      data: {
        conversationId,
        content: aiResponseContent,
        role: "ASSISTANT",
      },
    });

    // Touch the conversation so it moves to top of list
    await prisma.aIConversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() },
    });

    return {
      isSuccess: true,
      message: "Message processed successfully",
      data: userMessage, // Returning user message to satisfy type constraint
    };
  } catch (error: any) {
    console.error("Failed to create message:", error);
    return {
      isSuccess: false,
      message: error.message || "An error occurred while creating message",
    };
  }
}
