import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Favorite from "./Favorite";
import { FavoriteContext, FavoriteProvider } from "../../../utils/FavoriteProvider";

const RecipeCard = ({ recipe }) => {
  const { title, cook_time: cookTime, difficulty, ingredients } = recipe;
  const navigate = useNavigate();
  console.log("recipeCard.jsx",title, cookTime, difficulty, ingredients)
  console.log("recipeCard.jsx",recipe)

  return (
    <div
      onClick={() => navigate(`/recipe/${recipe.id}`)}
      className="flex flex-col shadow-2xl cursor-pointer justify-center items-center bg-yellow-100 min-w-[400px] w-[90%]  md:w-[45%] lg:w-[32%] xl:w-[24%] sm:w-[90%] rounded-lg"
    >
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[100%] h-[98%]">
        <img
          src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606"
          alt="Mountain"
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-700 leading-tight mb-4">
            {ingredients?.join(" ")}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="text-gray-800 font-semibold">
                {recipe.user.name}
              </span>
            </div>
            <div>
              <FavoriteProvider>
              <Favorite recipeId={recipe.id}/>
              </FavoriteProvider>
              <span className="text-gray-600">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
