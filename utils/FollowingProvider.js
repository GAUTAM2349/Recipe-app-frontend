import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axiosConfig";

export const FollowingContext = createContext();

export const FollowingProvider = ({ children }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await api.get("/follow/following");
        setFollowing(response.data);
        console.log("followingProvider.js  "+following)
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowing();
  }, []);

  return (
    <FollowingContext.Provider value={{ following }}>
      {children}
    </FollowingContext.Provider>
  );
};
