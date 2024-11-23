import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/blocks/",
});

class BlockService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  createAsync = async (userId: string) =>
    await axiosInstance
      .post(`${userId}`, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  deleteAsync = async (userId: string) =>
    await axiosInstance
      .delete(`${userId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getBlockedUsersAsync = async () =>
    await axiosInstance
      .get("", this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
}
export default new BlockService();
