import { AIConversation, AIMessage } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type ConversationWithMessage = AIConversation & { messages: AIMessage[] };

export type ConversationsActionState = ActionState<ConversationWithMessage[]>;

export interface CreateConversationInput {
  title: string;
}

export type ConversationActionState = ActionState<AIConversation>;

export interface CreateMessageInput {
  conversationId: string;
  content: string;
}

export type MessageActionState = ActionState<AIMessage>;

export interface ExecutiveReportData {
  report: string;
  provider: string;
  model: string;
  generatedAt: string;
}

export type ExecutiveReportActionState = ActionState<ExecutiveReportData>;
