import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  content: string;
  chatId: number;
}
const useSendMessage = ({ chatId, content }: Props) => {
  return useMutation({
    mutationFn: () => messageService.sendMessage(chatId, content),
  });
};

export default useSendMessage;
