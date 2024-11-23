import axios from "axios";
import { ChatLineDTO } from "../src/entities/ChatLineDTO";
import { CreateChatLineDTO } from "../src/entities/CreateChatLineDTO";

const axiosInstance = axios.create({ baseURL: "/api/chat-lines/" });

class ChatLineService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getGroupChatLinesAsync = async (groupChatId: string) =>
    await axiosInstance
      .get<ChatLineDTO[]>(
        `from-group-chat/${groupChatId}`,
        this.getAuthHeaders()
      )
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getPrivateChatLinesAsync = async (privateChatId: string) =>
    await axiosInstance
      .get<ChatLineDTO[] | null>(
        `from-private-chat/${privateChatId}`,
        this.getAuthHeaders()
      )
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((e) => {
        throw new Error(e);
      });

  sendGroupChatLineAsync = async (
    groupChatId: string,
    data: CreateChatLineDTO
  ) =>
    await axiosInstance
      .post(`from-group-chat/${groupChatId}`, data, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  sendPrivateChatLineAsync = async (
    privateChatId: string,
    data: CreateChatLineDTO
  ) =>
    await axiosInstance
      .post(`from-private-chat/${privateChatId}`, data, this.getAuthHeaders())
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
