import React, { useState, useEffect } from "react";

const ROOT_URL = window.data.root_url;
const IngredientURL = `${ROOT_URL}/ingredients`;

export default function IngredientFilter({ setRecipes, searchUrl }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    // debounce search
    const timeoutId = setTimeout(() => {
      console.log("Search for: ", searchValue);

      const params = new URLSearchParams({
        search: searchValue,
      }).toString();

      fetch(`${searchUrl}?${params}`)
        .then((response) => response.json())
        .then((data) => setRecipes(data));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  function onSearch(event) {
    const search = event?.target?.value ?? "";
    setLoading(false);
    setSearchValue(search);
  }

  return (
    <label>
      <span>Filter by ingredient</span>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full rounded-md"
        name="search"
        onChange={onSearch}
      />
      <div className="w-full border-2 max-h-96 overflow-auto bg-white hidden absolute z-10 max-w-xl">
        <div className="py-1 px-3">Type to search...</div>
      </div>
    </label>
  );
}
