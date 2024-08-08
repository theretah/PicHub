import { useMutation } from "@tanstack/react-query";
import userService from "../../services/userService";

const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await userService.updateAsync(formData);
    },
  });
};

export default useUpdateProfile;
