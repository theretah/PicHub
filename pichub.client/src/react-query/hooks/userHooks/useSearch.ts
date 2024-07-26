import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
interface Props {
  searchQuery: string;
}
const useSearch = ({ searchQuery }: Props) => {
  return useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () =>
      axios
        .get<User[]>(`/api/user/search?query=${searchQuery}`)
        .then((res) => res.data),
  });
};

export default useSearch;
