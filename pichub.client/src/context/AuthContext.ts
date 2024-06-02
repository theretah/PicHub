import { createContext } from "react";

export interface User {
  id: string;
  userName: string;
  password: string;
  fullName: string;
}
export interface RegisterData {
  email: string;
  fullName: string;
  userName: string;
  password: string;
}
export interface LoginData {
  userName: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  login: (loginData: LoginData, newToken: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
