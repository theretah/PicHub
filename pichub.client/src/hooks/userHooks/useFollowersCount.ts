import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userId: string;
}
const useFollowersCount = ({ userId }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getFollowersCount?userId=${userId}`)
        .then((res) => res.data),
  });
};

export default useFollowersCount;
