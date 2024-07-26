import { useMutation } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  followingId: string;
}
const useFollow = ({ followingId }: Props) => {
  return useMutation({
    mutationFn: () => userService.follow(followingId),
  });
};

export default useFollow;
