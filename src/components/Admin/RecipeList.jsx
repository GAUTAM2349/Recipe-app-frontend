import { useEffect, useState } from "react";
import RecipeCard from "../Homepage/RecipeCard";
import api from "../../../config/axiosConfig";



const RecipeList = () => {

    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchRecipes = async () => {
  try {
    const res = await api.get("/admin/unapproved-recipes");
    const newRecipes = res.data;

    if (recipes.length === 0) {
      setRecipes(newRecipes);
    } else {
      // Keeping only recipes that exist in both previous and new data - for better ux
      const intersection = recipes.filter(prev =>
        newRecipes.some(newR => newR.id === prev.id)
      );
      setRecipes(intersection);
    }
  } catch (err) {
    console.error("Failed to fetch recipes", err);
  }
};


  useEffect(() => {
      fetchRecipes();
    }, []);

    useEffect( ()=>{
        setIsLoading(false);
        console.log("\n\nrecipes in admin ",recipes);
    }, [recipes]);
    

    if(isLoading){

      return <div>Loading...</div>
      
    }
    
  return (
    <>
      <div className="flex mt-6  flex-wrap gap-4 mx-auto">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} fetchRecipeAgain={fetchRecipes} />
          ))
        ) : (
          <p className="text-gray-600">
            No recipes match the selected filters.
          </p>
        )}
      </div>
    </>
  );
};

export default RecipeList;
