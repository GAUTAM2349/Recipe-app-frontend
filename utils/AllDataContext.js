import { createContext, useState, useEffect } from "react";

import api from "../config/axiosConfig";

export const AllDataContext = createContext();

export const AllDataProvider = ({ children }) => {
  const [allRecipe, setAllRecipe] = useState([]);
  const [recipeFilter, setRecipeFilter] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
  const getRecipes = async () => {
    try {
      const recipe = await api.get("/recipe", {
        params: { search: recipeFilter }
      });
      setAllRecipe(recipe.data);
    } catch (err) {
      setAllRecipe([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  getRecipes();
}, [recipeFilter]); 


  return (
    <AllDataContext.Provider
      value={{ allRecipe, setRecipeFilter , isLoadingData }}
    >
      {children}
    </AllDataContext.Provider>
  );
};
