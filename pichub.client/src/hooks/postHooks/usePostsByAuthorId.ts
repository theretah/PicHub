import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../../entities/Post";
interface Props {
  authorId: string;
}
const usePostsByAuthorId = ({ authorId }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthorId", authorId],
    queryFn: () =>
      axios
        .get<Post[]>(`/api/post/getAllByAuthorId?authorId=${authorId}`)
        .then((res) => res.data),
  });
};

export default usePostsByAuthorId;
