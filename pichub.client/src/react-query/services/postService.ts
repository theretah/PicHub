import axios from "axios";
import { PostDTO } from "../../entities/PostDTO";
import { CreateEditPostDTO } from "../../entities/CreateEditPostDTO";

const axiosInstance = axios.create({
  baseURL: `/api/posts/`,
});

interface PatchOperation {
  op: "replace" | "add" | "remove";
  path: string;
  value?: any;
}

class PostService {
  private getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  getAllAsync = async () =>
    await axiosInstance
      .get<PostDTO[]>("")
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getAsync = async (id: number) =>
    await axiosInstance
      .get<PostDTO>(`${id}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getByAuthorAsync = async (userId: string) =>
    await axiosInstance
      .get<PostDTO[]>(`by-author/${userId}`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getCountByAuthorAsync = async (userId: string) =>
    await axiosInstance
      .get<number>(`by-author/${userId}/count`)
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  getLikesCountAsync = async (postId: number) =>
    await axiosInstance
      .get(`${postId}/likes-count`)
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
        throw new Error(e);
      });

  getLikedPostsAsync = async () =>
    await axiosInstance
      .get<PostDTO[]>(`likes`, this.getAuthHeaders())
      .then((res) => res.data)
      .catch((e) => {
        throw new Error(e);
      });

  createAsync = async (data: CreateEditPostDTO) =>
    await axiosInstance
      .post("", { data }, this.getAuthHeaders())
      .then((res) => res.data)
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

  updateAsync = async (postId: number, patchOperations: PatchOperation[]) =>
    await axiosInstance
      .patch(`${postId}`, { data: patchOperations }, this.getAuthHeaders())
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
