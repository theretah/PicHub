import { useQuery } from "@tanstack/react-query";
import followService from "../../services/followService";

interface Props {
  followingId: string;
  enabled: boolean;
}

const useIsFollowing = ({ followingId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isFollowing", followingId],
    queryFn: () => followService.isFollowing(followingId),
    enabled: enabled,
  });
};

export default useIsFollowing;
