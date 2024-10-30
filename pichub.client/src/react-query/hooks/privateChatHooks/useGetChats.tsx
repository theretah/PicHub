import { useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../../entities/PrivateChatDTO";
import PrivateChatService from "../../services/PrivateChatService";

const useGetChats = () => {
  return useQuery<PrivateChatDTO[]>({
    queryKey: ["getChats"],
    queryFn: async () => PrivateChatService.getChats(),
  });
};

export default useGetChats;
