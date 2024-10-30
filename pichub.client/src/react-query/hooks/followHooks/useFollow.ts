import { useMutation } from "@tanstack/react-query";
import FollowService from "../../services/FollowService";

const useFollow = () => {
  return useMutation({
    mutationFn: async (followingId: string) =>
      await FollowService.follow(followingId),
  });
};

export default useFollow;
