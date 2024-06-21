import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../../interfaces/Post";
interface Props {
  authorId: string;
}
const usePostsByAuthor = ({ authorId }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthor"],
    queryFn: () =>
      axios
        .get<Post[]>(`/api/post/getAllByAuthor?authorId=${authorId}`)
        .then((res) => res.data),
  });
};

export default usePostsByAuthor;
