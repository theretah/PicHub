import axios from "axios";
import { UserDTO } from "../../entities/UserDTO";

const axiosInstance = axios.create({
  baseURL: `/api/user/`,
});

class UserService {
  postsCount = async (userId: string) => {
    return await axiosInstance
      .get<number>(`getPostsCount?userId=${userId}`)
      .then((res) => res.data);
  };

  search = async (searchQuery: string) => {
    return await axiosInstance
      .get<UserDTO[]>(`search?query=${searchQuery}`)
      .then((res) => res.data);
  };

  getById = async (id: string) => {
    return await axiosInstance
      .get<UserDTO>(`getById?id=${id}`)
      .then((res) => res.data);
  };

  getAll = async () => {
    return await axiosInstance.get<UserDTO[]>(`getAll`).then((res) => res.data);
  };

  getByUserName = async (userName: string) => {
    return await axiosInstance
      .get<UserDTO>(`getByUserName?userName=${userName}`)
      .then((res) => res.data);
  };

  update = async (data: FormData) => {
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

  block = async (userId: string) => {
    return await axiosInstance
      .post(
        `block?userId=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data);
  };

  unBlock = async (userId: string) => {
    return await axiosInstance
      .delete(`unBlock?userId=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  getBlockedUsers = async () => {
    return await axiosInstance
      .get("getBlockedUsers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}

export default new UserService();
