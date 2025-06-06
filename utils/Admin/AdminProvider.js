import { createContext, useEffect, useState } from "react";
import api from "../../config/axiosConfig";
import { Navigate } from "react-router-dom";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminAuthentiaction = async () => {
      try {
        const response = await api.get("/admin/auth");
        setUser(response.data.user); 
        if (response.data.user.role === "admin") setIsAdmin(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    adminAuthentiaction(); 
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return isAdmin ? <AdminContext.Provider value={ {user} } >{children}</AdminContext.Provider> : <Navigate to="/" />;
};
