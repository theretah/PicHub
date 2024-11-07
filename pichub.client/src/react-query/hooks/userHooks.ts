import { useMutation, useQuery } from "@tanstack/react-query";
import { UserDTO } from "../../entities/UserDTO";
import UserService from "../services/UserService";
import { AxiosError } from "axios";

export const useUsers = () => {
  return useQuery<UserDTO[], AxiosError>({
    queryKey: ["users"],
    queryFn: () => UserService.getAllUsers(),
  });
};

export const useUserByUserName = (userName: string) => {
  return useQuery<UserDTO, Error>({
    queryKey: ["userByUserName", userName],
    queryFn: async () => await UserService.getUserByUserNameAsync(userName),
  });
};

export const useUserById = (userId: string) => {
  return useQuery<UserDTO, AxiosError>({
    queryKey: ["user", userId],
    queryFn: async () => await UserService.getUserByIdAsync(userId),
  });
};

export const useSearch = (searchQuery: string | null) => {
  return useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => await UserService.search(searchQuery),
  });
};

export const useEditProfile = () => {
  return useMutation({
    mutationFn: async (formData: FormData) =>
      await UserService.editProfileAsync(formData),
  });
};
