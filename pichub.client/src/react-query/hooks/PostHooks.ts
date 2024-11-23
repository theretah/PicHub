import { useMutation, useQuery } from "@tanstack/react-query";
import PostService from "../../../services/PostService";
import { PostDTO } from "../../entities/PostDTO";
import { CreateEditPostDTO } from "../../entities/CreateEditPostDTO";
import { AxiosError } from "axios";

export const usePosts = () =>
  useQuery<PostDTO[] | null, AxiosError>({
    queryKey: ["allPosts"],
    queryFn: async () => await PostService.getAllAsync(),
  });

export const usePostById = (id: number, enabled: boolean) =>
  useQuery<PostDTO | null, Error>({
    queryKey: ["post", id],
    queryFn: async () => await PostService.getAsync(id),
    enabled,
  });

export const usePostsByAuthorId = (authorId: string, enabled: boolean) =>
  useQuery<PostDTO[] | null, Error>({
    queryKey: ["postsByAuthor", authorId],
    queryFn: async () => await PostService.getAllByAuthorAsync(authorId),
    enabled,
  });

export const usePostsCountByAuthor = (authorId: string, enabled: boolean) =>
  useQuery<number, AxiosError>({
    queryKey: ["postsCount", authorId],
    queryFn: async () => {
      if (!!authorId) throw new Error("Author id is required.");
      else {
        console.log(authorId);
        return await PostService.getCountByAuthorAsync(authorId);
      }
    },
    enabled: enabled && !!authorId,
  });

export const useLikesCount = (postId: number, enabled: boolean) =>
  useQuery<number | undefined>({
    queryKey: ["likesCount", postId],
    queryFn: async () => await PostService.getLikesCountAsync(postId),
    enabled,
  });

export const useIsSaved = (postId: number, enabled: boolean) =>
  useQuery<boolean, Error>({
    queryKey: ["isSaved", postId],
    queryFn: async () => await PostService.getIsSavedAsync(postId),
    enabled: enabled,
  });

export const useIsLiked = (postId: number, enabled: boolean) =>
  useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: async () => await PostService.getIsLikedAsync(postId),
    enabled: enabled,
  });

export const useSavedPosts = () =>
  useQuery<PostDTO[], AxiosError>({
    queryKey: ["savedPosts"],
    queryFn: async () => await PostService.getSavedPostsAsync(),
  });

export const useLikedPosts = () =>
  useQuery<PostDTO[], Error>({
    queryKey: ["likedPosts"],
    queryFn: async () => await PostService.getLikedPostsAsync(),
  });

export const useCreatePost = () =>
  useMutation({
    mutationFn: async (data: CreateEditPostDTO) => {
      const formData = new FormData();
      formData.append("ImageFile", data.imageFile);
      formData.append("Caption", data.caption);
      formData.append("CommentsAllowed", data.commentsAllowed.toString());

      return await PostService.createAsync(formData);
    },
  });

export const useLikePost = () =>
  useMutation({
    mutationFn: async (postId: number) => await PostService.likeAsync(postId),
  });

export const useSavePost = () =>
  useMutation({
    mutationFn: async (postId: number) => await PostService.saveAsync(postId),
  });

export const updatePost = (postId: number, data: CreateEditPostDTO) =>
  useMutation({
    mutationFn: async () => await PostService.updateAsync(postId, data),
  });

export const useDisLikePost = () =>
  useMutation({
    mutationFn: async (postId: number) =>
      await PostService.disLikeAsync(postId),
  });

export const useUnSavePost = () =>
  useMutation({
    mutationFn: async (postId: number) => await PostService.unSaveAsync(postId),
  });

export const useDeletePost = () =>
  useMutation({
    mutationFn: async (postId: number) => await PostService.deleteAsync(postId),
  });
