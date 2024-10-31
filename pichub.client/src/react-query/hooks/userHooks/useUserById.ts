import { useQuery } from "@tanstack/react-query";
import { UserDTO } from "../../../entities/UserDTO";
import { AxiosError } from "axios";
import UserService from "../../services/UserService";

const useUserById = (userId: string) => {
  return useQuery<UserDTO, AxiosError>({
    queryKey: ["user", userId],
    queryFn: async () => await UserService.getById(userId),
  });
};
export default useUserById;
