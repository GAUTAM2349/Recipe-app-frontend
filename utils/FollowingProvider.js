import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/axiosConfig";


export const FollowingContext = createContext({
  following: [],
  loading: true,
  error: null,
});


export const FollowingProvider = ({ children }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const response = await api.get("/follow/following");
        setFollowing(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  // Log updated state for debugging
  useEffect(() => {
    console.log("📦 followingProvider - Updated following:", following);
  }, [following]);

  return (
    <FollowingContext.Provider value={{ following, loading, error, setFollowing }}>
      {children}
    </FollowingContext.Provider>
  );
};
