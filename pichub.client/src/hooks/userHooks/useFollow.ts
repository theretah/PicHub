import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
interface Props {
  followingId: string;
}
const useFollow = ({ followingId }: Props) => {
  return useMutation({
    mutationFn: async () =>
      await axios.post(
        `/api/user/follow?followingId=${followingId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
  });
};

export default useFollow;
