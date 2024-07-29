import axios from "axios";
import { User } from "../../entities/User";

const axiosInstance = axios.create({
  baseURL: `/api/user/`,
});

class UserService {
  postsCount = (userId: string) => {
    return axiosInstance
      .get<number>(`getPostsCount?userId=${userId}`)
      .then((res) => res.data);
  };

  search = (searchQuery: string) => {
    return axiosInstance
      .get<User[]>(`search?query=${searchQuery}`)
      .then((res) => res.data);
  };

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

export default new UserService();
