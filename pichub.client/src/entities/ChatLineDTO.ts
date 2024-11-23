export interface ChatLineDTO {
  id: number;
  privateChatId: string | null;
  groupChatId: string | null;
  senderId: string;
  replyingToId: number | null;
  content: string;
  createdAt: Date;
  lastUpdatedAt: Date | null;
}
