import { useQuery } from "@tanstack/react-query";
import followService from "../../services/followService";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowingsCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followingsCount", userId],
    queryFn: () => followService.followingsCount(userId),
    enabled: enabled,
  });
};

export default useFollowingsCount;
