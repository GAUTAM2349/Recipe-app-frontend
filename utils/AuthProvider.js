import { createContext, useState, useEffect } from "react";

import api from "../config/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loggedinUser, setLoggedinUser] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user/login-status");  // authProvider, PrivateRoute, Profile
        console.log("\n\n auth response  is ", response)
        setIsAuthenticated(true);
        const user = response.data.user;
        setUser(user);
        setLoggedinUser(user.id);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, loggedinUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
