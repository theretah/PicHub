import axios from "axios";
import { PostDTO } from "../../entities/PostDTO";

const axiosInstance = axios.create({
  baseURL: `/api/post/`,
});

class PostService {
  getById = async (id: number) => {
    return await axiosInstance
      .get<PostDTO>(`get?id=${id}`)
      .then((res) => res.data);
  };

  getAll = async () => {
    return await axiosInstance.get<PostDTO[]>(`getAll`).then((res) => res.data);
  };

  getAllByAuthorUserName = async (userName: string) => {
    return await axiosInstance
      .get<PostDTO[]>(`getAllByAuthorUserName?userName=${userName}`)
      .then((res) => res.data);
  };

  getAllByAuthorId = async (authorId: string) => {
    return await axiosInstance
      .get<PostDTO[]>(`getAllByAuthorId?authorId=${authorId}`)
      .then((res) => res.data);
  };

  like = async (postId: number) => {
    return await axiosInstance
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

  disLike = async (postId: number) => {
    return await axiosInstance
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

  isLiked = async (postId: number) => {
    return await axiosInstance
      .get<boolean>(`isLiked?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  likesCount = async (postId: number) => {
    return await axiosInstance
      .get(`getLikesCount?postId=${postId}`)
      .then((res) => res.data);
  };

  save = async (postId: number) => {
    return await axiosInstance
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

  unSave = async (postId: number) => {
    return await axiosInstance
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

  isSaved = async (postId: number) => {
    return await axiosInstance
      .get<boolean>(`isSaved?postId=${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };

  delete = async (postId: number) => {
    return await axiosInstance
      .delete(`delete?id=${postId}`)
      .then((res) => res.data);
  };

  getSavedPosts = async () => {
    return await axiosInstance
      .get<PostDTO[]>(`getSavedPosts`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => res.data);
  };
}

export default new PostService();
