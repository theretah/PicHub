import { useQuery } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useLikesCount = ({ postId }: Props) => {
  return useQuery({
    queryKey: ["likesCount", postId],
    queryFn: () => postService.likesCount(postId),
  });
};

export default useLikesCount;
