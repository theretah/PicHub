import { useMutation } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";
interface Props {
  content: string;
  chatId: number;
  replyingToId: string | null;
}
const useSendMessage = () => {
  return useMutation({
    mutationFn: async ({ chatId, content, replyingToId }: Props) =>
      PrivateChatService.send(chatId, content, replyingToId),
  });
};

export default useSendMessage;
