import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../../entities/User";

interface Props {
  userName: string | undefined;
}
const useUserByUserName = ({ userName }: Props) => {
  return useQuery<User, Error>({
    queryKey: ["authorByUsername", userName],
    queryFn: async () =>
      await axios
        .get<User>(`/api/account/getByUserName?userName=${userName}`)
        .then((res) => res.data),
  });
};
export default useUserByUserName;
