import React, { useState, useEffect } from "react";

export default function RecipeSearch({ setRecipes, searchUrl }) {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      return;
    }

    // debounce search
    const timeoutId = setTimeout(() => {
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
      <span>Search by recipe name</span>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered w-full rounded-md"
        name="search"
        onChange={onSearch}
      />
    </label>
  );
}
