import axios from "axios";

const axiosInstance = axios.create({ baseURL: "/api/follow/" });

class FollowService {
  follow = (followingId: string) => {
    return axiosInstance.post(
      `follow?followingId=${followingId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  unFollow = (followingId: string) => {
    return axiosInstance.delete(`unFollow?followingId=${followingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  followersCount = (userId: string) => {
    return axiosInstance
      .get<number>(`getFollowersCount?userId=${userId}`)
      .then((res) => res.data);
  };

  followingsCount = (userId: string) => {
    return axiosInstance
      .get<number>(`getFollowingsCount?userId=${userId}`)
      .then((res) => res.data);
  };

  isFollowing = (followingId: string) => {
    return axiosInstance
      .get<boolean>(`getIsFollowing?followingId=${followingId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}

export default new FollowService();
