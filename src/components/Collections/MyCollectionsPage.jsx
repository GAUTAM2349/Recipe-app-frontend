import { useEffect, useState } from "react";
import api from "../../../config/axiosConfig";

const MyCollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [expandedCollectionId, setExpandedCollectionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
  }, []);

  useEffect( () => {
    console.log("\n\n collections ",collections);
  },[collections])

  const toggleExpand = (id) => {
    setExpandedCollectionId((prev) => (prev === id ? null : id));
  };

  if (loading) return <p className="p-4">Loading collections...</p>;
  if (error) return <p className="p-4 text-red-600">{error}</p>;
  if (collections?.length === 0) return <p className="p-4">No collections found.</p>;

  return (
    <div className="p-4 space-y-4 mt-[90px]">
      <h1 className="text-2xl font-bold mb-4">My Collections</h1>
      {collections.map((collection) => (
        <div
          key={collection?.id}
          className="border rounded-lg p-4 bg-white shadow"
        >
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
                    className="border rounded-lg p-2 bg-gray-100"
                  >
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
    </div>
  );
};

export default MyCollectionsPage;
