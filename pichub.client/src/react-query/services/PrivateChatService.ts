import axios from "axios";
import { PrivateChatDTO } from "../../entities/PrivateChatDTO";
import { ChatLineDTO } from "../../entities/ChatLineDTO";

const axiosInstance = axios.create({
  baseURL: `/api/privateChat/`,
});

class PrivateChatService {
  start = async (recieverId: string) => {
    return await axiosInstance
      .post<number>(
        `start?recieverId=${recieverId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  };

  delete = async (chatId: number) => {
    return await axiosInstance.delete(`deleteChat?chatId=${chatId}`);
  };

  exists = async (recieverId: string, senderId: string) => {
    return await axiosInstance
      .get<boolean>(`chatExists?recieverId=${recieverId}&senderId=${senderId}`)
      .then((res) => res.data);
  };

  get = async (recieverId: string, senderId: string) => {
    return await axiosInstance
      .get<PrivateChatDTO>(
        `getChat?recieverId=${recieverId}&senderId=${senderId}`
      )
      .then((res) => res.data);
  };

  getAll = async () => {
    return await axiosInstance
      .get<PrivateChatDTO[]>(`getChats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  getChatLines = async (chatId: string) => {
    return await axiosInstance
      .get<ChatLineDTO[]>(`getChatLines?chatId=${chatId}`)
      .then((res) => res.data);
  };

  send = async (
    chatId: string,
    content: string,
    replyingToId: number | null
  ) => {
    return await axiosInstance.post(
      `send?chatId=${chatId}&content=${content}&replyingToId=${replyingToId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  unSend = async (chatLineId: number) => {
    return await axiosInstance.delete(`unSend?chatLineId=${chatLineId}`);
  };
}

export default new PrivateChatService();
