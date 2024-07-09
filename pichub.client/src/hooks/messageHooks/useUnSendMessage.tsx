import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  messageId: number;
}
const useUnSendMessage = ({ messageId }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios.delete(`/api/message/unSend?messageId=${messageId}`),
  });
};

export default useUnSendMessage;
