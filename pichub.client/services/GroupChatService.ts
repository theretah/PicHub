import axios from "axios";
import { GroupChatDTO } from "../src/entities/GroupChatDTO";
import { CreateGroupChatDTO } from "../src/entities/CreateGroupChatDTO";

const axiosInstance = axios.create({
  baseURL: "/api/group-chats/",
});

class GroupChatService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getAsync = async (groupChatId: string) =>
    await axiosInstance
      .get<GroupChatDTO>(`${groupChatId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getGroupChatsAsync = async () =>
    await axiosInstance
      .get<GroupChatDTO[]>("", this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  createAsync = async (data: CreateGroupChatDTO) =>
    await axiosInstance
      .post("", data, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  joinAsync = async (groupChatId: string) =>
    await axiosInstance
      .post(`${groupChatId}/members`, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  addMemberAsync = async (groupChatId: string, userId: string) =>
    await axiosInstance
      .post(`${groupChatId}/members/${userId}`, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  deleteAsync = async (groupChatId: string) =>
    await axiosInstance
      .delete(`${groupChatId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  removeMemberAsync = async (groupChatId: string, userId: string) =>
    await axiosInstance
      .delete(`${groupChatId}/members/${userId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  leaveAsync = async (groupChatId: string) =>
    await axiosInstance
      .delete(`${groupChatId}/members`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
}

export default new GroupChatService();
