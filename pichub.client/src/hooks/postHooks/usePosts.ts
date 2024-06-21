import axios from "axios";
import { Post } from "../../interfaces/Post";
import { useQuery } from "@tanstack/react-query";

const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["allPosts"],
    queryFn: async () =>
      await axios.get<Post[]>(`/api/post/getAll`).then((res) => res.data),
  });
};

export default usePosts;
