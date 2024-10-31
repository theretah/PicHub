import { useQuery } from "@tanstack/react-query";
import { PostDTO } from "../../../entities/PostDTO";
import PostService from "../../services/PostService";

const useSavedPosts = (userId: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["postsSaved", userId],
    queryFn: () => PostService.getSavedPosts(),
  });
};

export default useSavedPosts;
