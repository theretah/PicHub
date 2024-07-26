import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";

interface Props {
  followingId: string;
  enabled: boolean;
}

const useIsFollowing = ({ followingId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isFollowing", followingId],
    queryFn: () => userService.isFollowing(followingId),
    enabled: enabled,
  });
};

export default useIsFollowing;
