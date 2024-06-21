import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../auth/store";

interface Props {
  userId: string | undefined;
}
const useUserById = ({ userId }: Props) => {
  return useQuery<User, Error>({
    queryKey: ["author"],
    queryFn: () =>
      axios
        .get<User>(`/api/account/getById?id=${userId}`)
        .then((res) => res.data),
  });
};
export default useUserById;
