import { create } from "zustand";
import axios from "axios";
import { User } from "../entities/User";
import { LoginData } from "../entities/LoginData";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  fetchUser: () => Promise<void>;
  login: (loginData: LoginData) => Promise<string>;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user") || "null"),

  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return;
    }

    await axios
      .get(`/api/auth/getLoggedInUser`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          set({ user: res.data, isAuthenticated: true });
          localStorage.setItem("user", JSON.stringify(res.data));
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          set({ isAuthenticated: false, user: null });
        }
      })
      .catch((error) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        set({ isAuthenticated: false, user: null });
        throw new Error(error);
      });
  },

  login: async (loginData: LoginData) => {
    try {
      const loginResponse = await axios.post(`/api/auth/login`, loginData);
      const token = loginResponse.data.token;
      localStorage.setItem("token", token);

      const userResponse = await axios.get("/api/auth/getLoggedInUser", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ isAuthenticated: true, user: userResponse.data });
      return "Login successful.";
    } catch (e: any) {
      set({ isAuthenticated: false, user: null });
      return e.response.data;
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
