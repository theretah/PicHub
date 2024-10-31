import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `/api/groupChat/`,
});

class GroupChatService {
  create = async (isPrivate: boolean, isChannel: boolean) => {
    return await axiosInstance
      .post(
        `start?isPrivate=${isPrivate}&isChannel=${isChannel}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  };

  delete = async (groupChatId: string) => {
    return await axiosInstance
      .delete(`send?groupChatId=${groupChatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  send = async (
    groupChatId: string,
    content: string,
    replyingToId: number | null
  ) => {
    return await axiosInstance
      .post(
        `send?groupChatId=${groupChatId}&content=${content}&replyingToId=${replyingToId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data);
  };

  unSend = async (chatLineId: string) => {
    return await axiosInstance
      .delete(`unSend?chatLineId=${chatLineId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  addMember = async (groupChatId: string, userId: string) => {
    return await axiosInstance
      .post(
        `addMember?groupChatId=${groupChatId}&userId=${userId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data);
  };

  removeMember = async (groupChatId: string, userId: string) => {
    return await axiosInstance
      .delete(`removeMember?groupChatId=${groupChatId}&userId=${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  join = async (groupChatId: string) => {
    return await axiosInstance
      .post(
        `join?groupChatId=${groupChatId}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((res) => res.data);
  };

  leave = async (groupChatId: string) => {
    return await axiosInstance
      .delete(`leave?groupChatId=${groupChatId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}
export default new GroupChatService();
