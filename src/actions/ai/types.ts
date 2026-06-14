import { AIConversation, AIMessage } from "@prisma/client";

export type ActionState<T> =
  | { isSuccess: true; message: string; data: T }
  | { isSuccess: false; message: string; data?: never };

export type ConversationWithMessage = AIConversation & { messages: AIMessage[] };

export type ConversationsActionState = ActionState<ConversationWithMessage[]>;
