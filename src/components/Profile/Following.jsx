import React from "react";

const Following = ({following}) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Following</h2>

      {following.length === 0 ? (
        <p className="text-gray-500">You are not following anyone yet.</p>
      ) : (
        <ul className="space-y-4">
          {following.map((person) => (
            <li
              key={person.id}
              className="flex items-center p-4 bg-white rounded-lg shadow"
            >
              <img
                src={
                  person.profile_picture ||
                  "https://via.placeholder.com/48?text=👤"
                }
                alt={person.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <p className="font-semibold text-lg">{person.name}</p>
                <p className="text-sm text-gray-500">{person.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Following;
