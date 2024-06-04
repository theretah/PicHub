import { create } from "zustand";
import { LoginData, User } from "./context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("user"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  login: async (loginData: LoginData) => {
    try {
      await axios
        .post(`/api/account/login`, loginData)
        .then((loginResponse) => {
          const newToken = loginResponse.data.token;
          localStorage.setItem("token", newToken);

          axios
            .get(`/api/account/getbyusername?userName=${loginData.userName}`)
            .then((userResponse) => {
              localStorage.setItem("user", JSON.stringify(userResponse.data));
              console.log(userResponse.data);
              set({
                isAuthenticated: true,
                token: newToken,
                user: userResponse.data,
              });
            });
        });
    } catch (error) {
      console.log(error);
    }
  },

  logout: async () => {
    axios.post(`/api/account/logout`);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null, token: null });
  },
}));

export default useAuthStore;
