import { useQuery } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

interface Props {
  recieverId: string;
  senderId: string;
  enabled: boolean;
}

const useChatExists = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery({
    queryKey: ["chatExists", recieverId, senderId],
    queryFn: async () =>
      await PrivateChatService.chatExists(recieverId, senderId),
    enabled: enabled,
  });
};

export default useChatExists;
