import axios from "axios";

const axiosInstance = axios.create({ baseURL: "/api/follows/" });

class FollowService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  followersCountAsync = async (userId: string) => {
    return await axiosInstance
      .get<number>(`${userId}/followers-count`)
      .then((res) => res.data);
  };

  followingsCountAsync = async (userId: string) => {
    return await axiosInstance
      .get<number>(`${userId}/followings-count`)
      .then((res) => res.data);
  };

  isFollowedAsync = async (userId: string) => {
    return await axiosInstance
      .get<boolean>(`is-followed/${userId}`, this.getAuthHeaders())
      .then((res) => res.data);
  };

  followAsync = async (userId: string) => {
    return await axiosInstance
      .post(`${userId}`, {}, this.getAuthHeaders())
      .then((res) => res.data);
  };

  unFollowAsync = async (userId: string) => {
    return await axiosInstance
      .delete(`${userId}`, this.getAuthHeaders())
      .then((res) => res.data);
  };
}

export default new FollowService();
