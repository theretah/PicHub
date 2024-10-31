import { useQuery } from "@tanstack/react-query";
import PrivateChatService from "../../services/PrivateChatService";

interface Props {
  user1Id: string;
  user2Id: string;
  enabled: boolean;
}

const usePrivateChatExists = ({ user1Id, user2Id, enabled }: Props) => {
  return useQuery({
    queryKey: ["privateChatExists", user1Id, user2Id],
    queryFn: async () => await PrivateChatService.exists(user1Id, user2Id),
    enabled: enabled,
  });
};

export default usePrivateChatExists;
