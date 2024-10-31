import { useQuery } from "@tanstack/react-query";
import { PrivateChatDTO } from "../../../entities/PrivateChatDTO";
import PrivateChatService from "../../services/PrivateChatService";

const useGetPrivateChats = () => {
  return useQuery<PrivateChatDTO[]>({
    queryKey: ["privateChats"],
    queryFn: async () => await PrivateChatService.getAll(),
  });
};

export default useGetPrivateChats;
