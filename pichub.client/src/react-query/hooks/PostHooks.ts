import { useMutation, useQuery } from "@tanstack/react-query";
import PostService from "../services/PostService";
import { PostDTO } from "../../entities/PostDTO";

export const useDeletePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.deleteAsync(postId),
  });
};

export const useDisLikePost = () => {
  return useMutation({
    mutationFn: async (postId: number) =>
      await PostService.disLikeAsync(postId),
  });
};

export const useIsLiked = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isLiked", postId],
    queryFn: async () => await PostService.getIsLikedAsync(postId),
    enabled: enabled,
  });
};

export const useIsSaved = (postId: number, enabled: boolean) => {
  return useQuery<boolean, Error>({
    queryKey: ["isSaved", postId],
    queryFn: async () => await PostService.getIsSavedAsync(postId),
    enabled: enabled,
  });
};
export const useLikePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.likeAsync(postId),
  });
};

export const useLikesCount = (postId: number) => {
  return useQuery({
    queryKey: ["likesCount", postId],
    queryFn: async () => await PostService.getLikesCountAsync(postId),
  });
};

export const usePostById = (id: number) => {
  return useQuery<PostDTO, Error>({
    queryKey: ["post", id],
    queryFn: async () => await PostService.getAsync(id),
  });
};

export const usePosts = () => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["posts"],
    queryFn: async () => await PostService.getAllAsync(),
  });
};

export const usePostsByAuthorId = (authorId: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["postsByAuthor", authorId],
    queryFn: async () => await PostService.getByAuthorAsync(authorId),
  });
};

export const useSavePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.saveAsync(postId),
  });
};

export const useSavedPosts = (userId: string) => {
  return useQuery<PostDTO[], Error>({
    queryKey: ["savedPosts", userId],
    queryFn: async () => await PostService.getSavedPostsAsync(),
  });
};

export const useUnSavePost = () => {
  return useMutation({
    mutationFn: async (postId: number) => await PostService.unSaveAsync(postId),
  });
};

export const usePostsCountByAuthor = (userId: string) => {
  return useQuery<number, Error>({
    queryKey: ["savedPosts", userId],
    queryFn: async () => await PostService.getCountByAuthorAsync(userId),
  });
};
