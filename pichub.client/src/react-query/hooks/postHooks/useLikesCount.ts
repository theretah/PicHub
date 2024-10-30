import { useQuery } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useLikesCount = (postId: number) => {
  return useQuery({
    queryKey: ["likesCount", postId],
    queryFn: () => PostService.likesCount(postId),
  });
};

export default useLikesCount;
