import { useMutation, useQuery } from "@tanstack/react-query";
import { GroupChatDTO } from "../../entities/GroupChatDTO";
import GroupChatService from "../services/GroupChatService";

export const useGroupChat = (groupChatId: string) => {
  return useQuery<GroupChatDTO>({
    queryKey: ["groupChat", groupChatId],
    queryFn: async () => await GroupChatService.getAsync(groupChatId),
  });
};

export const useGroupChats = () => {
  return useQuery<GroupChatDTO[]>({
    queryKey: ["groupChats"],
    queryFn: async () => await GroupChatService.getGroupChatsAsync(),
  });
};

export const useCreateGroupChat = () => {
  return useMutation({
    mutationFn: async (data: GroupChatDTO) =>
      await GroupChatService.createAsync(data),
  });
};

export const useJoinGroupChat = () => {
  return useMutation({
    mutationFn: async (groupChatId: string) =>
      await GroupChatService.joinAsync(groupChatId),
  });
};

export const useAddMemberFromGroupChat = (
  groupChatId: string,
  userId: string
) => {
  return useMutation({
    mutationFn: async () =>
      await GroupChatService.addMemberAsync(groupChatId, userId),
  });
};

export const useDeleteGroupChat = () => {
  return useMutation({
    mutationFn: async (groupChatId: string) =>
      await GroupChatService.deleteAsync(groupChatId),
  });
};

export const useRemoveMemberFromGroupChat = (
  groupChatId: string,
  userId: string
) => {
  return useMutation({
    mutationFn: async () =>
      await GroupChatService.removeMemberAsync(groupChatId, userId),
  });
};

export const useLeaveGroupChat = () => {
  return useMutation({
    mutationFn: async (groupChatId: string) =>
      await GroupChatService.leaveAsync(groupChatId),
  });
};
