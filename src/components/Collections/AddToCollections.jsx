// import { useEffect, useRef, useState } from "react";
// import api from "../../../config/axiosConfig";

// const AddToCollections = ({ recipeId, setSelectCollectionsModal }) => {
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [collections, setCollections] = useState([]);
//   //

//   const AddToCollectionsRef = useRef(null);

//   useEffect(() => {
//     async function loadAllCollections() {
//       try {
//         const response = await api.get("/collection");
//         setCollections(response.data);
//       } catch (error) {
//         console.error("Error loading collections", error);
//       } finally {
//         setIsPageLoading(false);
//       }
//     }

//     loadAllCollections();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         AddToCollectionsRef.current &&
//         !AddToCollectionsRef.current.contains(event.target)
//       ) {
//         setSelectCollectionsModal(false); // close modal when clicking outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setSelectCollectionsModal]);

//   const handleAddToCollection = async (collectionId) => {
//     try {
//       await api.post("/collection/add-recipe", {
//         recipeId,
//         collectionId,
//       });

//       alert("Recipe added to collection!");
//       setSelectCollectionsModal(false); // close modal after successful addition
//     } catch (error) {
//       console.log("Failed to add recipe", error);
//       if (error.response?.status === 409) {
//         alert("Recipe already exists in this collection.");
//       } else {
//         alert("Something went wrong!");
//       }
//     }
//   };

//   if (isPageLoading) {
//     return (
//       <div className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3">
//         Loading collections...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div
//         ref={AddToCollectionsRef}
//         className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3"
//       >
//         <div className="flex justify-between">
//           <h3 className="text-xl font-bold mb-2">Choose a Collection</h3>
//           <button className=" bg-green-500 rounded-2xl p-2">Create new</button>
//         </div>
//         {collections.map((col) => (
//           <div
//             key={col.id}
//             className="cursor-pointer hover:bg-gray-200 p-2 rounded border bg-white border-white"
//             onClick={() => handleAddToCollection(col.id)}
//           >
//             {col.name}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AddToCollections;


// import { useEffect, useRef, useState } from "react";
// import api from "../../../config/axiosConfig";

// const AddToCollections = ({ recipeId, setSelectCollectionsModal }) => {
//   const [isPageLoading, setIsPageLoading] = useState(true);
//   const [collections, setCollections] = useState([]);

//   const AddToCollectionsRef = useRef(null);

//   useEffect(() => {
//     async function loadAllCollections() {
//       try {
//         const response = await api.get("/collection");
//         setCollections(response.data);
//       } catch (error) {
//         console.error("Error loading collections", error);
//       } finally {
//         setIsPageLoading(false);
//       }
//     }

//     loadAllCollections();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         AddToCollectionsRef.current &&
//         !AddToCollectionsRef.current.contains(event.target)
//       ) {
//         setSelectCollectionsModal(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [setSelectCollectionsModal]);

//   const handleAddToCollection = async (collectionId) => {
//     try {
//       await api.post("/collection/add-recipe", {
//         recipeId,
//         collectionId,
//       });

//       alert("Recipe added to collection!");
//       setSelectCollectionsModal(false);
//     } catch (error) {
//       console.log("Failed to add recipe", error);
//       if (error.response?.status === 409) {
//         alert("Recipe already exists in this collection.");
//       } else {
//         alert("Something went wrong!");
//       }
//     }
//   };

//   const handleCreateNewCollection = async () => {
//     const name = prompt("Enter new collection name:");
//     if (!name) return;

//     try {
//       const res = await api.post("/collection", { name });
//       setCollections((prev) => [...prev, res.data]);
//       alert("New collection created!");
//     } catch (error) {
//       console.log("Error creating collection", error);
//       alert("Failed to create collection.");
//     }
//   };

//   if (isPageLoading) {
//     return (
//       <div className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3">
//         Loading collections...
//       </div>
//     );
//   }

//   return (
//     <>
//       <div
//         ref={AddToCollectionsRef}
//         className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3"
//       >
//         <div className="flex justify-between">
//           <h3 className="text-xl font-bold mb-2">Choose a Collection</h3>
//           <button onClick={handleCreateNewCollection} className=" bg-green-500 rounded-2xl p-2">
//             Create new
//           </button>
//         </div>
//         {collections.map((col) => (
//           <div
//             key={col.id}
//             className="cursor-pointer hover:bg-gray-200 p-2 rounded border bg-white border-white"
//             onClick={() => handleAddToCollection(col.id)}
//           >
//             {col.name}
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AddToCollections;

import { useEffect, useRef, useState } from "react";
import api from "../../../config/axiosConfig";

const AddToCollections = ({ recipeId, setSelectCollectionsModal }) => {
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [collections, setCollections] = useState([]);
  const [showCreateInput, setShowCreateInput] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [createError, setCreateError] = useState("");

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
        setSelectCollectionsModal(false);
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
      setSelectCollectionsModal(false);
    } catch (error) {
      if (error.response?.status === 409) {
        setCreateError("Recipe already exists in this collection.");
      } else {
        setCreateError("Something went wrong while adding recipe.");
      }
    }
  };

  const handleCreateNewCollection = async () => {
    setCreateError("");
    if (!newCollectionName.trim()) {
      setCreateError("Collection name cannot be empty.");
      return;
    }

    try {
      const res = await api.post("/collection", { name: newCollectionName });
      setCollections((prev) => [...prev, res.data]);
      setNewCollectionName("");
      setShowCreateInput(false);
    } catch (error) {
      console.log("Error creating collection", error);
      setCreateError("Failed to create collection.");
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
    <div
      ref={AddToCollectionsRef}
      className="h-[400px] w-[100vw] fixed bottom-0 z-50 overflow-scroll bg-yellow-400 text-black p-4 space-y-3"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold mb-2">Choose a Collection</h3>
        <button
          className="bg-green-500 rounded-2xl p-2"
          onClick={() => setShowCreateInput((prev) => !prev)}
        >
          Create new
        </button>
      </div>

      {showCreateInput && (
        <div className="bg-white p-3 rounded shadow-md space-y-2">
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Enter collection name"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleCreateNewCollection}
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Save
          </button>
          {createError && (
            <p className="text-red-600 text-sm">{createError}</p>
          )}
        </div>
      )}

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
  );
};

export default AddToCollections;
