import { useQuery } from "@tanstack/react-query";
import followService from "../../services/followService";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowersCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: () => followService.followersCount(userId),
    enabled: enabled,
  });
};

export default useFollowersCount;
