import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import AuthContext, { LoginData, User } from "./AuthContext";
import axios from "axios";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: LoginData) => {
    axios
      .get(`/api/account/getbyusername?userName=${userData.userName}`)
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      });
  };

  const logout = () => {
    axios.post(`/api/account/logout`);
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (isAuthenticated)
      axios.get(`/api/account/getloggedinuser`).then((res) => {
        console.log(res);
        setUser(res.data);
        setIsAuthenticated(true);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
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
