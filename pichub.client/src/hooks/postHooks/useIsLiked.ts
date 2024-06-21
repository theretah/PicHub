import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
}
const useIsLiked = ({ postId }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked"],
    queryFn: () =>
      axios
        .get<boolean>(`/api/post/isLiked?postId=${postId}`)
        .then((res) => res.data),
  });
};

export default useIsLiked;
