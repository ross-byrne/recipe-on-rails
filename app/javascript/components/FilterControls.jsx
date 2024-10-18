import React, { useState, useEffect } from "react";

const ROOT_URL = window.data.root_url;
const RECIPE_URL = `${ROOT_URL}/recipes`;

export default function FilterControls({ setRecipes }) {
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

      fetch(`${RECIPE_URL}?${params}`)
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
    <div className="p-4">
      <label>
        <span>Search by recipe name</span>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full rounded-md"
          name="search"
          onChange={onSearch}
        />
      </label>

      <div className="pt-3 text-center text-slate-700">Or</div>

      <label>
        <span>Filter by ingredient</span>
        <input
          type="text"
          placeholder="Search..."
          className="input input-bordered w-full rounded-md"
          name="search"
        />
        <div className="w-full border-2 max-h-96 overflow-auto bg-white hidden absolute z-10 max-w-xl">
          <div className="py-1 px-3">Type to search...</div>
        </div>
      </label>
    </div>
  );
}
