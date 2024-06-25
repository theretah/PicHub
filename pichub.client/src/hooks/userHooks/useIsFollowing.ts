import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  followingId: string | undefined;
  enabled: boolean;
}

const useIsFollowing = ({ followingId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isFollowing"],
    queryFn: () =>
      axios
        .get<boolean>(`/api/user/getIsFollowing?followingId=${followingId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useIsFollowing;
