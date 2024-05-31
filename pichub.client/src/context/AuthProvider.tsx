import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext, { LoginData, User } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("user")
  );
  const navigate = useNavigate();

  const login = (loginData: LoginData) => {
    axios.post(`/api/account/login`, loginData);
    axios
      .get(`/api/account/getbyusername?userName=${loginData.userName}`)
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
        localStorage.setItem("user", res.data);
      });
    setToken(token);
  };

  const logout = () => {
    if (user) {
      axios.post(`/api/account/logout`);
      setUser(null);
      setIsAuthenticated(false);

      setToken(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user: ", storedUser);
    if (storedUser)
      axios.get(`/api/account/getloggedinuser`).then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);

        setToken(storedUser);
      });
    else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const authContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
