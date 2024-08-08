import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import { AxiosError } from "axios";
import userService from "../../services/userService";

interface Props {
  userId: string;
}

const useUserById = ({ userId }: Props) => {
  return useQuery<User, AxiosError>({
    queryKey: ["userById", userId],
    queryFn: () => userService.getByIdAsync(userId),
  });
};
export default useUserById;
