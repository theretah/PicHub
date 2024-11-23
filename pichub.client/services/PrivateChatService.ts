import axios from "axios";
import { PrivateChatDTO } from "../src/entities/PrivateChatDTO";

const axiosInstance = axios.create({
  baseURL: "/api/private-chats/",
});

class PrivateChatService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getAsync = async (userId: string) =>
    await axiosInstance
      .get<PrivateChatDTO>(userId, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getPrivateChatsAsync = async () =>
    await axiosInstance
      .get<PrivateChatDTO[]>("", this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  createAsync = async (recieverId: string) =>
    await axiosInstance
      .post<string>(recieverId, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  deleteAsync = async (chatId: string) =>
    await axiosInstance
      .delete(chatId, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
}

export default new PrivateChatService();
