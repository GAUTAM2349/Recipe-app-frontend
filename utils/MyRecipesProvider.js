import { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "../config/axiosConfig";

export const MyRecipesContext = createContext();

export const MyRecipesProvider = ({ children }) => {
  const [myRecipes, setMyRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMyRecipes = useCallback(async (pageToFetch = page) => {
    if (loading || (totalPages && pageToFetch > totalPages)) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/recipe/user-recipes?page=${pageToFetch}&limit=6`);
      const { recipes, totalPages: tp } = response.data;

      setMyRecipes(prev => [...prev, ...recipes]);
      setTotalPages(tp);
      setPage(pageToFetch + 1);

      console.log("✅ myRecipesProvider.js → fetched page:", pageToFetch);
    } catch (err) {
      console.error("❌ Error fetching user's recipes:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [page, totalPages, loading]);

  useEffect(() => {
    fetchMyRecipes(1); // Initial fetch
  }, []);

  return (
    <MyRecipesContext.Provider value={{ myRecipes, fetchMyRecipes, loading, error, page, totalPages }}>
      {children}
    </MyRecipesContext.Provider>
  );
};
