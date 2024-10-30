import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

const useUnSendMessage = () => {
  return useMutation({
    mutationFn: async (chatLineId: number) =>
      await PrivateChatService.unSend(chatLineId),
  });
};

export default useUnSendMessage;
