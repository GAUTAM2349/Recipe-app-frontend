import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axiosConfig";

export const FollowersContext = createContext();

export const FollowersProvider = ({ children }) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/follow/followers");
        setFollowers(response.data);
        console.log("\n✅ followerProvider.js → followers fetched:", response.data);
      } catch (err) {
        console.error("❌ Error fetching followers:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  return (
    <FollowersContext.Provider value={{ followers, loading, error }}>
      {children}
    </FollowersContext.Provider>
  );
};
