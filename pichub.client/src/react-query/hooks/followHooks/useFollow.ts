import { useMutation } from "@tanstack/react-query";
import followService from "../../services/followService";
interface Props {
  followingId: string;
}
const useFollow = () => {
  return useMutation({
    mutationFn: ({ followingId }: Props) => followService.follow(followingId),
  });
};

export default useFollow;
