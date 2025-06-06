
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import RecipeCard from './RecipeCard';
import api from "../../../config/axiosConfig";
import { AllDataContext } from "../../../utils/AllDataContext";
import {
  FavoriteContext,
  FavoriteProvider,
} from "../../../utils/FavoriteProvider";

const categoryOptions = ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Middle Eastern", "American"];
const difficultyOptions = ["Easy", "Medium", "Hard", "Beginner", "Advanced", "Intermediate", "Expert"];
const dietaryOptions = ["Vegan", "Vegetarian", "Gluten-Free", "Dairy-Free", "Nut-Free", "Low-Carb", "High-Protein"];

const Homepage = () => {
  
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const {recipeFilter} = useContext(AllDataContext);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const category = searchParams.get("category") || "";
  const difficulty = searchParams.get("difficulty") || "";
  const dietary = searchParams.get("dietary") || "";

  const fetchRecipes = async () => {
    try {
      const res = await api.get("/recipe", {
        params: { page, category, difficulty, dietary, search : recipeFilter || "" }
      });
      setRecipes(res.data.recipes);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch recipes", err);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [searchParams, recipeFilter]);

  const updateParam = (key, value) => {   
    const params = new URLSearchParams(searchParams);
    value ? params.set(key, value) : params.delete(key); 
    params.set("page", "1"); // reset page on filter change
    setSearchParams(params);
  };

  const handlePageChange = (delta) => {
    const newPage = page + delta;
    if (newPage < 1 || newPage > totalPages) return;
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set("page", newPage);
      return newParams;
    });
  };

  return (
    <div className="py-6 mx-auto px-2 mt-[80px]">
      {/* Filters */}
      <div className="flex  flex-wrap gap-4 mb-6">
        <select value={category} onChange={e => updateParam("category", e.target.value)} className="border p-2 rounded bg-yellow-200">
          <option value="">All Categories</option>
          {categoryOptions.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>

        <select value={difficulty} onChange={e => updateParam("difficulty", e.target.value)} className="border p-2 rounded bg-yellow-200">
          <option value="">All Difficulty Levels</option>
          {difficultyOptions.map(diff => <option key={diff} value={diff}>{diff}</option>)}
        </select>

        <select value={dietary} onChange={e => updateParam("dietary", e.target.value)} className="border p-2 rounded bg-yellow-200">
          <option value="">All Dietary Tags</option>
          {dietaryOptions.map(tag => <option key={tag} value={tag}>{tag}</option>)}
        </select>
      </div>

      {/* Recipe Cards */}
      <FavoriteProvider>
      <div className="flex flex-wrap gap-4 mx-auto">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="text-gray-600">No recipes match the selected filters.</p>
        )}
      </div>
      </FavoriteProvider>

      {/* Pagination Controls */}
      <div className="flex justify-center  gap-4 mt-6 cursor-pointer">
        <button onClick={() => handlePageChange(-1)} disabled={page <= 1} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Previous</button>
        <span className="px-4 py-2">Page {page} of {totalPages}</span>
        <button onClick={() => handlePageChange(1)} disabled={page >= totalPages} className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50">Next</button>
      </div>
    </div>
  );
};

export default Homepage;
