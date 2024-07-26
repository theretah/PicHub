import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowersCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: () => userService.followersCount(userId),
    enabled: enabled,
  });
};

export default useFollowersCount;
