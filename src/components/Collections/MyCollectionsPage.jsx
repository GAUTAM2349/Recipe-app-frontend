import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";

const MyCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [expandedCollectionId, setExpandedCollectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updateCollections, setUpdateCollections] = useState(1);

  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await api.get("/collection"); 
        setCollections(response.data);
        console.log("\n\n collections ",collections);
      } catch (err) {
        setError("Failed to load collections.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchCollections();
  }, [updateCollections]);

  useEffect( () => {
    console.log("\n\n collections ",collections);
  },[collections,updateCollections])

  const toggleExpand = (id) => {
    setExpandedCollectionId((prev) => (prev === id ? null : id));
  };

  const deleteCollection = async (id) => {

    try{

      const response = await api.delete(`/collection/${id}`);
      setUpdateCollections(updateCollections+1);
    }catch(error){
      console.log("error in deleting collection");
    }
  }


  const deleteRecipeFromCollection = async(collectionId, recipeId) => {

    try{

      const response = await api.delete(`/collection/delete-collection-recipe/${collectionId}/${recipeId}`);
      setUpdateCollections(updateCollections+1);
        
    }catch(error){
      console.log(error);
    }
    
  }
  

  if (loading) return <p className="p-4">Loading collections...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (collections?.length === 0) return <p className="p-4">No collections found.</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">My Collections</h1>
      {collections.map((collection) => (
        <div
          key={collection?.id}
          className="border rounded-lg p-4 relative bg-white shadow"
        >
          <span onClick={()=>{deleteCollection(collection.id)}} className="bg-red-500 absolute top-4 px-3 py-1 rounded-2xl right-9">Delete</span>
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() => toggleExpand(collection.id)}
          >
            <h2 className="text-xl font-semibold">{collection.name}</h2>
            <span>{expandedCollectionId === collection.id ? "▲" : "▼"}</span>
          </div>

          {expandedCollectionId === collection.id && (
            <div className="mt-4  grid gap-4 sm:grid-cols-2 md:grid-cols-5">
              {collection?.recipes?.length === 0 ? (
                <p className="text-gray-500">No recipes in this collection.</p>
              ) : (
                collection?.recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="border rounded-lg p-2 relative bg-gray-100"
                  >
                    <span onClick={()=>deleteRecipeFromCollection(collection.id,recipe.id)} className=" bg-green-600 absolute top-2 right-2 rounded-b-2xl pb-3 px-1">remove</span>
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full md:h-[70%] lg:h-[85%] object-cover rounded"
                    />
                    <h3 className="mt-2 font-medium">{recipe.title}</h3>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ))}
      <span className="hidden">{updateCollections}</span>
    </div>
  );
};

export default MyCollectionsPage;
