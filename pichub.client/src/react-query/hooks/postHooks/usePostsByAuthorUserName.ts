import { useQuery } from "@tanstack/react-query";
import { PostDTO } from "../../../entities/PostDTO";
import PostService from "../../services/PostService";

const usePostsByAuthorUserName = (userName: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["postsByAuthorUserName", userName],
    queryFn: () => PostService.getAllByAuthorUserName(userName),
  });
};

export default usePostsByAuthorUserName;
