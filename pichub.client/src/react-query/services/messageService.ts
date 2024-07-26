import axios from "axios";
import { Chat } from "../../entities/Chat";
import { MessageDto } from "../../entities/Message";

const axiosInstance = axios.create({
  baseURL: `/api/message/`,
});

class MessageService {
  startChat = (recieverId: string) => {
    return axiosInstance
      .post<number>(
        `createChat?recieverId=${recieverId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  };

  deleteChat = (chatId: number) => {
    return axios.delete(`deleteChat?chatId=${chatId}`);
  };

  chatExists = (recieverId: string, senderId: string) => {
    return axiosInstance
      .get<boolean>(`chatExists?recieverId=${recieverId}&senderId=${senderId}`)
      .then((res) => res.data);
  };

  getChat = (recieverId: string, senderId: string) => {
    return axiosInstance
      .get<Chat>(`getChat?recieverId=${recieverId}&senderId=${senderId}`)
      .then((res) => res.data);
  };

  getChats = () => {
    return axiosInstance
      .get<Chat[]>(`getChats`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  getMessages = (chatId: number) => {
    return axios
      .get<MessageDto[]>(`getMessages?chatId=${chatId}`)
      .then((res) => res.data);
  };

  sendMessage = (chatId: number, content: string) => {
    return axios.post(
      `send?chatId=${chatId}&content=${content}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  unSendMessage = (messageId: number) => {
    return axios.delete(`unSend?messageId=${messageId}`);
  };
}

export default new MessageService();
