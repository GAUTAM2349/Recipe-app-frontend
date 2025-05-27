// import { useState } from "react";
// import api from "../../../config/axiosConfig"; // adjust path if needed
// import { useNavigate } from "react-router-dom";

// const CreateRecipe = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     title: "",
//     ingredients: "",
//     instructions: "",
//     cook_time: "",
//     servings: "",
//     category: "",
//     dietary_tags: "",
//     difficulty: "",
//     image_url: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Split array fields
//     const payload = {
//       ...formData,
//       ingredients: formData.ingredients
//         .split(",")
//         .map((i) => i.trim())
//         .filter(Boolean),
//       dietary_tags: formData.dietary_tags
//         .split(",")
//         .map((tag) => tag.trim())
//         .filter(Boolean),
//       cook_time: parseInt(formData.cook_time),
//       servings: parseInt(formData.servings),
//     };

//     try {
//       await api.post("/recipe", payload); // Replace with actual endpoint
//       alert("Recipe created!");
//       navigate("/");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to create recipe.");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded mt-8">
//       <h2 className="text-2xl font-bold mb-4">Create a New Recipe</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {[
//           { label: "Title", name: "title" },
//           { label: "Ingredients (comma-separated)", name: "ingredients" },
//           { label: "Instructions", name: "instructions", textarea: true },
//           { label: "Cook Time (minutes)", name: "cook_time", type: "number" },
//           { label: "Servings", name: "servings", type: "number" },
//           { label: "Category", name: "category" },
//           { label: "Dietary Tags (comma-separated)", name: "dietary_tags" },
//           { label: "Difficulty", name: "difficulty" },
//           { label: "Image URL", name: "image_url" },
//         ].map((field) => (
//           <div key={field.name}>
//             <label className="block mb-1 font-semibold">{field.label}</label>
//             {field.textarea ? (
//               <textarea
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 rows={4}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             ) : (
//               <input
//                 type={field.type || "text"}
//                 name={field.name}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//                 required
//               />
//             )}
//           </div>
//         ))}

//         <button
//           type="submit"
//           className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//         >
//           Submit Recipe
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateRecipe;

import { useState } from "react";
import api from "../../../config/axiosConfig";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    cook_time: "",
    servings: "",
    category: "",
    dietary_tags: [],
    difficulty: "",
    image_url: "",
  });

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Keto",
    "Low-Carb",
    "Nut-Free",
  ];

  const categoryOptions = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Middle Eastern",
  "American",
];


  const difficultyOptions = ["Easy", "Medium", "Hard", "Beginner", "Intermediate", "Expert", "Challenging"];

  const cookTimeOptions = [
    "Under 15 minutes",
    "15–30 minutes",
    "30–45 minutes",
    "45–60 minutes",
    "1–2 hours",
    "2–3 hours",
    "Over 3 hours",
  ];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;
    if (type === "select-multiple") {
      const selected = Array.from(selectedOptions).map((opt) => opt.value);
      setFormData((prev) => ({ ...prev, [name]: selected }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      cook_time: parseInt(formData.cook_time) || 0,
      servings: parseInt(formData.servings),
    };

    try {
      await api.post("/recipe", payload);
      alert("Recipe created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create recipe.");
    }
  };

  return (
    <div className="max-w-2xl mt-[80px] mx-auto p-6 bg-white shadow-md rounded ">
      <h2 className="text-2xl font-bold mb-4">Create a New Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block mb-1 font-semibold">Ingredients (comma-separated)</label>
          <input
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Instructions */}
        <div>
          <label className="block mb-1 font-semibold">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Cook Time */}
        <div>
          <label className="block mb-1 font-semibold">Cook Time</label>
          <select
            name="cook_time"
            value={formData.cook_time}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Time Range</option>
            {cookTimeOptions.map((option, index) => (
              <option key={index} value={(index + 1) * 15}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Servings */}
        <div>
          <label className="block mb-1 font-semibold">Servings</label>
          <input
            name="servings"
            type="number"
            value={formData.servings}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Dietary Tags */}
        <div>
          <label className="block mb-1 font-semibold">Dietary Tags</label>
          <select
            name="dietary_tags"
            multiple
            value={formData.dietary_tags}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            {dietaryOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
          <small className="text-gray-500">Hold Ctrl (Windows) or ⌘ (Mac) to select multiple</small>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block mb-1 font-semibold">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Difficulty</option>
            {difficultyOptions.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-semibold">Image URL</label>
          <input
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
