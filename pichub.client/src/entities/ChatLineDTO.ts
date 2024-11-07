export interface ChatLineDTO {
  id: number;
  privateChatId: string | null;
  groupChatId: string | null;
  authorId: string;
  content: string;
  replyingToId: number | null;
  date: Date;
}
