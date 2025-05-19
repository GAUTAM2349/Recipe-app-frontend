import React from "react";

const Followers = ({ followers }) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Followers</h2>

      {followers.length === 0 ? (
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
                  follower.profile_picture ||
                  "https://via.placeholder.com/48?text=👤"
                }
                alt={follower.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
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

export default Followers;
