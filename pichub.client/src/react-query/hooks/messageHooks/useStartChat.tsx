import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  recieverId: string;
}
const useStartChat = ({ recieverId }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios
        .post<number>(
          `/api/message/createChat?recieverId=${recieverId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data),
  });
};

export default useStartChat;
