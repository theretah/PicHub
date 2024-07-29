import axios from "axios";
import { User } from "../../entities/User";

const axiosInstance = axios.create({
  baseURL: `/api/user/`,
});

class UserService {
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

  search = (searchQuery: string) => {
    return axiosInstance
      .get<User[]>(`search?query=${searchQuery}`)
      .then((res) => res.data);
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

  postsCount = (userId: string) => {
    return axiosInstance
      .get<number>(`getPostsCount?userId=${userId}`)
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

export default new UserService();
