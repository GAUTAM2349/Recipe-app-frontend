import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";

const BlockedUserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const response = await api.get("/admin/blocked-users");
        setUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch blocked users:", err);
      }
    };

    fetchBlockedUsers();
  }, []);

  const unblockUser = async (userId) => {
    try {
      await api.put(`/admin/unblock-user/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (err) {
      console.error("Failed to unblock user:", err);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Blocked Users</h2>
      {users.length === 0 ? (
        <p>No blocked users.</p>
      ) : (
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="flex items-center justify-between p-4 bg-gray-100 rounded shadow"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.profile_picture || "https://via.placeholder.com/50"}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  {user.bio && (
                    <p className="text-xs italic text-gray-500 truncate max-w-xs">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => unblockUser(user.id)}
                className="bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlockedUserList;
