import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Props {
  postId: number;
}
const useIsSaved = ({ postId }: Props) => {
  return useQuery<boolean, Error>({
    queryKey: ["isSaved"],
    queryFn: () =>
      axios
        .get<boolean>(`/api/post/isSaved?postId=${postId}`)
        .then((res) => res.data),
  });
};

export default useIsSaved;
