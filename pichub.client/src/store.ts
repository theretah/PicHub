import { create } from "zustand";
import { LoginData, User } from "./context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (loginData: LoginData, newToken: string) => void;
  logout: () => void;
}
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [token, setToken] = useState<string | null>(
  localStorage.getItem("token")
);
const [user, setUser] = useState<User | null>(null);
const navigate = useNavigate();

const login = async (loginData: LoginData) => {
  console.log("Log in");

  await axios.post(`/api/account/login`, loginData).then((res) => {
    const newToken = res.data.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  });

  await axios
    .get(`/api/account/getbyusername?userName=${loginData.userName}`)
    .then((res) => {
      setUser(res.data);
      setIsAuthenticated(true);
      localStorage.setItem("token", JSON.stringify(res.data));
    });
};

const logout = () => {
  console.log("Log out");
  if (user) {
    axios.post(`/api/account/logout`);

    setIsAuthenticated(false);
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");

    navigate("/login");
  }
};

const useAuthStore = create<AuthStore>(() => ({
  isAuthenticated,
  login,
  logout,
  token,
  user,
}));

export default useAuthStore;
