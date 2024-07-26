import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
  enabled: boolean;
}
const useIsSaved = ({ postId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isSaved", postId],
    queryFn: () => postService.isSaved(postId),
    enabled: enabled,
  });
};

export default useIsSaved;
