import { Post } from "../../../entities/Post";
import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";

const usePosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ["allPosts"],
    queryFn: () => postService.getAll(),
  });
};

export default usePosts;
