import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  userId: string;
  enabled: boolean;
}
const useFollowingsCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["followingsCount", userId],
    queryFn: () => userService.followingsCount(userId),
    enabled: enabled,
  });
};

export default useFollowingsCount;
