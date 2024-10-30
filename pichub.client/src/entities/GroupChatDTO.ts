export interface GroupChatDTO {
  id: string;
  title: string;
  bio: string | null;
  ownerId: string;
  isDisabled: boolean;
  isChannel: boolean;
  isPrivate: boolean;
  createdAt: Date;
}
