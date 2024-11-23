import { useMutation, useQuery } from "@tanstack/react-query";
import ChatLineService from "../../../services/ChatLineService";
import { CreateChatLineDTO } from "../../entities/CreateChatLineDTO";
import { ChatLineDTO } from "../../entities/ChatLineDTO";
import { AxiosError } from "axios";

export const useGroupChatLines = (groupChatId: string) =>
  useQuery<ChatLineDTO[] | null>({
    queryKey: ["groupChatLines", groupChatId],
    queryFn: async () =>
      await ChatLineService.getGroupChatLinesAsync(groupChatId),
  });

export const usePrivateChatLines = (privateChatId: string, enabled: boolean) =>
  useQuery<ChatLineDTO[] | null, AxiosError>({
    queryKey: ["privateChatLines", privateChatId],
    queryFn: async () =>
      await ChatLineService.getPrivateChatLinesAsync(privateChatId),
    enabled,
  });

export const useSendGroupChatLine = (
  groupChatId: string,
  data: CreateChatLineDTO
) =>
  useMutation({
    mutationFn: async () =>
      await ChatLineService.sendGroupChatLineAsync(groupChatId, data),
  });

export const useSendPrivateChatLine = (privateChatId: string) =>
  useMutation({
    mutationFn: async (data: CreateChatLineDTO) =>
      await ChatLineService.sendPrivateChatLineAsync(privateChatId, data),
  });

export const useDeleteChatLine = () =>
  useMutation({
    mutationFn: async (chatLineId: number) =>
      await ChatLineService.deleteAsync(chatLineId),
  });

export const useUpdateChatLine = (chatLineId: number, newContent: string) =>
  useMutation({
    mutationFn: async () =>
      await ChatLineService.updateAsync(chatLineId, newContent),
  });
