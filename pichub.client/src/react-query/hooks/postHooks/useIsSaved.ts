import { useQuery } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useIsSaved = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["postIsSaved", postId],
    queryFn: () => PostService.isSaved(postId),
    enabled: enabled,
  });
};

export default useIsSaved;
