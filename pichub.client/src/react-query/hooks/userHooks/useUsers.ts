import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "../../../entities/UserDTO";
import { AxiosError } from "axios";
import UserService from "../../services/UserService";

const useUsers = () => {
  return useQuery<UserDTO[], AxiosError>({
    queryKey: ["users"],
    queryFn: async () => await UserService.getAll(),
  });
};
export default useUsers;
