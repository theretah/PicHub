import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useLike = () => {
  return useMutation({
    mutationFn: ({ postId }: Props) => postService.like(postId),
  });
};

export default useLike;
