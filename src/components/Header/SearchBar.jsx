import { useContext } from "react";
import { AllDataContext } from "../../../utils/AllDataContext";


const SearchBar = () => {


    const {setRecipeFilter} = useContext(AllDataContext);
    
    const setSearchFilter = (e) => {
        let searchText = e.target.value;
        console.log("\n\n search text is ",searchText)
        setRecipeFilter(searchText);
    }
    
  return (
    <>
      <div className="lg:flex hidden items-center space-x-2 bg-white py-1 px-2 rounded-full">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          onChange={setSearchFilter}
          className="outline-none"
          type="text"
          placeholder="Search"
        />
      </div>
    </>
  );
};

export default SearchBar;