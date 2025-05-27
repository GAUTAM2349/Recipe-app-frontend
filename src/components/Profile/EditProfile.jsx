import React, { useContext, useState } from "react";
import api from "../../../config/axiosConfig";
import { AuthContext } from "../../../utils/AuthProvider";

const EditProfile = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user.name || "",
    bio: user.bio || "",
    profilePicture: user.profile_picture || "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put("/user/profile", form);
      setMsg("Profile updated successfully!");
    } catch (err) {
      setMsg("Update failed: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mt-[90px] mx-auto bg-white p-6 rounded shadow"
    >
      <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
      {msg && <p className="mb-4 text-blue-600">{msg}</p>}

      <label className="block mb-2 font-medium">Name</label>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Bio</label>
      <textarea
        name="bio"
        rows={4}
        value={form.bio}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      <label className="block mb-2 font-medium">Profile Picture URL</label>
      <input
        name="profilePicture"
        value={form.profilePicture}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />

      {form.profilePicture && (
        <img
          src={form.profilePicture}
          alt="Preview"
          className="w-20 h-20 rounded-full mb-4 object-cover"
        />
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditProfile;
