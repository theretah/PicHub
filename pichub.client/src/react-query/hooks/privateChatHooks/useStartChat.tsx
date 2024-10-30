import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";
const useStartChat = () => {
  return useMutation({
    mutationFn: async (recieverId: string) =>
      await PrivateChatService.startChat(recieverId),
  });
};

export default useStartChat;
