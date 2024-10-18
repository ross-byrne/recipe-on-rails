import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import FilterControls from "./FilterControls";
import RecipeList from "./RecipeList";
import SelectedRecipe from "./SelectedRecipe";

// attach app to dom
const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);

const ROOT_URL = window.data.root_url;
const RECIPE_URL = `${ROOT_URL}/recipes`;

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // load recipes
  useEffect(() => {
    fetch(RECIPE_URL)
      .then((response) => response.json())
      .then((data) => setRecipes(data));
  }, []);

  return (
    <div className="mx-24 h-full flex flex-col pt-12">
      <h1 className="text-4xl font-semibold text-center pb-10">Recipes</h1>
      <div className="grid grid-cols-5 overflow-hidden w-full gap-4">
        <FilterControls setRecipes={setRecipes} />
        <RecipeList recipes={recipes} onRecipeClicked={setSelectedRecipe} />
        <SelectedRecipe recipe={selectedRecipe} />
      </div>
    </div>
  );
}
