import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
 // adjust the path to your API utility

const AllUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateComponent, setUpdateComponent] = useState(1);

  useEffect(() => {
    api.get("/admin/all-users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.error("Error fetching all users", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [updateComponent]);

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
  user.role === 'admin' ? null : (
    <li
      key={user.id}
      className="p-2 border rounded flex bg-white justify-between items-center"
    >
      <div>
        <strong>{user.name}</strong>
      </div>
      <div>{user.email}</div>

      <button
        onClick={() => {
          const endpoint = user.isBanned
            ? `admin/unblock-user/${user.id}`
            : `admin/block-user/${user.id}`;
          api.put(endpoint).then(() => {
            setUpdateComponent(updateComponent + 1);
          });
        }}
        className={`px-4 py-1 rounded text-white transition ${
          user.isBanned
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {user.isBanned ? "Unblock" : "Block"}
      </button>
    </li>
  )
))}


      </ul>
    </div>
  );
};

export default AllUsersList;
