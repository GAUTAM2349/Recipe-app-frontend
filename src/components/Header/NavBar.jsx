// import React, { useContext } from "react";
// import SearchBar from "./SearchBar";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../utils/AuthProvider";

// const NavBar = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const isHomePage = location.pathname === "/";
//   const {user} = useContext(AuthContext);

//   return (
//     <header>
//       <nav className="bg-gray-700 fixed top-0 z-50 w-full ">
//         <div className="  px-[1vw] py-3 sm:py-2 flex gap-4 sm:gap-8 justify-between items-center ">
//           <div className="flex">

//           <h1
//             onClick={() => navigate("/")}
//             className="bg-green-500 text-[3vh] rounded-4xl sm:text-[3vw] md:text-[2vw] px-[2vw] sm:px-[1vw]  mr-[1vw] font-bold text-gray-50 cursor-pointer"
//           >
//             kook
//           </h1>

//           <div className="flex space-x-3">
//             {/* Topics */}
//             <div onClick={() => navigate("/create-recipe")} className="flex items-center space-x-2 cursor-pointer">
//               <span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-yellow-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                   />
//                 </svg>
//               </span>
//               <span
                
//                 className="text-gray-50"
//               >
//                 Add <span className="hidden md:visible">Recipe</span>
//               </span>
//             </div>

//             {/* Blog */}
//             <div onClick={() => navigate("/feed")} className="flex items-center space-x-2 sm:space-x-2 cursor-pointer">
//               <span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-yellow-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
//                   />
//                 </svg>
//               </span>
//               <span  className="text-gray-50">
//                 activity 
//               </span>
//             </div>

//             {user?.role == "admin" && <div onClick={() => navigate("/admin")} className="flex items-center space-x-2 cursor-pointer">
//               <span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-8 w-8 text-yellow-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
//                   />
//                 </svg>
//               </span>
//               <span  className="text-gray-50">
//                 Dashboard
//               </span>
//             </div>
// }
//           </div>
// </div>
//           {/* Search Box (Visible on lg and above) */}
//           { isHomePage && <SearchBar /> }
//           <div
//             onClick={() => navigate("/profile")}
//             className="text-white  absolute top-[26] right-2 text-2xl cursor-pointer"
//           >
//             👤
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default NavBar;


import React, { useContext, useState } from "react";
import SearchBar from "./SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { user } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const MenuItems = () => (
    <>
      {/* Add Recipe */}
      <div onClick={() => { toggleSidebar(); navigate("/create-recipe"); }} className="flex items-center space-x-2 cursor-pointer">
        <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="text-gray-50">Add <span className="hidden md:inline">Recipe</span></span>
      </div>

      {/* Activity */}
      <div onClick={() => { toggleSidebar(); navigate("/feed"); }} className="flex items-center space-x-2 cursor-pointer">
        <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
        <span className="text-gray-50">Activity</span>
      </div>

      {/* Admin Dashboard */}
      {user?.role === "admin" && (
        <div onClick={() => { toggleSidebar(); navigate("/admin"); }} className="flex items-center space-x-2 cursor-pointer">
          <svg className="h-8 w-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <span className="text-gray-50">Dashboard</span>
        </div>
      )}
    </>
  );

  return (
    <header>
      <nav className="bg-gray-700 sticky top-0 z-50 w-full">
        <div className="px-[1vw] py-1.5 sm:py-1 flex justify-between items-center">
          {/* Left side: Logo + menu (desktop) */}
          <div className="flex items-center gap-4">
            {/* Hamburger for small screens */}
            <button
              className="sm:hidden text-white text-2xl"
              onClick={toggleSidebar}
            >
              ☰
            </button>

            {/* Logo */}
            <h1
              onClick={() => navigate("/")}
              className="bg-green-500 text-[3vh] rounded-4xl sm:text-[2vw] md:text-[1.5vw] px-[2vw] sm:px-[1vw] font-bold text-gray-50 cursor-pointer"
            >
              kook
            </h1>

            {/* Desktop Menu */}
            <div className="hidden sm:flex space-x-4">
              <MenuItems />
            </div>
          </div>

          {/* Search Bar (only on home) */}
          {isHomePage && <div className=""><SearchBar /></div>}

          {/* Profile Icon */}
          <div onClick={() => navigate("/profile")} className="text-white text-2xl cursor-pointer">
            👤
          </div>
        </div>

        {/* Sidebar */}
        {isSidebarOpen && (
  <>
    {/* Sidebar */}
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-5 z-50 transition-transform duration-300 shadow-lg sm:hidden">
      <button onClick={toggleSidebar} className="text-white text-2xl mb-6">×</button>
      <div className="flex flex-col gap-6">
        <MenuItems />
      </div>
    </div>

    {/* Backdrop for clicking outside */}
    <div
      className="fixed inset-0 bg-black opacity-30 z-40 sm:hidden"
      onClick={toggleSidebar}
    />
  </>
)}

      </nav>
    </header>
  );
};

export default NavBar;
