import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../entities/PrivateChatDTO";
import PrivateChatService from "../services/PrivateChatService";

export const usePrivateChat = (userId: string) => {
  return useQuery<PrivateChatDTO>({
    queryKey: ["privateChat", userId],
    queryFn: async () => await PrivateChatService.getAsync(userId),
  });
};

export const usePrivateChats = () => {
  return useQuery<PrivateChatDTO[]>({
    queryKey: ["privateChats"],
    queryFn: async () => await PrivateChatService.getPrivateChatsAsync(),
  });
};

export const useCreatePrivateChat = () => {
  return useMutation({
    mutationFn: async (recieverId: string) =>
      await PrivateChatService.createAsync(recieverId),
  });
};

export const useDeletePrivateChat = () => {
  return useMutation({
    mutationFn: async (chatId: number) =>
      await PrivateChatService.deleteAsync(chatId),
  });
};
