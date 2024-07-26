import { useQuery } from "@tanstack/react-query";
import userService from "../../services/userService";
interface Props {
  searchQuery: string;
}
const useSearch = ({ searchQuery }: Props) => {
  return useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => userService.search(searchQuery),
  });
};

export default useSearch;
