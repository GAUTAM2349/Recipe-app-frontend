
import React, { useContext } from "react";
import { FavoriteContext } from "../../../utils/FavoriteProvider";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  if (!favorites || favorites.length === 0) {
    return (
      <p className="text-center mt-8 text-gray-500">
        No favorite recipes found.
      </p>
    );
  }

  return (
    <div className="mt-[85px] px-4 py-6  min-h-screen">
      <div className="flex flex-wrap justify-center gap-6">
        {favorites.map((recipe) => (
          <div
            onClick={ ()=> navigate(`/recipe/${recipe.id}`)}
            key={recipe.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden 
              w-[80vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] xl:w-[18vw]  flex flex-col"
          >
            <img
              src={recipe.image_url}
              alt={recipe.title}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-3 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-1 line-clamp-1">
                {recipe.title}
              </h2>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Category:</strong> {recipe.category}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Difficulty:</strong> {recipe.difficulty}
              </p>
              <p className="text-xs text-gray-600 mb-1">
                <strong>Cook Time:</strong> {recipe.cook_time} min
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
