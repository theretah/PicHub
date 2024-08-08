import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  chatId: number;
}
const useDeleteChat = () => {
  return useMutation({
    mutationFn: ({ chatId }: Props) => messageService.deleteChat(chatId),
  });
};

export default useDeleteChat;
