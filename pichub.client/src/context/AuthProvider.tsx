import React, { ReactNode, useContext, useEffect, useState } from "react";
import AuthContext, { LoginData, User } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isatty } from "tty";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
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

  useEffect(() => {
    axios
      .get(`/api/account/getloggedinuser`)
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          setUser(res.data);
          setIsAuthenticated(true);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/login");
      });
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
