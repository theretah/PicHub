import { useMutation } from "@tanstack/react-query";
import UserService from "../../services/UserService";

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData: FormData) =>
      await UserService.update(formData),
  });
};

export default useUpdateProfile;
