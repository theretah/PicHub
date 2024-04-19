import { createContext } from "react";
import { ILoginProps } from "./AuthProvider";

interface IAuthContext {
  isAuthenticated: boolean;
  userData: object;
  token: object;
  login: ({ userData, token }: ILoginProps) => void;
  logout: () => void;
}
const AuthContext = createContext<IAuthContext | undefined>(undefined);

export default AuthContext;
