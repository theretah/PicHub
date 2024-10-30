import { useQuery } from "@tanstack/react-query";
import { PostDTO } from "../../../entities/PostDTO";
import PostService from "../../services/PostService";

const usePostsByAuthorId = (authorId: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["postsByAuthorId", authorId],
    queryFn: () => PostService.getAllByAuthorId(authorId),
  });
};

export default usePostsByAuthorId;
