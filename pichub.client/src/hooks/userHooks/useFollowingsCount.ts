import axios from "axios";
import { useQuery } from "@tanstack/react-query";
interface Props {
  userId: string;
}
const useFollowingsCount = ({ userId }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: async () =>
      await axios
        .get<number>(`/api/user/getFollowingsCount?userId=${userId}`)
        .then((res) => res.data),
  });
};

export default useFollowingsCount;
