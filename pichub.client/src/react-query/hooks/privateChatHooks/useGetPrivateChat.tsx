import { useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../../entities/PrivateChatDTO";
import PrivateChatService from "../../services/PrivateChatService";

interface Props {
  user1Id: string;
  user2Id: string;
  enabled: boolean;
}

const useGetPrivateChat = ({ user1Id, user2Id, enabled }: Props) => {
  return useQuery<PrivateChatDTO>({
    queryKey: ["privateChat", user1Id, user2Id],
    queryFn: async () => await PrivateChatService.get(user1Id, user2Id),
    enabled: enabled,
  });
};

export default useGetPrivateChat;
