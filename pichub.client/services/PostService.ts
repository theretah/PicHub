import axios from "axios";
import { PostDTO } from "../src/entities/PostDTO";
import { CreateEditPostDTO } from "../src/entities/CreateEditPostDTO";

const axiosInstance = axios.create({
  baseURL: "/api/posts/",
});

// interface PatchOperation {
//   op: "replace" | "add" | "remove";
//   path: string;
//   value?: any;
// }

class PostService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getAllAsync = async () =>
    await axiosInstance
      .get<PostDTO[] | null>("/")
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        throw new Error(e);
      });

  getAsync = async (id: number) =>
    await axiosInstance
      .get<PostDTO | null>(`${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getAllByAuthorAsync = async (authorId: string) =>
    await axiosInstance
      .get<PostDTO[] | null>(`by-author/${authorId}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getCountByAuthorAsync = async (authorId: string) => {
    if (!authorId) {
      throw new Error("Author ID is required.");
    }
    return await axiosInstance
      .get<number>(`by-author/${authorId}/count`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
  };

  getLikesCountAsync = async (postId: number) =>
    await axiosInstance
      .get<number | undefined>(`${postId}/likes-count`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getIsSavedAsync = async (postId: number) =>
    await axiosInstance
      .get<boolean>(`${postId}/is-saved`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getIsLikedAsync = async (postId: number) =>
    await axiosInstance
      .get<boolean>(`${postId}/is-liked`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getSavedPostsAsync = async () =>
    await axiosInstance
      .get<PostDTO[]>(`saves`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });

  getLikedPostsAsync = async () =>
    await axiosInstance
      .get<PostDTO[]>(`likes`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  createAsync = async (data: FormData) =>
    await axiosInstance
      .post("", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((e) => {
        throw new Error(e);
      });

  likeAsync = async (postId: number) =>
    await axiosInstance
      .post(`${postId}/likes`, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  saveAsync = async (postId: number) =>
    await axiosInstance
      .post(`${postId}/saves`, {}, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  updateAsync = async (postId: number, data: CreateEditPostDTO) =>
    await axiosInstance
      .patch(`${postId}`, data, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  disLikeAsync = async (postId: number) =>
    await axiosInstance
      .delete(`${postId}/likes`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  unSaveAsync = async (postId: number) =>
    await axiosInstance
      .delete(`${postId}/saves`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  deleteAsync = async (postId: number) =>
    await axiosInstance
      .delete(`${postId}`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });
}

export default new PostService();
