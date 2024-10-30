import { useMutation } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useDeletePost = () => {
  return useMutation({
    mutationFn: (postId: number) => PostService.delete(postId),
  });
};

export default useDeletePost;
