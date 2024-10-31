import { useQuery } from "@tanstack/react-query";
import { ChatLineDTO } from "../../../entities/ChatLineDTO";
import PrivateChatService from "../../services/PrivateChatService";

const useGetPrivateChatLines = (chatId: string) => {
  return useQuery<ChatLineDTO[]>({
    queryKey: ["privateChatLines", chatId],
    queryFn: async () => await PrivateChatService.getChatLines(chatId),
  });
};

export default useGetPrivateChatLines;
