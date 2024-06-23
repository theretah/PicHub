import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Post } from "../../interfaces/Post";
interface Props {
  userName: string;
}
const usePostsByAuthorUserName = ({ userName }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthor"],
    queryFn: () =>
      axios
        .get<Post[]>(`/api/post/getAllByAuthorUserName?userName=${userName}`)
        .then((res) => res.data),
  });
};

export default usePostsByAuthorUserName;