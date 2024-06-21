import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Props {
  postId: number;
}
const useLikesCount = ({ postId }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["likesCount"],
    queryFn: () =>
      axios
        .get<number>(`/api/post/getLikesCount?postId=${postId}`)
        .then((res) => res.data),
  });
};

export default useLikesCount;
