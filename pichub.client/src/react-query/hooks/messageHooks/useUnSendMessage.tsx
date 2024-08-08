import { useMutation } from "@tanstack/react-query";
import messageService from "../../services/messageService";
interface Props {
  messageId: number;
}
const useUnSendMessage = () => {
  return useMutation({
    mutationFn: ({ messageId }: Props) =>
      messageService.unSendMessage(messageId),
  });
};

export default useUnSendMessage;
