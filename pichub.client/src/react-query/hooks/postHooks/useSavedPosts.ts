import { useQuery } from "@tanstack/react-query";
import { Post } from "../../../entities/Post";
import postService from "../../services/postService";

interface Props {
  userId: string;
}
const useSavedPosts = ({ userId }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["savedPosts", userId],
    queryFn: () => postService.getSaveds(),
  });
};

export default useSavedPosts;
