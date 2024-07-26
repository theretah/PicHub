import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chat } from "../../../entities/Chat";
interface Props {
  recieverId: string;
  enabled: boolean;
  senderId: string;
}
const useGetChat = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery<Chat>({
    queryKey: ["getChat", recieverId, senderId],
    queryFn: () =>
      axios
        .get<Chat>(
          `/api/message/getChat?recieverId=${recieverId}&senderId=${senderId}`
        )
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useGetChat;
