
import { useContext } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import api from "../../../config/axiosConfig";
import { FollowingContext } from "../../../utils/FollowingProvider";

const FollowButton = ({ id }) => {
  const navigate = useNavigate();
  const { user, isLoading:userLoading } = useContext(AuthContext);
  const { following, setFollowing, loading } = useContext(FollowingContext);

  const isSelf = user?.id === id;

  
  if (loading) {
    console.log("returning early");
    return (
      <button
        className="w-full bg-gray-300 text-white py-2 px-4 rounded-full font-bold cursor-not-allowed opacity-70"
        disabled
      >
        Loading...
      </button>
    );
  }

  const isFollowing = following?.some((user) => user?.id === id);

console.log("\n\nloading is : ",loading, "is slef is ",isSelf, "\n user id is ",user?.id,"\n and want to follow ",id);


  const followUser = async () => {
  if (!user) return navigate("/login");

  try {
    const { data } = await api.post(`/follow/${id}`);
    
    setFollowing((prev) => [...prev, data?.followedUser]);
  } catch (error) {
    console.error("Error following user:", error);
  }
};

const unfollowUser = async () => {
  if (!user) return navigate("/login");

  try {
    await api.delete(`/follow/${id}`);
    setFollowing((prev) => prev?.filter((u) => u?.id !== id));
  } catch (error) {
    console.error("Error unfollowing user:", error);
  }
};

  if (isSelf) {
    return (
      <button className="w-full bg-gray-400 text-white py-2 px-4 rounded-full font-bold cursor-default">
        You
      </button>
    );
  }

  return (
    <div className="w-1/2 px-2">
      {!isFollowing ? (
        <button
          onClick={followUser}
          className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
        >
          Follow
        </button>
      ) : (
        <button
          onClick={unfollowUser}
          className="w-full bg-white text-gray-800 border border-gray-400 py-2 px-4 rounded-full font-bold hover:bg-gray-100"
        >
          Following
        </button>
      )}
    </div>
  );
};

export default FollowButton;
