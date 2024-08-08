import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import { AxiosError } from "axios";
import userService from "../../services/userService";

const useUsers = () => {
  return useQuery<User[], AxiosError>({
    queryKey: ["users"],
    queryFn: () => userService.getAll(),
  });
};
export default useUsers;
