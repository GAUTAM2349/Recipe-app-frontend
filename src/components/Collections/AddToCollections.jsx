import { useEffect, useRef, useState } from "react";
import api from "../../../config/axiosConfig";

const AddToCollections = ({ recipeId, setSelectCollectionsModal }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  // 
  

  const AddToCollectionsRef = useRef(null);

  

  useEffect(() => {
    async function loadAllCollections() {
      try {
        const response = await api.get("/collection");
        setCollections(response.data);
      } catch (error) {
        console.error("Error loading collections", error);
      } finally {
        setIsPageLoading(false);
      }
    }

    loadAllCollections();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        AddToCollectionsRef.current &&
        !AddToCollectionsRef.current.contains(event.target)
      ) {
        setSelectCollectionsModal(false);  // close modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setSelectCollectionsModal]);

  const handleAddToCollection = async (collectionId) => {
    try {
      await api.post("/collection/add-recipe", {
        recipeId,
        collectionId,
      });

      alert("Recipe added to collection!");
      setSelectCollectionsModal(false); // close modal after successful addition
    } catch (error) {
      console.log("Failed to add recipe", error);
      if (error.response?.status === 409) {
        alert("Recipe already exists in this collection.");
      } else {
        alert("Something went wrong!");
      }
    }
  };

  if (isPageLoading) {
    return (
      <div className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3">
        Loading collections...
      </div>
    );
  }

  return (
    <>
     
    <div
      ref={AddToCollectionsRef}
      className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3"
    >
      <h3 className="text-xl font-bold mb-2">Choose a Collection</h3>

      {collections.map((col) => (
        <div
          key={col.id}
          className="cursor-pointer hover:bg-gray-200 p-2 rounded border bg-white border-white"
          onClick={() => handleAddToCollection(col.id)}
        >
          {col.name}
        </div>
      ))}
    </div>
    </>
  );
};

export default AddToCollections;
