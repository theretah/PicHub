import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useDeletePost = ({ postId }: Props) => {
  return useMutation({
    mutationFn: () => postService.delete(postId),
  });
};

export default useDeletePost;
