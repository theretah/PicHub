import { useQuery } from "@tanstack/react-query";
import { MessageDto } from "../../../entities/Message";
import axios from "axios";
interface Props {
  chatId: number;
}

const useGetMessages = ({ chatId }: Props) => {
  return useQuery<MessageDto[]>({
    queryKey: ["getMessages", chatId],
    queryFn: () =>
      axios
        .get<MessageDto[]>(`/api/message/getMessages?chatId=${chatId}`)
        .then((res) => res.data),
  });
};

export default useGetMessages;
