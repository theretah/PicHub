import { createContext } from "react";

export interface UserData {
  userName: string;
  password: string;
}
interface AuthContextType {
  isAuthenticated: boolean;
  userData: UserData;
  login: (userName: string) => void;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
