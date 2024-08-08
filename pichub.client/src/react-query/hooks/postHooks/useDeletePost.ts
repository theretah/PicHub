import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useDeletePost = () => {
  return useMutation({
    mutationFn: ({ postId }: Props) => postService.delete(postId),
  });
};

export default useDeletePost;
