import { useQuery } from "@tanstack/react-query";
import FollowService from "../../services/FollowService";

const useFollowingsCount = (userId: string, enabled: boolean) => {
  return useQuery<number, Error>({
    queryKey: ["followingsCount", userId],
    queryFn: async () => await FollowService.followingsCount(userId),
    enabled: enabled,
  });
};

export default useFollowingsCount;
