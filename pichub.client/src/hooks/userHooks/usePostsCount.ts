import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userName: string;
}
const usePostsCount = ({ userName }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["postsCount"],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getPostsCount?userName=${userName}`)
        .then((res) => res.data),
  });
};

export default usePostsCount;
