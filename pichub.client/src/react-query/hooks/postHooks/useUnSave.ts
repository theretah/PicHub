import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useUnSave = () => {
  return useMutation({
    mutationFn: ({ postId }: Props) => postService.unSave(postId),
  });
};

export default useUnSave;
