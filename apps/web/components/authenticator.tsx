import React, { ReactNode, useState } from "react";
import { Login } from "../pages/login";

export const AuthContext = React.createContext({ isAuthenticated: false, setIsAuthenticated: (value: boolean) => { } });
export function Authenticator({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (<AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}> {isAuthenticated ? children : <Login />} </AuthContext.Provider>);
}