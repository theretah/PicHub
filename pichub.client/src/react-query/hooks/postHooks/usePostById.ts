import { useQuery } from "@tanstack/react-query";
import { Post } from "../../../entities/Post";
import postService from "../../services/postService";

interface Props {
  id: number;
}
const usePostById = ({ id }: Props) => {
  return useQuery<Post, Error>({
    queryKey: ["postById", id],
    queryFn: () => postService.getById(id),
  });
};

export default usePostById;
