import { useMutation, useQuery } from "@tanstack/react-query";
import ChatLineService from "../services/ChatLineService";
import { CreateChatLineDTO } from "../../entities/CreateChatLineDTO";

export const useGroupChatLines = (groupChatId: string) => {
  return useQuery({
    queryKey: ["groupChatLines", groupChatId],
    queryFn: async () =>
      await ChatLineService.getGroupChatLinesAsync(groupChatId),
  });
};

export const usePrivateChatLines = (privateChatId: string) => {
  return useQuery({
    queryKey: ["privateChatLines", privateChatId],
    queryFn: async () =>
      await ChatLineService.getPrivateChatLinesAsync(privateChatId),
  });
};

export const useSendGroupChatLine = (
  groupChatId: string,
  data: CreateChatLineDTO
) => {
  return useMutation({
    mutationFn: async () =>
      await ChatLineService.sendGroupChatLineAsync(groupChatId, data),
  });
};

export const useSendPrivateChatLine = (privateChatId: string) => {
  return useMutation({
    mutationFn: async (data: CreateChatLineDTO) =>
      await ChatLineService.sendPrivateChatLineAsync(privateChatId, data),
  });
};

export const useDeleteChatLine = () => {
  return useMutation({
    mutationFn: async (chatLineId: number) =>
      await ChatLineService.deleteAsync(chatLineId),
  });
};

export const useUpdateChatLine = (chatLineId: number, newContent: string) => {
  return useMutation({
    mutationFn: async () =>
      await ChatLineService.updateAsync(chatLineId, newContent),
  });
};
