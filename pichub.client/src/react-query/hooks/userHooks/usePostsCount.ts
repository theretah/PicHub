import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/UserService";

const usePostsCount = (userId: string, enabled: boolean) => {
  return useQuery<number, Error>({
    queryKey: ["userPostsCount", userId],
    queryFn: async () => await UserService.postsCount(userId),
    enabled: enabled,
  });
};

export default usePostsCount;
