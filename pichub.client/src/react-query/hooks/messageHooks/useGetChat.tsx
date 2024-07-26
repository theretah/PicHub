import { useQuery } from "@tanstack/react-query";
import { Chat } from "../../../entities/Chat";
import messageService from "../../services/messageService";
interface Props {
  recieverId: string;
  enabled: boolean;
  senderId: string;
}
const useGetChat = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery<Chat>({
    queryKey: ["getChat", recieverId, senderId],
    queryFn: () => messageService.getChat(recieverId, senderId),
    enabled: enabled,
  });
};

export default useGetChat;
