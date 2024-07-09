import { useMutation } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  chatId: number;
}
const useDeleteChat = ({ chatId }: Props) => {
  return useMutation({
    mutationFn: () => axios.delete(`/api/message/deleteChat?chatId=${chatId}`),
  });
};

export default useDeleteChat;
