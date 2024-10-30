import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";
const useDeleteChat = () => {
  return useMutation({
    mutationFn: async (chatId: number) =>
      await PrivateChatService.deleteChat(chatId),
  });
};

export default useDeleteChat;
