import React, { useContext } from "react";
import { FollowersContext } from "../../../utils/FollowersProvider";

const FollowersPage = () => {
  const { followers, loading, error } = useContext(FollowersContext);

  return (
    <div className="p-4 mt-[80px] max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>

      {loading ? (
        <p className="text-gray-500">Loading followers...</p>
      ) : error ? (
        <p className="text-red-500">Error loading followers. Please try again.</p>
      ) : followers.length === 0 ? (
        <p className="text-gray-500">You have no followers yet.</p>
      ) : (
        <ul className="space-y-4">
          {followers.map((follower) => (
            <li
              key={follower.id}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={
                  follower.profile_picture 
                  
                }
                alt={"👤"}
                className="w-12 h-12 rounded-full object-cover mr-4 bg-amber-200 flex items-center justify-center"
              />
              <div>
                <p className="font-semibold text-lg">{follower.name}</p>
                <p className="text-sm text-gray-500">{follower.email}</p>
                {follower.bio && (
                  <p className="text-sm text-gray-400">{follower.bio}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowersPage;
