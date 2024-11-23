import axios from "axios";
import { UserDTO } from "../src/entities/UserDTO";

const axiosInstance = axios.create({
  baseURL: "/api/users/",
});

// interface PatchOperation {
//   op: "replace" | "add" | "remove";
//   path: string;
//   value?: any;
// }

class UserService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  search = (searchQuery: string | null) =>
    axiosInstance
      .get<UserDTO[]>(`search?query=${searchQuery}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getAllUsers = () =>
    axiosInstance
      .get<UserDTO[]>("")
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getUserByIdAsync = async (id: string) =>
    await axiosInstance
      .get<UserDTO>(`${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getUserByUserNameAsync = async (userName: string) =>
    await axiosInstance
      .get<UserDTO>(`by-username/${userName}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getUserByEmailAsync = async (email: string) =>
    await axiosInstance
      .get<UserDTO>(`by-email/${email}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getLastRegisteredUsersAsync = async () =>
    await axiosInstance
      .get<UserDTO>("last-registered")
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  editProfileAsync = async (formData: FormData) =>
    await axiosInstance
      .patch(`update`, formData, this.getAuthHeaders())
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.error(e);
      });
}

export default new UserService();
