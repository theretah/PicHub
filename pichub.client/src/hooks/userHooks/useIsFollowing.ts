import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  followingId: string | undefined;
}

const useIsFollowing = ({ followingId }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isFollowing"],
    queryFn: () =>
      axios
        .get<boolean>(`/api/user/getIsFollowing?followingId=${followingId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
  });
};

export default useIsFollowing;
