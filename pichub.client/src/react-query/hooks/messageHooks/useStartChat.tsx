import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  recieverId: string;
}
const useStartChat = () => {
  return useMutation({
    mutationFn: ({ recieverId }: Props) => messageService.startChat(recieverId),
  });
};

export default useStartChat;
