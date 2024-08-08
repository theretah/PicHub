import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  content: string;
  chatId: number;
}
const useSendMessage = () => {
  return useMutation({
    mutationFn: ({ chatId, content }: Props) =>
      messageService.sendMessage(chatId, content),
  });
};

export default useSendMessage;
