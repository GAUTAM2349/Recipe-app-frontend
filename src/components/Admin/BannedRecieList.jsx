import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";

const BannedRecipeList = () => {
  const [bannedRecipes, setBannedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get("/admin/banned-recipes")
      .then((res) => setBannedRecipes(res.data))
      .catch((err) => console.error("Error fetching banned recipes:", err))
      .finally(() => setLoading(false));
  }, [refresh]);

  const handleApprove = async (id) => {
    try {
      await api.put(`/admin/unban-recipe/${id}`);
      setRefresh(refresh + 1); // trigger re-fetch
    } catch (err) {
      console.error("Failed to approve recipe:", err);
    }
  };

  if (loading) return <p>Loading banned recipes...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Banned Recipes</h2>
      {bannedRecipes.length === 0 ? (
        <p>No banned recipes.</p>
      ) : (
        <ul className="space-y-2">
          {bannedRecipes.map((recipe) => (
            <li key={recipe.id} className="p-4 border rounded bg-red-50 flex justify-between items-center">
              <div>
                <strong>{recipe.title}</strong> by {recipe.authorName}
              </div>
              <button
                onClick={() => handleApprove(recipe.id)}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Approve
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BannedRecipeList;
