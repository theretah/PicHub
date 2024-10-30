import axios from "axios";

const axiosInstance = axios.create({ baseURL: "/api/follow/" });

class FollowService {
  follow = async (followingId: string) => {
    return await axiosInstance.post(
      `follow?followingId=${followingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  unFollow = async (followingId: string) => {
    return await axiosInstance.delete(`unFollow?followingId=${followingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  followersCount = async (userId: string) => {
    return await axiosInstance
      .get<number>(`getFollowersCount?userId=${userId}`)
      .then((res) => res.data);
  };

  followingsCount = async (userId: string) => {
    return await axiosInstance
      .get<number>(`getFollowingsCount?userId=${userId}`)
      .then((res) => res.data);
  };

  isFollowing = async (followingId: string) => {
    return await axiosInstance
      .get<boolean>(`getIsFollowing?followingId=${followingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}

export default new FollowService();
