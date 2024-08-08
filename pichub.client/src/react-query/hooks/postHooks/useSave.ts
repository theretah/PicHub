import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useSave = () => {
  return useMutation({
    mutationFn: ({ postId }: Props) => postService.save(postId),
  });
};

export default useSave;
