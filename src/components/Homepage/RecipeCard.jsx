import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Favorite from "./Favorite";

import approvePost from "../../../utils/Admin/approvePost";
import banPost from "../../../utils/Admin/banPost";
import blockUser from "../../../utils/Admin/blockUser";
import api from "../../../config/axiosConfig";

const RecipeCard = ({ recipe, fetchRecipeAgain }) => {
  const { title, cook_time: cookTime, difficulty, ingredients } = recipe;
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminPage = location.pathname === "/admin";
  const adminDivRef = useRef();

  const fetchUploaderProfile = async (userId) => {

    try{

      navigate(`/public-profile/${recipe.user_id}`);
      
      
    }catch(error){
      console.log(error);
    }
    
  }
  

  return (
    <div
      ref={adminDivRef}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div onClick={() => navigate(`/recipe/${recipe?.id}`)}>
        <div className="h-[180px] w-[178px] sm:h-[160px]  xl:w-[250px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={
              recipe.image_url ||
              "https://www.pexels.com/photo/person-cooking-on-black-pan-4144234/"
            }
            alt="Recipe"
            className="  w-[178px] xl:w-[250px] object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="p-3 flex flex-col flex-grow">
          <h2 className="text-base font-semibold text-gray-800 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 mb-2 truncate">
            {ingredients?.join(" ")}
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-auto overflow-hidden">
            {/* Uploader */}
            <div className="flex items-center">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  fetchUploaderProfile(recipe?.user_id);
                }}
                src={recipe?.user?.profile_picture}
                alt="Uploader"
                className="w-6 h-6 rounded-full object-cover mr-2"
              />
              <span className="text-sm font-medium text-gray-700">
                {recipe?.user?.name}
              </span>
            </div>

            {/* Like/Favorite */}
            {!isAdminPage && (
              <div onClick={(e) => e.stopPropagation()}>
                <Favorite recipeId={recipe?.id} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin Controls */}
      {isAdminPage && (
        <div className="flex justify-between px-3 py-2 bg-gray-100 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => approvePost(recipe?.id, adminDivRef?.current)}
              className="text-green-600 text-xl"
              title="Approve"
            >
              ✅
            </button>
            <button
              onClick={() => banPost(recipe?.id, adminDivRef?.current)}
              className="text-yellow-600 text-xl"
              title="Ban"
            >
              ✂️
            </button>
          </div>
          <button
            onClick={() =>
              blockUser(recipe?.user_id, adminDivRef?.current, fetchRecipeAgain)
            }
            className="bg-red-600 text-white px-3 py-1 text-sm rounded-md"
          >
            Block User
          </button>
        </div>
      )}
    </div>
  );
  };

export default RecipeCard;
