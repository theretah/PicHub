import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import accountService from "../../services/accountService";

interface Props {
  userName: string;
}
const useUserByUserName = ({ userName }: Props) => {
  return useQuery<User, Error>({
    queryKey: ["userByUserName", userName],
    queryFn: () => accountService.getByUserNameAsync(userName),
  });
};
export default useUserByUserName;
