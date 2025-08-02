import { useState, useEffect } from "react";
import api from "../../../config/axiosConfig";
import { useLocation, useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [recipePicFile, setRecipePicFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [msg, setMsg] = useState("");

  const editMode = location.state?.editMode || false;
  const recipeId = location.state?.recipeId;
  const recipeData = location.state?.recipeData;

  const [formData, setFormData] = useState({
    title:  recipeData?.title  || "",
    ingredients: recipeData?.ingredients  || "",
    instructions: recipeData?.instructions  || "",
    cook_time: recipeData?.cook_time  || "",
    servings: recipeData?.servings  || "",
    category: recipeData?.category  || "",
    dietary_tags: recipeData?.dietary_tags || [],
    difficulty: recipeData?.difficulty  || "",
    image_url: recipeData?.image_url  || "",
  });

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free", "Keto", "Low-Carb", "Nut-Free"];
  const categoryOptions = ["Indian", "Chinese", "Italian", "Mexican", "Thai", "Middle Eastern", "American"];
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

  useEffect(() => {
    if (editMode && location.state?.recipeData) {
      const data = location.state.recipeData;
      setPreviewURL(data?.image_url || "");
      setFormData({
        title: data.title || "",
        ingredients: data.ingredients?.join(", ") || "",
        instructions: data.instructions || "",
        cook_time: data.cook_time || "",
        servings: data.servings || "",
        category: data.category || "",
        dietary_tags: data.dietary_tags || [],
        difficulty: data.difficulty || "",
        image_url: data.image_url || "",
      });
    }
  }, [editMode, location.state]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setRecipePicFile(file);
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setMsg("Only image files are allowed.");
    }
  };

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
    setMsg("");

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("instructions", formData.instructions);
    payload.append("cook_time", parseInt(formData.cook_time) || 0);
    payload.append("servings", parseInt(formData.servings) || 1);
    payload.append("category", formData.category);
    payload.append("difficulty", formData.difficulty);
    payload.append("dietary_tags", JSON.stringify(formData.dietary_tags));
    payload.append("ingredients", JSON.stringify(
      formData.ingredients
        ?.split(",")
        .map((i) => i.trim())
        .filter(Boolean)
    ));
    if (recipePicFile) {
      payload.append("image_url", recipePicFile);
    }

    try {
      if (editMode && recipeId) {
        await api.put(`/recipe/${recipeId}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Recipe updated!");
      } else {
        await api.post("/recipe", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Recipe created!");
      }
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(editMode ? "Failed to update recipe." : "Failed to create recipe.");
    }
  };

  return (
    <div className="max-w-2xl  mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">
        {editMode ? "Edit Recipe" : "Create a New Recipe"}
      </h2>

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
            min="1"
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

        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-semibold">Upload recipe image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
            required={!editMode}
          />
          {previewURL && <img src={previewURL} alt="Preview" className="mt-2 max-h-40" />}
          {msg && <p className="text-red-500 text-sm mt-1">{msg}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editMode ? "Update Recipe" : "Submit Recipe"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
