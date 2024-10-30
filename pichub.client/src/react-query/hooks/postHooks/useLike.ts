import { useMutation } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useLike = () => {
  return useMutation({
    mutationFn: (postId: number) => PostService.like(postId),
  });
};

export default useLike;
