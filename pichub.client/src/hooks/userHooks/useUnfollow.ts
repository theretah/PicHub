import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
interface Props {
  followingId: string;
}
const useUnfollow = ({ followingId }: Props) => {
  return useMutation({
    mutationFn: () =>
      axios.delete(`/api/user/unFollow?followingId=${followingId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
  });
};

export default useUnfollow;
