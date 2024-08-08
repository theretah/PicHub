import { useMutation } from "@tanstack/react-query";
import followService from "../../services/followService";
interface Props {
  followingId: string;
}
const useUnfollow = () => {
  return useMutation({
    mutationFn: ({ followingId }: Props) => followService.unFollow(followingId),
  });
};

export default useUnfollow;
