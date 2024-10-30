import { useQuery } from "@tanstack/react-query";
import FollowService from "../../services/FollowService";

const useFollowersCount = (userId: string, enabled: boolean) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: async () => await FollowService.followersCount(userId),
    enabled: enabled,
  });
};

export default useFollowersCount;
