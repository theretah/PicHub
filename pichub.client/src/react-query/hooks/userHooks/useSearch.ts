import { useQuery } from "@tanstack/react-query";
import UserService from "../../services/UserService";

const useSearch = (searchQuery: string) => {
  return useQuery({
    queryKey: ["userSearch", searchQuery],
    queryFn: async () => await UserService.search(searchQuery),
  });
};

export default useSearch;
