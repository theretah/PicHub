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

  getAll = async () => {
    return await axiosInstance.get<User[]>(`getAll`).then((res) => res.data);
  };

  getByUserNameAsync = async (userName: string) => {
    return await axiosInstance
      .get<User>(`getByUserName?userName=${userName}`)
      .then((res) => res.data);
  };

  updateAsync = async (data: FormData) => {
    for (const pair of data.entries()) {
      console.log("userService.ts: " + pair[0], pair[1]);
    }
    return await axiosInstance
      .put(`update`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

export default new UserService();
