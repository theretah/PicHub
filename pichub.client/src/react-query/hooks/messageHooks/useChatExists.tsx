import { useQuery } from "@tanstack/react-query";
import messageService from "../../services/messageService";

interface Props {
  recieverId: string;
  senderId: string;
  enabled: boolean;
}

const useChatExists = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery({
    queryKey: ["chatExists", recieverId, senderId],
    queryFn: () => messageService.chatExists(recieverId, senderId),
    enabled: enabled,
  });
};

export default useChatExists;
