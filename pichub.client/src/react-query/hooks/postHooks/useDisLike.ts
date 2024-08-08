import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useDisLike = () => {
  return useMutation({
    mutationFn: ({ postId }: Props) => postService.disLike(postId),
  });
};

export default useDisLike;
