import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const postLike = () => {
  const like = useMutation<number, Error>({
    mutationFn: (postId: number) =>
      axios
        .post(
          `/api/post/like`,
          { postId },
          {
            headers: {
              Authorization: `bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => res.data),
  });
};

export default postLike;
