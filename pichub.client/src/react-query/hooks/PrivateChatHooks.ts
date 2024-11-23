import { useMutation, useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../entities/PrivateChatDTO";
import PrivateChatService from "../../../services/PrivateChatService";

export const usePrivateChat = (userId: string) =>
  useQuery<PrivateChatDTO>({
    queryKey: ["privateChat", userId],
    queryFn: async () => await PrivateChatService.getAsync(userId),
  });

export const usePrivateChats = () =>
  useQuery<PrivateChatDTO[]>({
    queryKey: ["privateChats"],
    queryFn: async () => await PrivateChatService.getPrivateChatsAsync(),
  });

export const useCreatePrivateChat = () =>
  useMutation({
    mutationFn: async (recieverId: string) =>
      await PrivateChatService.createAsync(recieverId),
  });

export const useDeletePrivateChat = (chatId: string) =>
  useMutation({
    mutationFn: async () => await PrivateChatService.deleteAsync(chatId),
  });
