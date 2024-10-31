import { useQuery } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useLikesCount = (postId: number) => {
  return useQuery({
    queryKey: ["postLikesCount", postId],
    queryFn: () => PostService.likesCount(postId),
  });
};

export default useLikesCount;
