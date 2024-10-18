import React, { useState, useEffect } from "react";
import IngredientFilter from "./IngredientFilter";
import RecipeSearch from "./RecipeSearch";

const ROOT_URL = window.data.root_url;
const RECIPE_URL = `${ROOT_URL}/recipes`;

export default function Controls({ setRecipes }) {
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
      <RecipeSearch setRecipes={setRecipes} searchUrl={RECIPE_URL} />
      <div className="pt-3 text-center text-slate-700">Or</div>
      <IngredientFilter setRecipes={setRecipes} searchUrl={RECIPE_URL} />
    </div>
  );
}
