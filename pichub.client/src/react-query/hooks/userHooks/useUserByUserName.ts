import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "../../../entities/UserDTO";
import UserService from "../../services/UserService";

const useUserByUserName = (userName: string) => {
  return useQuery<UserDTO, Error>({
    queryKey: ["userByUserName", userName],
    queryFn: async () => await UserService.getByUserName(userName),
  });
};
export default useUserByUserName;
