import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../../entities/Post";

interface Props {
  id: number | undefined;
}
const usePostById = ({ id }: Props) => {
  return useQuery<Post, Error>({
    queryKey: ["postById", id],
    queryFn: async () =>
      await axios.get<Post>(`/api/post/get?id=${id}`).then((res) => res.data),
  });
};

export default usePostById;
