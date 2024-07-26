import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Chat } from "../../../entities/Chat";

const useGetChats = () => {
  return useQuery<Chat[]>({
    queryKey: ["getChats"],
    queryFn: () =>
      axios
        .get<Chat[]>(`/api/message/getChats`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });
};

export default useGetChats;
