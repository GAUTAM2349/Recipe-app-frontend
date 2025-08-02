// import { useContext, useRef, useEffect } from "react";
// import { MyRecipesContext } from "../../../utils/MyRecipesProvider";
// import {  useNavigate } from 'react-router-dom';
// import { AuthContext } from "../../../utils/AuthProvider";

// const MyRecipeList = () => {
//   const { myRecipes, fetchMyRecipes, loading, page, totalPages } =
//     useContext(MyRecipesContext);
//   const loaderRef = useRef(null);
//   const navigate = useNavigate();
//   const {user} = useContext(AuthContext);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !loading && page <= totalPages) {
//           fetchMyRecipes();
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }

//     return () => {
//       if (loaderRef.current) {
//         observer.unobserve(loaderRef.current);
//       }
//     };
//   }, [fetchMyRecipes, loading, page, totalPages]);

//   return (
//     <div className="flex flex-wrap mx-auto">
//       {myRecipes.map((recipe, idx) => (
//         <div  onClick={()=>navigate(`/recipe/${recipe.id}`)} key={idx} className="recipe-card cursor-pointer">
//           {/* <h3>{recipe.title}</h3> */}
//           <div className=" bg-gray-50 w-[200px] cursor-pointer rounded-2xl h-[200px] m-1.5 overflow-hidden">
//             <img
//               src={recipe.image_url || "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Feasy-recipe&psig=AOvVaw0MaN-mIxikt2PEkYmR7V6i&ust=1753024206317000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOii3JuayY4DFQAAAAAdAAAAABAE"}
//               alt={recipe.title || "Recipe image"}
//               className="w-full h-full object-cover"
//             />
//           </div>
          
//         </div>
//       ))}

      
//       <div ref={loaderRef} style={{ height: "1px" }} />

//       {loading && <p>Loading more recipes...</p>}
//     </div>
//   );
// };

// export default MyRecipeList;


import { useContext, useRef, useEffect } from "react";
import { MyRecipesContext } from "../../../utils/MyRecipesProvider";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";

const MyRecipeList = () => {
  const { myRecipes, fetchMyRecipes, loading, page, totalPages } =
    useContext(MyRecipesContext);
  const loaderRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 px-4 py-6">
      {myRecipes.map((recipe, idx) => (
        <div
          onClick={() => navigate(`/recipe/${recipe.id}`)}
          key={idx}
          className="cursor-pointer bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300"
        >
          <div className="w-full h-[180px] bg-gray-100">
            <img
              src={
                recipe.image_url ||
                "https://via.placeholder.com/300x200?text=No+Image"
              }
              alt={recipe.title || "Recipe"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-2 text-center">
            <h3 className="text-sm font-medium text-gray-700 truncate">
              {recipe.title}
            </h3>
          </div>
        </div>
      ))}

      {/* Loader Trigger */}
      <div ref={loaderRef} style={{ height: "1px" }} />

      {/* Loading Text */}
      {loading && (
        <p className="col-span-full text-center text-gray-500">
          Loading more recipes...
        </p>
      )}
    </div>
  );
};

export default MyRecipeList;
