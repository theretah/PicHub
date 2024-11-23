import { useMutation, useQuery } from "@tanstack/react-query";
import { UserDTO } from "../../entities/UserDTO";
import UserService from "../../../services/UserService";
import { AxiosError } from "axios";

export const useUsers = () =>
  useQuery<UserDTO[], AxiosError>({
    queryKey: ["allUsers"],
    queryFn: () => UserService.getAllUsers(),
  });

export const useUserByUserName = (userName: string, enabled: boolean) =>
  useQuery<UserDTO, Error>({
    queryKey: ["userByUserName", userName],
    queryFn: async () => await UserService.getUserByUserNameAsync(userName),
    enabled,
  });

export const useUserById = (userId: string, enabled: boolean) =>
  useQuery<UserDTO, AxiosError>({
    queryKey: ["user", userId],
    queryFn: async () => await UserService.getUserByIdAsync(userId),
    enabled: enabled,
  });

export const useSearch = (searchQuery: string | null, enabled: boolean) =>
  useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => await UserService.search(searchQuery),
    enabled,
  });

export const useEditProfile = () =>
  useMutation({
    mutationFn: async (formData: FormData) =>
      await UserService.editProfileAsync(formData),
  });
