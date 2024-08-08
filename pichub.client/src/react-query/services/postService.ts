import axios from "axios";
import { Post } from "../../entities/Post";

const axiosInstance = axios.create({
  baseURL: `/api/post/`,
});

class PostService {
  getById = (id: number) => {
    return axiosInstance.get<Post>(`get?id=${id}`).then((res) => res.data);
  };

  getAll = () => {
    return axiosInstance.get<Post[]>(`getAll`).then((res) => res.data);
  };

  getAllByAuthorUserName = (userName: string) => {
    return axiosInstance
      .get<Post[]>(`getAllByAuthorUserName?userName=${userName}`)
      .then((res) => res.data);
  };

  getAllByAuthorId = (authorId: string) => {
    return axiosInstance
      .get<Post[]>(`getAllByAuthorId?authorId=${authorId}`)
      .then((res) => res.data);
  };

  like = (postId: number) => {
    return axiosInstance
      .post(
        `like?postId=${postId}`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  };

  disLike = (postId: number) => {
    return axiosInstance
      .delete(`disLike?postId=${postId}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
  };

  isLiked = (postId: number) => {
    return axiosInstance
      .get<boolean>(`isLiked?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  likesCount = (postId: number) => {
    return axiosInstance
      .get(`getLikesCount?postId=${postId}`)
      .then((res) => res.data);
  };

  save = (postId: number) => {
    return axiosInstance
      .post(
        `save?postId=${postId}`,
        {},
        {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => res.data);
  };

  unSave = (postId: number) => {
    return axiosInstance
      .delete(`unSave?postId=${postId}`, {
        headers: {
          Authorization: `bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
  };

  isSaved = (postId: number) => {
    return axiosInstance
      .get<boolean>(`isSaved?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  delete = (postId: number) => {
    return axiosInstance.delete(`delete?id=${postId}`).then((res) => res.data);
  };

  getSaveds = () => {
    return axiosInstance
      .get<Post[]>(`getSavedPosts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}

export default new PostService();
