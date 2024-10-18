import React, { useState, useEffect } from "react";
import FilteredByIngredients from "./FilteredByIngredients";
import IngredientSearchResults from "./IngredientSearchResults";

const ROOT_URL = window.data.root_url;
const IngredientURL = `${ROOT_URL}/ingredients`;

export default function IngredientFilter({ setRecipes, searchUrl }) {
  const [searchValue, setSearchValue] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(true);

  // debounce search results
  useEffect(() => {
    if (loading) {
      return;
    }

    // debounce search
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams({
        search: searchValue,
      }).toString();

      fetch(`${IngredientURL}?${params}`)
        .then((response) => response.json())
        .then((data) => setIngredients(data));
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  function onSearch(event) {
    const search = event?.target?.value ?? "";
    setLoading(false);
    setSearchValue(search);
  }

  // filter recipes by filtered ingredients
  useEffect(() => {
    if (loading) {
      return; // don't run on first load'
    }

    let paramIds = selectedIngredients.map((x) => `ingredient_ids[]=${x.id}`);
    paramIds = paramIds.join("&");
    const params = new URLSearchParams(paramIds).toString();

    // search for and set recipes
    fetch(`${searchUrl}?${params}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, [selectedIngredients]);

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
      <IngredientSearchResults
        noResult={!!searchValue && !ingredients.length}
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
      />
      <FilteredByIngredients ingredients={selectedIngredients} />
    </label>
  );
}
