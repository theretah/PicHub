import { useMutation, useQuery } from "@tanstack/react-query";
import PostService from "../services/PostService";
import { PostDTO } from "../../entities/PostDTO";
import { CreateEditPostDTO } from "../../entities/CreateEditPostDTO";
import { AxiosError } from "axios";

export const usePosts = () => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["posts"],
    queryFn: async () => await PostService.getAllAsync(),
  });
};

export const usePostById = (id: number) => {
  return useQuery<PostDTO, Error>({
    queryKey: ["post", id],
    queryFn: async () => await PostService.getAsync(id),
  });
};

export const usePostsByAuthorId = (authorId: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["postsByAuthor", authorId],
    queryFn: async () => await PostService.getAllByAuthorAsync(authorId),
  });
};

export const usePostsCountByAuthor = (userId: string, enabled: boolean) => {
  return useQuery<number, Error>({
    queryKey: ["postsCount"],
    queryFn: async () => await PostService.getCountByAuthorAsync(userId),
    enabled: enabled,
  });
};

export const useLikesCount = (postId: number) => {
  return useQuery({
    queryKey: ["likesCount", postId],
    queryFn: async () => await PostService.getLikesCountAsync(postId),
  });
};

export const useIsSaved = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isSaved", postId],
    queryFn: async () => await PostService.getIsSavedAsync(postId),
    enabled: enabled,
  });
};

export const useIsLiked = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: async () => await PostService.getIsLikedAsync(postId),
    enabled: enabled,
  });
};

export const useSavedPosts = () => {
  return useQuery<PostDTO[], AxiosError>({
    queryKey: ["savedPosts"],
    queryFn: async () => await PostService.getSavedPostsAsync(),
  });
};

export const useLikedPosts = () => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["likedPosts"],
    queryFn: async () => await PostService.getLikedPostsAsync(),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: async (data: CreateEditPostDTO) => {
      const formData = new FormData();
      formData.append("ImageFile", data.imageFile);
      formData.append("Caption", data.caption);
      formData.append("CommentsAllowed", data.commentsAllowed.toString());

      return await PostService.createAsync(formData);
    },
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.likeAsync(postId),
  });
};

export const useSavePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.saveAsync(postId),
  });
};

export const updatePost = (postId: number, data: CreateEditPostDTO) => {
  return useMutation({
    mutationFn: async () => await PostService.updateAsync(postId, data),
  });
};

export const useDisLikePost = () => {
  return useMutation({
    mutationFn: async (postId: number) =>
      await PostService.disLikeAsync(postId),
  });
};

export const useUnSavePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.unSaveAsync(postId),
  });
};

export const useDeletePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.deleteAsync(postId),
  });
};
