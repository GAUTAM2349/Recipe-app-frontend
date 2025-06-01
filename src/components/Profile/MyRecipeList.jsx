import { useContext, useRef, useEffect } from "react";
import { MyRecipesContext } from "../../../utils/MyRecipesProvider";

const MyRecipeList = () => {
  const { myRecipes, fetchMyRecipes, loading, page, totalPages } =
    useContext(MyRecipesContext);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && page <= totalPages) {
          fetchMyRecipes();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [fetchMyRecipes, loading, page, totalPages]);

  return (
    <div className="flex flex-wrap mx-auto">
      {myRecipes.map((recipe, idx) => (
        <div key={idx} className="recipe-card">
          {/* <h3>{recipe.title}</h3> */}
          <div className=" bg-gray-50 w-[200px] rounded-2xl h-[200px] m-1.5 overflow-hidden">
            <img
              src={recipe.image_url || "https://via.placeholder.com/100"}
              alt={recipe.title || "Recipe image"}
              className="w-full h-full object-cover"
            />
          </div>
          
        </div>
      ))}

      
      <div ref={loaderRef} style={{ height: "1px" }} />

      {loading && <p>Loading more recipes...</p>}
    </div>
  );
};

export default MyRecipeList;
