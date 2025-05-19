import { useContext, useEffect, useState } from "react";
import api from "../../../config/axiosConfig";
import { useNavigate } from 'react-router-dom';
import { FavoriteContext } from "../../../utils/FavoriteProvider";

const Favorite = ({ recipeId }) => {
  const [favoriteColor, setFavoriteColor] = useState("black");
  const [isFavorite, setIsFavorite] = useState(false);
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  // Check if the recipe is already in favorites
  useEffect(() => {
    const found = favorites?.some(fav => fav.id === recipeId);
    setIsFavorite(found);
    setFavoriteColor(found ? "red" : "black");
  }, [favorites, recipeId]);

  const toggleFavorite = async (e) => {
    e.stopPropagation();

    try {
      if (!isFavorite) {
        // Add to favorites
        await api.post('/favorite', { recipeId });
        setFavoriteColor("red");
        setIsFavorite(true);
      } else {
        // Remove from favorites (dummy URL, replace with actual)
        await api.delete(`/favorite/${recipeId}`);
        setFavoriteColor("black");
        setIsFavorite(false);
      }
    } catch (error) {
      console.log(error);
      if(error.status == 401) return navigate('/login');
    }
  };

  return (
    <span
      onClick={toggleFavorite}
      className={`font-bold ${favoriteColor === "red" ? "text-red-500" : "text-black"}`}
    >
      <span className="p-4 bg-amber-200 rounded-sm m-1">love</span>
    </span>
  );
};

export default Favorite;
