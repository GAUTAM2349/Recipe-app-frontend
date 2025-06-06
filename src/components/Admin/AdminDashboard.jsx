
import { useState } from "react";
import RecipeList from "./RecipeList";
import BlockedUserList from "./BlockedUserList";


const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes"); // default tab

  return (
    <>
    <h1> Dashboard</h1>
    <div className="p-6 mt-[90px]">
        
      {/* Tab Buttons */}
      <div className="flex gap-4 pb-1 ">
        <button
          onClick={() => setActiveTab("recipes")}
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "recipes" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          New Recipes
        </button>
        <button
          onClick={() => setActiveTab("users")}
          className={`px-4 py-2 rounded cursor-pointer ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
        >
          Blocked Users
        </button>
      </div>

      {/* Content */}
      <div className="">
        {activeTab === "recipes" && <RecipeList />}
        {activeTab === "users" && <BlockedUserList />}
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
