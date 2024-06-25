import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../../entities/Post";

interface Props {
  userId: string;
}
const useSavedPosts = ({ userId }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["savedPosts", userId],
    queryFn: async () =>
      await axios
        .get<Post[]>(`/api/post/getSavedPosts`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });
};

export default useSavedPosts;
