import { useMutation } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useSave = () => {
  return useMutation({
    mutationFn: (postId: number) => PostService.save(postId),
  });
};

export default useSave;
