import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userName: string;
  enabled: boolean;
}
const usePostsCount = ({ userName, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["postsCount", userName],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getPostsCount?userName=${userName}`)
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default usePostsCount;
