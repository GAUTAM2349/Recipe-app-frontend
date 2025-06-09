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
    <div ref={adminDivRef}
      className="flex relative flex-col shadow-2xl ml-5 cursor-pointer justify-center items-center bg-yellow-100  w-[80vw] 
       md:max-w-[45vw] lg:max-w-[33vw] xl:max-w-[22vw] sm:max-w-[45vw] rounded-lg"
    >
      <div onClick={() => navigate(`/recipe/${recipe.id}`)}
       className="bg-white rounded-lg shadow-lg overflow-hidden w-[100%] h-[98%]">
        <img
          src={recipe.image_url}
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
              <img onClick={(e)=>{ e.stopPropagation(); fetchUploaderProfile(recipe.user_id)}}
                src={recipe.user.profile_picture}
                alt="Avatar"
                className="w-8 h-8 rounded-full mr-2 object-cover"
              />
              <span className="text-gray-800 font-semibold">
                {recipe.user.name}
              </span>
            </div>
            <div>
              {!isAdminPage && (
                // <FavoriteProvider>
                  <Favorite recipeId={recipe.id} />
                
              )}
              <span className="text-gray-600">2 hours ago</span>
            </div>
          </div>
        </div>
      </div>

      {isAdminPage && (
        <div  className="flex justify-between py-1 w-[100%] px-4 items-center">

          <div className="flex  items-center">

            <button onClick={()=>approvePost(recipe.id, adminDivRef.current)} className="text-white text-3xl rounded-2xl">✅</button>

            <button onClick={()=>banPost(recipe.id,adminDivRef.current)} className=" text-white text-2xl rounded-3xl">✂️</button>
            
          </div>

          <button onClick={()=>{blockUser(recipe.user_id, adminDivRef.current, fetchRecipeAgain);}} className="bg-red-600 p-2.5 text-white rounded-2xl">
            block user
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
