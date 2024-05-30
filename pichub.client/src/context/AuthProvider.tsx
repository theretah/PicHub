import React, { ReactNode, useCallback, useEffect, useState } from "react";
import AuthContext, { UserData } from "./AuthContext";

interface IAuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState({});

  const login = (userData: UserData) => {
    setUserData(userData);
    setIsAuthenticated(true);
  };

  // Dependencies to be reconsidered
  const logout = useCallback(() => {
    setUserData({});
    setIsAuthenticated(false);
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
    <AuthContext.Provider value={{ isAuthenticated, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
