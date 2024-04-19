import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AuthContext from "./AuthContext";

interface IAuthProviderProps {
  children: ReactNode;
}

export interface ILoginProps {
  userData: object;
  token: object;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState({});

  const login = ({ userData, token }: ILoginProps) => {
    setToken(token);
    setUserData(userData);
    setIsAuthenticated(true);
    localStorage.setItem("user", JSON.stringify({ token }));
  };

  // Dependencies to be reconsidered
  const logout = useCallback(() => {
    setToken({});
    setUserData({});
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    const localStorageUser = localStorage.getItem("user");
    const localStorageData = localStorageUser
      ? JSON.parse(localStorageUser)
      : null;

    if (localStorageData) {
      fetch(`/api/account/getloggedinuser`, {
        headers: {
          Authorization: `Bearer ${localStorageData}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsAuthenticated(true);
          setUserData(data);
        });
    } else {
      setIsAuthenticated(false);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userData, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
