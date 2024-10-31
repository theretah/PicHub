import { PostDTO } from "../../../entities/PostDTO";
import { useQuery } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const usePosts = () => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["posts"],
    queryFn: () => PostService.getAll(),
  });
};

export default usePosts;
