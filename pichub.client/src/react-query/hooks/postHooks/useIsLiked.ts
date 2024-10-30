import { useQuery } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useIsLiked = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: () => PostService.isLiked(postId),
    enabled: enabled,
  });
};

export default useIsLiked;
