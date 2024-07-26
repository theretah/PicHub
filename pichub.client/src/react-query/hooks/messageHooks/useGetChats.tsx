import { useQuery } from "@tanstack/react-query";
import { Chat } from "../../../entities/Chat";
import messageService from "../../services/messageService";

const useGetChats = () => {
  return useQuery<Chat[]>({
    queryKey: ["getChats"],
    queryFn: () => messageService.getChats(),
  });
};

export default useGetChats;
