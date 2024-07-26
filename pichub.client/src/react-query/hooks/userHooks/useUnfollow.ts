import { useMutation } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  followingId: string;
}
const useUnfollow = ({ followingId }: Props) => {
  return useMutation({
    mutationFn: () => userService.unFollow(followingId),
  });
};

export default useUnfollow;
