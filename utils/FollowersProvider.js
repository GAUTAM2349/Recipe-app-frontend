import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axiosConfig";

export const FollowersContext = createContext();

export const FollowersProvider = ({ children }) => {
  const [followers, setfollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await api.get("/follow/following");
        setfollowers(response.data);
        console.log("\nfollowerProvider.js  followers are : ", followers);
      } catch (error) {
        console.log(error);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <FollowersContext.Provider value={{ followers }}>
      {children}
    </FollowersContext.Provider>
  );
};
