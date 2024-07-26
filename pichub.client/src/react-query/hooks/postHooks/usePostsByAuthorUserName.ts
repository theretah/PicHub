import { useQuery } from "@tanstack/react-query";
import { Post } from "../../../entities/Post";
import postService from "../../services/postService";
interface Props {
  userName: string;
}
const usePostsByAuthorUserName = ({ userName }: Props) => {
  return useQuery<Post[], Error>({
    queryKey: ["postsByAuthorUserName", userName],
    queryFn: () => postService.getAllByAuthorUserName(userName),
  });
};

export default usePostsByAuthorUserName;
