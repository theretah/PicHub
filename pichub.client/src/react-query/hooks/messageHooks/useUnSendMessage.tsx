import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  messageId: number;
}
const useUnSendMessage = ({ messageId }: Props) => {
  return useMutation({
    mutationFn: () => messageService.unSendMessage(messageId),
  });
};

export default useUnSendMessage;
