import axios from "axios";
import { User } from "../../entities/User";

const axiosInstance = axios.create({
  baseURL: `/api/account/`,
});

class AccountService {
  getByIdAsync = async (id: string) => {
    return await axiosInstance
      .get<User>(`getById?id=${id}`)
      .then((res) => res.data);
  };

  getByUserNameAsync = async (userName: string) => {
    return await axiosInstance
      .get<User>(`getByUserName?userName=${userName}`)
      .then((res) => res.data);
  };
}

export default new AccountService();
