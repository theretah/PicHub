import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import userService from "../../services/userService";

interface Props {
  userName: string;
}
const useUserByUserName = ({ userName }: Props) => {
  return useQuery<User, Error>({
    queryKey: ["userByUserName", userName],
    queryFn: () => userService.getByUserNameAsync(userName),
  });
};
export default useUserByUserName;
