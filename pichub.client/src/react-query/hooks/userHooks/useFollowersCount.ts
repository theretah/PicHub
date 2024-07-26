import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowersCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getFollowersCount?userId=${userId}`)
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useFollowersCount;
