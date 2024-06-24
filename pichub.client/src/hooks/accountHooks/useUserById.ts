import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../entities/User";

interface Props {
  userId: string | undefined;
}
const useUserById = ({ userId }: Props) => {
  return useQuery<User, Error>({
    queryKey: ["author", userId],
    queryFn: async () =>
      await axios
        .get<User>(`/api/account/getById?id=${userId}`)
        .then((res) => res.data),
  });
};
export default useUserById;
