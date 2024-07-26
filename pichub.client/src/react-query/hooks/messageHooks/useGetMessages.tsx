import { useQuery } from "@tanstack/react-query";
import { MessageDto } from "../../../entities/Message";
import messageService from "../../services/messageService";
interface Props {
  chatId: number;
}

const useGetMessages = ({ chatId }: Props) => {
  return useQuery<MessageDto[]>({
    queryKey: ["getMessages", chatId],
    queryFn: () => messageService.getMessages(chatId),
  });
};

export default useGetMessages;
