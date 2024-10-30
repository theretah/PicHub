import { useQuery } from "@tanstack/react-query";
import { ChatLineDTO } from "../../../entities/ChatLineDTO";
import PrivateChatService from "../../services/PrivateChatService";
interface Props {
  chatId: string;
}

const useGetMessages = ({ chatId }: Props) => {
  return useQuery<ChatLineDTO[]>({
    queryKey: ["getChatLines", chatId],
    queryFn: async () => PrivateChatService.getChatLines(chatId),
  });
};

export default useGetMessages;
