import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../config/axiosConfig";

const PublicProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingRecipes, setLoadingRecipes] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/user/public-profile/${id}`); 
        setProfile(res.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    const fetchRecipes = async () => {
      try {
        const res = await api.get(`/recipe/public/user-recipes/${id}`);
        setRecipes(res.data); // No need to extract from .data.recipes
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchProfile();
    fetchRecipes();
  }, [id]);

  return (
    <div className="min-h-screen bg-yellow-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
        {loadingProfile ? (
          <p>Loading profile...</p>
        ) : profile ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{profile.name}</h1>
            <div className="text-gray-600 mb-4">
              <p>Followers: {profile.followersCount}</p>
              <p>Following: {profile.followingCount}</p>
            </div>

            <hr className="my-4" />

            <h2 className="text-xl font-semibold text-gray-700 mb-2">User's Recipes</h2>

            {loadingRecipes ? (
              <p>Loading recipes...</p>
            ) : recipes.length === 0 ? (
              <p>No recipes found for this user.</p>
            ) : (
             <ul className="space-y-4">
  {recipes.map((recipe) => (
    <li
      key={recipe.id}
      onClick={()=>navigate(`/recipe/${recipe.id}`)}
      className="p-4 bg-gray-50 rounded shadow-sm hover:bg-gray-100 flex gap-4 items-start"
    >
      {recipe.image_url && (
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-24 h-24 object-cover rounded-md border"
        />
      )}
      <div>
        <h3 className="text-lg font-medium text-gray-800">{recipe.title}</h3>
        <p className="text-sm text-gray-600">{recipe.description}</p>
      </div>
    </li>
  ))}
</ul>

            )}
          </>
        ) : (
          <p>User not found.</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
