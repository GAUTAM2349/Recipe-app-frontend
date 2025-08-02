import { useContext } from "react";
import { AllDataContext } from "../../../utils/AllDataContext";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { setRecipeFilter,recipeFilter } = useContext(AllDataContext);

  const setSearchFilter = (e) => {
  const searchText = e.target.value;
  console.log("\n\n search text is ", searchText);
  setRecipeFilter(searchText);

  if (searchText.trim() === "") {
    // remove 'search' param if empty
    searchParams.delete("search");
  } else {
    searchParams.set("search", searchText);
  }

  setSearchParams(searchParams);
};

return (
  <div className="flex items-center bg-white px-3 py-1 rounded-full shadow-sm  max-w-[200px] sm:max-w-[400px] md:max-w-[500px]">
    <button type="button" className="text-gray-600">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 sm:h-6 sm:w-6"
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
    </button>
    <input
      onChange={setSearchFilter}
      value={searchParams.get('search') || ""}
      type="text"
      placeholder="Search"
      className="ml-2 w-full bg-transparent outline-none text-sm sm:text-base placeholder-gray-400"
    />
  </div>
);

};

export default SearchBar;
