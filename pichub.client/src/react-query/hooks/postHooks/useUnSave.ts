import { useMutation } from "@tanstack/react-query";
import PostService from "../../services/PostService";

const useUnSave = () => {
  return useMutation({
    mutationFn: (postId: number) => PostService.unSave(postId),
  });
};

export default useUnSave;
