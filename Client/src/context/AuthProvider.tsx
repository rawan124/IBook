import { useState } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import {jwtDecode} from "jwt-decode";
import {message } from "antd";
interface AuthProviderProps {
  children: ReactNode;
}
  
type DecodedToken = {
  sub: string; 
  email: string;
  //nickname: string;
  username: string;
  role: string;
};

export function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = jwtDecode<DecodedToken>(token);

    return {
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      //nickname: decoded.nickname,
      role: decoded.role
    };
  });

  const isAuthenticated = Boolean(user);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const decoded = jwtDecode<DecodedToken>(accessToken);

    setUser({
      id: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      //nickname: decoded.nickname,
      role: decoded.role
    });
     message.success("Logged in successfully!");
  };

  const logout = () => {
    localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    setUser(null);   
     message.success("Logged out successfully!");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}
