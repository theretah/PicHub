import { useMutation } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useDisLike = () => {
  return useMutation({
    mutationFn: (postId: number) => PostService.disLike(postId),
  });
};

export default useDisLike;
