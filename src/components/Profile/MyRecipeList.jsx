import { useContext, useRef, useEffect } from "react";
import { MyRecipesContext } from "../../../utils/MyRecipesProvider";


const MyRecipeList = () => {
  const { myRecipes, fetchMyRecipes, loading, page, totalPages } = useContext(MyRecipesContext);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
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
    <div>
      {myRecipes.map((recipe, idx) => (
        <div key={idx} className="recipe-card">
          <h3>{recipe.title}</h3>
          {/* Render other recipe data */}
        </div>
      ))}

      {/* Invisible div used to trigger loading more */}
      <div ref={loaderRef} style={{ height: "1px" }} />

      {loading && <p>Loading more recipes...</p>}
    </div>
  );
};

export default MyRecipeList;
