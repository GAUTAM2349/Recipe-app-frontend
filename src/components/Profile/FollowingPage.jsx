import React, { useContext } from "react";
import { FollowingContext } from "../../../utils/FollowingProvider";

const FollowingPage = () => {
  const { following, loading, error } = useContext(FollowingContext);

  return (
    <div className="p-4 mt-[80px] max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Following</h2>

      {loading ? (
        <p className="text-gray-500">Loading following users...</p>
      ) : error ? (
        <p className="text-red-500">Error loading data. Please try again.</p>
      ) : following.length === 0 ? (
        <p className="text-gray-500">You're not following anyone yet.</p>
      ) : (
        <ul className="space-y-4">
          {following.map((user) => (
            <li
              key={user.id}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={user.profile_picture}
                alt={"👤"}
                className="w-12 h-12 rounded-full object-cover mr-4 bg-amber-200 flex items-center justify-center"
              />
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
                {user.bio && (
                  <p className="text-sm text-gray-400">{user.bio}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowingPage;
