import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Wishlist from "./Wishlist";
import { FollowingProvider } from "../../../utils/FollowingProvider";
import api from "../../../config/axiosConfig";
import FollowButton from "./FollowButton";
import RecipeReviewForm from "./RecipeReviewForm";
import RecipeReviewSection from "./RecipeReviewSection";
import AddToCollections from "../Collections/AddToCollections";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectCollectionsModal, setSelectCollectionsModal] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await api.get(`/recipe/${id}`);
        const data = await response?.data;
        setRecipe(data);
      } catch (err) {
        console.error("Failed to fetch recipe:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, []);  // removed id from here

  if (loading || !recipe) {
    return <div className="text-center py-20 text-lg text-gray-600">Loading...</div>
  }

  return (
    <>
    <div className="bg-gray-100 mt-[80px] dark:bg-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          {/* Recipe Image & Buttons */}
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={recipe?.image_url || "https://via.placeholder.com/600x400"}
                alt={recipe?.title}
              />
            </div>

            <div className="flex -mx-2 mb-4">
              <FollowingProvider>
                <FollowButton id={recipe?.user_id || 1} />
              </FollowingProvider>

              
              <Wishlist setSelectCollectionsModal={setSelectCollectionsModal} recipeId={id} />
            </div>
          </div>

          {/* DETAILS */}
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {recipe.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              category: {recipe.category}
            </p>

            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">cook time:</span>{" "}
                <span className="text-gray-600 dark:text-gray-300">
                  {recipe.cook_time} mins
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">difficulty:</span>{" "}
                <span className="text-gray-600 dark:text-gray-300">{recipe.difficulty}</span>
              </div>
            </div>

            {/* TAGS */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">tags:</span>
              <span className="inline text-white">
                {" " + recipe.dietary_tags?.join(", ")}
              </span>
            </div>

            {/* OPTIONS */}
            


            {/* INGREDIENTS */}
            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300">ingredients:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {recipe.ingredients?.map((ing, idx) => (
                  <button
                    key={idx}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white py-2 px-4 rounded-full font-bold mr-2 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <span className="font-bold text-gray-700 dark:text-gray-300">Instructions:</span>
              <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 whitespace-pre-line">
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
    {/* COLLECTIONS--- */}
            {selectCollectionsModal && <AddToCollections recipeId={id} setSelectCollectionsModal={setSelectCollectionsModal} />}
    <RecipeReviewSection recipeId={id}/>
    </>
  );
};

export default Recipe;

