import React, { useContext } from "react";
import SearchBar from "./SearchBar";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../utils/AuthProvider";

const NavBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const {user} = useContext(AuthContext);

  return (
    <header>
      <nav className="bg-gray-700 fixed top-0 z-50 w-full ">
        <div className=" container px-5 h-[80px] flex gap-8 justify-between items-center ">
          <div className="flex">

          <h1
            onClick={() => navigate("/")}
            className="bg-green-500 text-2xl px-10  mr-10 font-bold text-gray-50 cursor-pointer"
          >
            kook
          </h1>

          <div className="flex space-x-10">
            {/* Topics */}
            <div onClick={() => navigate("/create-recipe")} className="flex items-center space-x-2 cursor-pointer">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </span>
              <span
                
                className="text-gray-50"
              >
                Add Recipe
              </span>
            </div>

            {/* Blog */}
            <div onClick={() => navigate("/feed")} className="flex items-center space-x-2 cursor-pointer">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </span>
              <span  className="text-gray-50">
                activities
              </span>
            </div>

            {user?.role == "admin" && <div onClick={() => navigate("/admin")} className="flex items-center space-x-2 cursor-pointer">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </span>
              <span  className="text-gray-50">
                Dashboard
              </span>
            </div>
}
          </div>
</div>
          {/* Search Box (Visible on lg and above) */}
          { isHomePage && <SearchBar /> }
          <div
            onClick={() => navigate("/profile")}
            className="text-white  absolute top-[26] right-2 text-2xl cursor-pointer"
          >
            👤
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
