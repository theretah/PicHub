import { useMutation } from "@tanstack/react-query";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useSave = ({ postId }: Props) => {
  return useMutation({
    mutationFn: () => postService.save(postId),
  });
};

export default useSave;
