import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
  enabled: boolean;
}
const useIsLiked = ({ postId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: () =>
      axios
        .get<boolean>(`/api/post/isLiked?postId=${postId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useIsLiked;
