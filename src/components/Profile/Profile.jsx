import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../utils/AuthProvider";
import { FollowersContext } from '../../../utils/FollowersProvider';
import { FollowingContext } from '../../../utils/FollowingProvider';
import { FavoriteContext } from '../../../utils/FavoriteProvider';
import { useNavigate } from "react-router-dom";
import MyRecipeList from "./MyRecipeList";
import api from "../../../config/axiosConfig";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { followers } = useContext(FollowersContext);
  const { following } = useContext(FollowingContext);
  const { favorites } = useContext(FavoriteContext);
  const [collections, setCollections] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await api.get('/collection');
      setCollections(response.data);
    } catch (error) {
      setCollections(0);
    }
  };

  return (
    <section className="bg-blueGray-50">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden p-4 sm:p-6">
          <div className="flex flex-col items-center relative">
            {/* Profile Picture */}
            <img
              alt="Profile"
              src={user.profile_picture}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md "
            />

            {/* Name and Email */}
            <h2 className="text-xl sm:text-2xl mt-4 font-semibold text-gray-800">{user?.name || "Loading..."}</h2>
            <p className="text-gray-500 text-sm">{user?.email || "Loading..."}</p>

            {/* Bio */}
            {user.bio && (
              <p className="text-center text-sm text-gray-700 mt-4 px-4">{user.bio}</p>
            )}

            {/* Buttons */}
            <div className="mt-4 flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
              >
                Edit Profile
              </button>
              <button
                onClick={() => { localStorage.clear(); navigate('/login'); }}
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center">
              <div
                onClick={() => navigate('/followings')}
                className="cursor-pointer"
              >
                <p className="text-lg font-bold">{following?.length || 0}</p>
                <p className="text-xs text-gray-500">Following</p>
              </div>
              <div
                onClick={() => navigate('/followers')}
                className="cursor-pointer"
              >
                <p className="text-lg font-bold">{followers?.length || 0}</p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div
                onClick={() => navigate('/favorites')}
                className="cursor-pointer"
              >
                <p className="text-lg font-bold">{favorites?.length || 0}</p>
                <p className="text-xs text-gray-500">Favorites</p>
              </div>
              <div
                onClick={() => navigate('/collections')}
                className="cursor-pointer"
              >
                <p className="text-lg font-bold">{collections?.length || 0}</p>
                <p className="text-xs text-gray-500">Collections</p>
              </div>
            </div>
          </div>

          {/* Recipes */}
          <div className="mt-10 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">My Recipes</h3>
            <MyRecipeList />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
