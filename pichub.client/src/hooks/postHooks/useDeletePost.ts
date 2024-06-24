import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
}
const useDeletePost = ({ postId }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios.delete(`/api/post/delete?id=${postId}`).then((res) => res.data),
  });
};

export default useDeletePost;
