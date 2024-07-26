import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  recieverId: string;
  senderId: string;
  enabled: boolean;
}
const useChatExists = ({ recieverId, senderId, enabled }: Props) => {
  return useQuery({
    queryKey: ["chatExists", recieverId, senderId],
    queryFn: () =>
      axios
        .get<boolean>(
          `/api/message/chatExists?recieverId=${recieverId}&senderId=${senderId}`
        )
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useChatExists;
