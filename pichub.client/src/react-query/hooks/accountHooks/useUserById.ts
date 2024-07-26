import { useQuery } from "@tanstack/react-query";
import { User } from "../../../entities/User";
import { AxiosError } from "axios";
import accountService from "../../services/accountService";

interface Props {
  userId: string;
}

const useUserById = ({ userId }: Props) => {
  return useQuery<User, AxiosError>({
    queryKey: ["userById", userId],
    queryFn: () => accountService.getByIdAsync(userId),
  });
};
export default useUserById;
