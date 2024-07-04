import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  content: string;
  chatId: number;
}
const useSendMessage = ({ chatId, content }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios.post(
        `/api/message/send?chatId=${chatId}&content=${content}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
  });
};

export default useSendMessage;
