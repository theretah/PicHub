import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

const useDeletePrivateChat = () => {
  return useMutation({
    mutationFn: async (chatId: number) =>
      await PrivateChatService.delete(chatId),
  });
};

export default useDeletePrivateChat;
