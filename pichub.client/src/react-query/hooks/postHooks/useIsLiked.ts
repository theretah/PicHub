import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
  enabled: boolean;
}
const useIsLiked = ({ postId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: () => postService.isLiked(postId),
    enabled: enabled,
  });
};

export default useIsLiked;
