import { useQuery } from "@tanstack/react-query";
import { Post } from "../../../entities/Post";
import postService from "../../services/postService";
interface Props {
  authorId: string;
}
const usePostsByAuthorId = ({ authorId }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthorId", authorId],
    queryFn: () => postService.getAllByAuthorId(authorId),
  });
};

export default usePostsByAuthorId;
