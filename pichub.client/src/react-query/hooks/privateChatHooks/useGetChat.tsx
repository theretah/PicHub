import { useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../../entities/PrivateChatDTO";
import PrivateChatService from "../../services/PrivateChatService";
interface Props {
  recieverId: string;
  enabled: boolean;
  senderId: string;
}
const useGetChat = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery<PrivateChatDTO>({
    queryKey: ["getChat", recieverId, senderId],
    queryFn: async () => await PrivateChatService.getChat(recieverId, senderId),
    enabled: enabled,
  });
};

export default useGetChat;
