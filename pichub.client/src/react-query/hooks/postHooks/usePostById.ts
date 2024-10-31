import { useQuery } from "@tanstack/react-query";
import { PostDTO } from "../../../entities/PostDTO";
import PostService from "../../services/PostService";

const usePostById = (id: number) => {
  return useQuery<PostDTO, Error>({
    queryKey: ["post", id],
    queryFn: () => PostService.getById(id),
  });
};

export default usePostById;
