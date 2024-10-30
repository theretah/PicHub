import { useQuery } from "@tanstack/react-query";
import FollowService from "../../services/FollowService";

const useIsFollowing = (followingId: string, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isFollowing", followingId],
    queryFn: async () => await FollowService.isFollowing(followingId),
    enabled: enabled,
  });
};

export default useIsFollowing;
