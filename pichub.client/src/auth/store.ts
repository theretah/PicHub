import { create } from "zustand";
import axios from "axios";

export interface User {
  id: string;
  userName: string;
  fullName: string;
  bio: string;
  gender: string;
  profileImageUrl: string;
}

export interface LoginData {
  userName: string;
  password: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  fetchUser: () => Promise<void>;
  login: (loginData: LoginData) => Promise<void>;
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
      .get(`/api/account/getLoggedInUser`, {
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
        console.log(error);
      });
  },

  login: async (loginData: LoginData) => {
    try {
      await axios
        .post(`/api/account/login`, loginData)
        .then((loginResponse) => {
          const token = loginResponse.data.token;
          localStorage.setItem("token", token);

          axios
            .get("/api/account/getLoggedInUser", {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then((userResponse) => {
              set({ isAuthenticated: true, user: userResponse.data });
            })
            .catch((error) => {
              console.log(error);
            });
        });
    } catch (error) {
      set({ isAuthenticated: false, user: null });
      console.log(error);
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ isAuthenticated: false, user: null });
  },
}));

export default useAuthStore;
