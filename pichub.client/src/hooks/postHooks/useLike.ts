import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
}
const useLike = ({ postId }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios
        .post(
          `/api/post/like?postId=${postId}`,
          {},
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data),
  });
};

export default useLike;
