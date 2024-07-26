import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  userId: string;
  enabled: boolean;
}
const usePostsCount = ({ userId, enabled }: Props) => {
  return useQuery<number, Error>({
    queryKey: ["postsCount", userId],
    queryFn: () => userService.postsCount(userId),
    enabled: enabled,
  });
};

export default usePostsCount;
