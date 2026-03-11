import { createContext } from "react";

export interface AuthContextType {
    user: {
    id: string;
    email: string;
    username: string;
    //nickname: string;
    role: string;
  } | null;
  isAuthenticated: boolean;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
