import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  chatId: number;
}
const useDeleteChat = ({ chatId }: Props) => {
  return useMutation({
    mutationFn: () => messageService.deleteChat(chatId),
  });
};

export default useDeleteChat;
