import axios from "axios";
import { ChatLineDTO } from "../../entities/ChatLineDTO";
import { CreateChatLineDTO } from "../../entities/CreateChatLineDTO";

const axiosInstance = axios.create({ baseURL: "api/chat-lines" });

class ChatLineService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getGroupChatLinesAsync = async (groupChatId: string) =>
    await axiosInstance
      .get<ChatLineDTO[]>(`group-chats/${groupChatId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getPrivateChatLinesAsync = async (privateChatId: string) =>
    await axiosInstance
      .get<ChatLineDTO[]>(
        `private-chats/${privateChatId}`,
        this.getAuthHeaders()
      )
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  sendGroupChatLineAsync = async (
    groupChatId: string,
    data: CreateChatLineDTO
  ) =>
    await axiosInstance
      .post(`group-chats/${groupChatId}`, { data }, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  sendPrivateChatLineAsync = async (
    privateChatId: string,
    data: CreateChatLineDTO
  ) =>
    await axiosInstance
      .post(`private-chats/${privateChatId}`, { data }, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  deleteAsync = async (chatLineId: number) =>
    await axiosInstance
      .delete(`${chatLineId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  updateAsync = async (chatLineId: number, newContent: string) =>
    await axiosInstance
      .patch(`${chatLineId}`, newContent, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
}

export default new ChatLineService();
