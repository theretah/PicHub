import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  recieverId: string;
}
const useStartChat = ({ recieverId }: Props) => {
  return useMutation({
    mutationFn: () => messageService.startChat(recieverId),
  });
};

export default useStartChat;
