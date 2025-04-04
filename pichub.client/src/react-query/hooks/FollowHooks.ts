import { useMutation, useQuery } from "@tanstack/react-query";
import FollowService from "../../../services/FollowService";

export const useIsFollowed = (followingId: string, enabled: boolean) =>
  useQuery<boolean, Error>({
    queryKey: ["isFollowed", followingId],
    queryFn: async () => await FollowService.isFollowedAsync(followingId),
    enabled: enabled,
  });

export const useFollowingsCount = (userId: string, enabled: boolean) =>
  useQuery<number, Error>({
    queryKey: ["followingsCount", userId],
    queryFn: async () => await FollowService.followingsCountAsync(userId),
    enabled: enabled,
  });

export const useFollowersCount = (userId: string, enabled: boolean) =>
  useQuery<number, Error>({
    queryKey: ["followersCount", userId],
    queryFn: async () => await FollowService.followersCountAsync(userId),
    enabled: enabled,
  });

export const useFollow = () =>
  useMutation({
    mutationFn: async (followingId: string) =>
      await FollowService.followAsync(followingId),
  });

export const useUnFollow = () =>
  useMutation({
    mutationFn: async (followingId: string) =>
      await FollowService.unFollowAsync(followingId),
  });
