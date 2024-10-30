import { useMutation } from "@tanstack/react-query";
import FollowService from "../../services/FollowService";

const useUnfollow = () => {
  return useMutation({
    mutationFn: async (followingId: string) =>
      await FollowService.unFollow(followingId),
  });
};

export default useUnfollow;
