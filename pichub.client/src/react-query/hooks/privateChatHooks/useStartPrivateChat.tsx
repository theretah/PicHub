import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

const useStartPrivateChat = () => {
  return useMutation({
    mutationFn: async (recieverId: string) =>
      await PrivateChatService.start(recieverId),
  });
};

export default useStartPrivateChat;
