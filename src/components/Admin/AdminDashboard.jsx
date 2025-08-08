
// import { useState } from "react";
// import RecipeList from "./RecipeList";
// import BlockedUserList from "./BlockedUserList";


// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("recipes"); // default tab

//   return (
//     <>
//     <h1> Dashboard</h1>
//     <div className="p-6 mt-[90px]">
        
//       {/* Tab Buttons */}
//       <div className="flex gap-4 pb-1 ">
//         <button
//           onClick={() => setActiveTab("recipes")}
//           className={`px-4 py-2 rounded cursor-pointer ${activeTab === "recipes" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
//         >
//           New Recipes
//         </button>
//         <button
//           onClick={() => setActiveTab("users")}
//           className={`px-4 py-2 rounded cursor-pointer ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
//         >
//           Blocked Users
//         </button>
//       </div>

//       {/* Content */}
//       <div className="">
//         {activeTab === "recipes" && <RecipeList />}
//         {activeTab === "users" && <BlockedUserList />}
//       </div>
//     </div>
//     </>
//   );
// };

// export default AdminDashboard;

import { useState } from "react";
import RecipeList from "./RecipeList";
import BlockedUserList from "./BlockedUserList";
import AllUsersList from "./AllUsersList"; // import your new component

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("recipes"); // default tab

  return (
    <>
      {/* <h1>Dashboard</h1> */}
      <div className="p-6 pt-1 ">

        {/* Tab Buttons */}
        <div className="flex gap-4 pt-1 pb-1">
          <button
            onClick={() => setActiveTab("recipes")}
            className={` px-2 md:px-4 py-1 md:py-2 rounded cursor-pointer ${activeTab === "recipes" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            New Recipes
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-4 py-2 rounded cursor-pointer ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            Blocked Users
          </button>
          <button
            onClick={() => setActiveTab("allUsers")}
            className={`px-4 py-2 rounded cursor-pointer ${activeTab === "allUsers" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            All Users
          </button>
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "recipes" && <RecipeList />}
          {activeTab === "users" && <BlockedUserList />}
          {activeTab === "allUsers" && <AllUsersList />}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
