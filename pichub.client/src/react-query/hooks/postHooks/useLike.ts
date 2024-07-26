import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import postService from "../../services/postService";

interface Props {
  postId: number;
}
const useLike = ({ postId }: Props) => {
  return useMutation({
    mutationFn: () => postService.like(postId),
  });
};

export default useLike;
