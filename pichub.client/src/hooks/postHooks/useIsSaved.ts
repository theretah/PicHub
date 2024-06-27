import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
  enabled: boolean;
}
const useIsSaved = ({ postId, enabled }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isSaved", postId],
    queryFn: () =>
      axios
        .get<boolean>(`/api/post/isSaved?postId=${postId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => res.data),
    enabled: enabled,
  });
};

export default useIsSaved;
