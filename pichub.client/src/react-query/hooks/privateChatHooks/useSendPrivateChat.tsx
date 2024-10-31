import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

interface Props {
  privateChatId: string;
  content: string;
  replyingToId: number | null;
}

const useSendPrivateChat = () => {
  return useMutation({
    mutationFn: async ({ privateChatId, content, replyingToId }: Props) =>
      await PrivateChatService.send(privateChatId, content, replyingToId),
  });
};

export default useSendPrivateChat;
