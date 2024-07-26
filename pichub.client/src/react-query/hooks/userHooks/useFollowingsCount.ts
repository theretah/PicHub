import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowingsCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followingsCount", userId],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getFollowingsCount?userId=${userId}`)
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useFollowingsCount;
